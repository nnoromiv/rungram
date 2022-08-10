import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import Validator from 'email-validator'

const LoginForm = ( {navigation} ) => {
    const [email, setEmail] = useState('')
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required(' Incorrect '),
        password: Yup.string().required().min(8, 'Password invalid')
    })
  return (
    <Formik
    initialValues={{ email: '', password: ''}}
    onSubmit={(values) => console.log(values)}
    validationSchema={LoginFormSchema}
    validateOnMount={true}
    >
    {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
    <>
      <TextInput
      placeholder='Phone number, Username or Email' placeholderTextColor='white'
      autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress'
      autoFocus={false} autoComplete={'email'}
      onChangeText={handleChange('email')}
      onBlur={handleBlur('email')}
      value={values.email}
      style={[ styles.nameInputField, {
        borderBottomColor: values.email.length < 1 || Validator.validate(values.email) ? 'white' : 'red'
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
        borderBottomColor: 1 > values.password.length || values.password.length <= 8  ? 'white' : 'red'
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