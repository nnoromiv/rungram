import { View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Divider } from '../home/Post'
import validUrl from 'valid-url'
import '../../firebase/firebase'
import { getAuth } from 'firebase/auth'
import { collection, onSnapshot,  serverTimestamp, where, limit, addDoc} from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { launchCamera } from 'react-native-image-picker'

const PLACEHOLDER_IMG = 'https://www.nicepng.com/png/full/172-1726208_emdtphotography-logo-camera-logo-vector-png.png'

const uploadPostSchema = yup.object().shape({
    imageUrl: yup.string(),
    caption: yup.string().max(2200, 'Characted limit reached')
})


const FormikPostUploader = ({navigation}) => {
    const auth = getAuth()
    const userRef = collection(db, 'users')
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
        const user = auth.currentUser
        const unsubscribe = (userRef, where(
            'owner_uid', '==', user.uid
            ), limit(1), onSnapshot((userRef),{
                next: (
                    snapshot => snapshot.docs.map(
                        doc => {
                            setCurrentLoggedInUser({
                                username: doc.data().username,
                                profilePicture: doc.data().profile_picture
                            })
                        }
                    )
                )
            })
            )
        return unsubscribe
    }

useEffect(() => {
    getUsername()
},[])


const uploadPostToFirebase = (caption) => {
    const unsubscribe = addDoc(collection(db, 'users', auth.currentUser.email, 'posts'), {
        imageUrl: thumbnailUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: auth.currentUser.uid,
        owner_email: auth.currentUser.email,
        caption: caption,
        createdAt: serverTimestamp(),
        likes_by_users: [],
        comments: []
    }).then(() => navigation.goBack())

    return unsubscribe
}

const openCamera = async() => {
    const options = {
        storageOptions: {
          path: 'images',
          mediaType: 'photo',
        },
        includeBase64: true
      }
    
      await launchCamera(options, response => {
        if (response.didCancel) { console.log('Cancelled')}
        else if (response.errorCode) {console.log(response.errorMessage)}
        else if (response.customButton) {console.log(response.customButton)}
        else{
          const source = response.assets[0].uri
          setThumbnailUrl(source)
        }})
}
    
  return (
    <Formik initialValues={{caption: '',}}
    onSubmit={values => uploadPostToFirebase(values.caption, thumbnailUrl)}
    validationSchema={uploadPostSchema}
    validateOnMount={true}
    >
    {({ handleBlur, handleChange, handleSubmit, values, errors, isValid}) => 
        <>
        <View style={{ marginTop: 20}}>
           <TouchableOpacity 
           onPress={openCamera}
           >
           <Image source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl :PLACEHOLDER_IMG }} 
            style={{ width: '100%', height: 500, backgroundColor: 'black', resizeMode: 'contain'}} />
           </TouchableOpacity>
            <View>
            <TextInput 
            placeholder='Write a caption...' placeholderTextColor={'gray'}
            style={{ backgroundColor: 'black', color: 'white', fontSize: 20, marginTop: 20, marginBottom: 20}}
            multiline={true}
            onChangeText={handleChange('caption')}
            onBlur={handleBlur('caption')}
            value={values.caption}

        />
            </View>
        </View>
        <Divider />
        <TextInput style={{ display: 'none'}}
            value={thumbnailUrl}
        />
        {
            errors.imageUrl && (
                <Text style={{fontSize: 14, color:'red'}}>
                    {errors.imageUrl}
                </Text>
            )
        }
        <Text></Text>
        <Button onPress={handleSubmit} title='Post' 
        disabled={thumbnailUrl === PLACEHOLDER_IMG} color='#007AFF'/>
    </>
    }
    </Formik>
  )
}

export default FormikPostUploader