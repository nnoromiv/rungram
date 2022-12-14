import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import Validator from 'email-validator'
import '../../firebase/firebase'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'


const SignUpForm = ({navigation}) => {
    const SignUpFormSchema = Yup.object().shape({
        email: Yup.string().email().required(' Incorrect '),
        username: Yup.string().required().min(4, 'Username is required'),
        password: Yup.string().required().min(8, 'Password invalid')
    })

    const getRandomProfilePicture = async () => {
      const response = await fetch('https://randomuser.me/api')
      const data = await response.json()
      return data.results[0].picture.large
    }
    const auth = getAuth()
    const userCollectionRef = collection(db, 'users')
    
    const onSignup = async(email, password, username) => {
      try {
        const authUser = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(
          doc(db, 'users', authUser.user.email),{
            owner_uid: authUser.user.uid,
              username: username,
              email: authUser.user.email,
              profile_picture: await getRandomProfilePicture()
          }
        ).then(
              Alert.alert(
                'Sign up successful',
                'Welcome to Instagram'
              )
            )
      } catch (error) {
        console.log(error)
      }
    }
    return (
        <Formik
        initialValues={{ email: '', password: '', username: ''}}
        onSubmit={(values) => onSignup(values.email, values.password, values.username)}
        validationSchema={SignUpFormSchema}
        validateOnMount={true}
        >
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
        <>
          <TextInput
          placeholder='Email' placeholderTextColor='white'
          autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress'
          autoFocus={false} autoComplete={'email'}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          style={[ styles.emailInputField, {
            borderBottomColor: values.email.length < 1 || Validator.validate(values.email) ? 'white' : 'red'
          }]}
          />
          <TextInput
          placeholder='Username' placeholderTextColor='white'
          autoCapitalize='none' keyboardType='default' textContentType='username'
          autoFocus={false} autoComplete={'username'}
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          value={values.username}
          style={[ styles.nameInputField, {
            borderBottomColor: 1 > values.username.length || values.username.length > 4 ? 'white' : 'red'
          }]}
          />
         <TextInput
          placeholder='Password' placeholderTextColor='white'
          autoCapitalize='none' 
          textContentType='password'
          secureTextEntry={true} autoCorrect={false}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          style={[ styles.passwordInputField, {
            borderBottomColor: 1 > values.password.length || values.password.length >= 8  ? 'white' : 'red'
          }]}
          />    
          <Pressable titleSize={20} style={styles.signUpButton(isValid)} onPress={handleSubmit} disabled={!isValid}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Pressable>
    
          <View style={ styles.logInContainer }>
            <Text style={{ color: 'white', fontSize: 16}}> Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                <Text style={{ color: '#6bb0f5', fontSize: 16}}> Log In</Text>
            </TouchableOpacity>
          </View>
        </>
        )}
        </Formik>
    )
}

const styles = StyleSheet.create ({
    emailInputField: {
        backgroundColor: 'black', 
        color: 'white', 
        fontSize: 20, 
        marginTop: 80,
        paddingLeft: 10,
        borderWidth: 2, 
        borderBottomColor: 'white'
    },
    nameInputField: {
        backgroundColor: 'black', 
        color: 'white', 
        fontSize: 20, 
        marginTop: 20,
        paddingLeft: 10,
        borderWidth: 2, 
        borderBottomColor: 'white'
    },
    passwordInputField: {
        backgroundColor: 'black', 
        color: 'white',
        fontSize: 20, 
        marginTop: 20, 
        marginBottom: 60, 
        paddingLeft: 10,
        borderWidth: 2, 
        borderBottomColor: 'white'
    },
    signUpButton: isValid => ({
        backgroundColor: isValid ? '#0096f6' : '#9acaf7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    }),
    signUpButtonText: {
        fontWeight: '600',
        color: 'white',
        fontSize: 20
    },
    logInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        width: '100%'
    }
})

export default SignUpForm