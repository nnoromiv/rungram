import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import Validator from 'email-validator'
import '../../firebase/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


const LoginForm = ( {navigation} ) => {
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required(' Incorrect '),
        password: Yup.string().required().min(8, 'Password invalid')
    })

    const auth = getAuth()

    const onLogin = async( email, password) => {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        console.log('Firebase login successful', email, password)
      } catch (error) {
        error.message === 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).' 
        || error.message === 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).'
        && Alert.alert(
          'Invalid email/password',
          'Try Sign up',
         [ {
            text: 'Ok',
            onPress: () => console.log('Ok'),
            style: 'cancel'
          },
          {
            text: 'Sign up',
            onPress: () => navigation.push('SignUpScreen'),
          },
        ]
        )
      }
    }
  return (
    <Formik
    initialValues={{ email: '', password: ''}}
    onSubmit={(values) => 
    onLogin(values.email, values.password)
    }
    validationSchema={LoginFormSchema}
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
      style={[ styles.nameInputField, {
        borderBottomColor: 1 > values.email.length || values.email.length <= 2 || Validator.validate(values.email) ? 'white' : 'red'
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
        borderBottomColor:  Validator.validate(values.password)  ? 'red' : 'white'
      }]}
      />
      <TouchableOpacity style={{ alignItems: 'flex-end', marginBottom: 30}}>
      <Text style={{ color: '#6bb0f5', fontSize: 16 }}> Forgot password?</Text>
      </TouchableOpacity>

      <Pressable titleSize={20} style={styles.logInButton(isValid)} onPress={handleSubmit} disabled={!isValid}>
        <Text style={styles.logInButtonText}>Log In</Text>
      </Pressable>

      <View style={ styles.signUpContainer }>
        <Text style={{ color: 'white', fontSize: 16}}> Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
            <Text style={{ color: '#6bb0f5', fontSize: 16}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </>
    )}
    </Formik>
  )
}

const styles = StyleSheet.create ({
    nameInputField: {
        backgroundColor: 'black', 
        color: 'white', 
        fontSize: 20, 
        marginTop: 80,
        paddingLeft: 10,
        borderWidth: 2, 
        borderBottomColor: 'white'
    },
    passwordInputField: {
        backgroundColor: 'black', 
        color: 'white',
        fontSize: 20, 
        marginTop: 20, 
        marginBottom: 10, 
        paddingLeft: 10,
        borderWidth: 2, 
        borderBottomColor: 'white'
    },
    logInButton: isValid => ({
        backgroundColor: isValid ? '#0096f6' : '#9acaf7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    }),
    logInButtonText: {
        fontWeight: '600',
        color: 'white',
        fontSize: 20
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        width: '100%'
    }
})

export default LoginForm