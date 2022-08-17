import { View, Text, Image, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Divider } from '../home/Post'
import validUrl from 'valid-url'
import '../../firebase/firebase'
import { getAuth } from 'firebase/auth'
import { collection, onSnapshot,  serverTimestamp, setDoc, where, limit, doc, addDoc} from 'firebase/firestore'
import { db } from '../../firebase/firebase'

const PLACEHOLDER_IMG = 'https://img.icons8.com/sf-black-filled/500/ffffff/image.png'

const uploadPostSchema = yup.object().shape({
    imageUrl: yup.string().url().required('A URL is required'),
    caption: yup.string().max(2200, 'Characted limit reached')
})


const FormikPostUploader = ({navigation}) => {
    const auth = getAuth()
    const userRef = collection(db, 'users')
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
        const user = auth.currentUser
        const owner_uid = auth.currentUser.uid
        const unsubscribe = (userRef, where(
            owner_uid, '==', user.uid
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


const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = addDoc(collection(db, 'users', auth.currentUser.email, 'posts'), {
        imageUrl: imageUrl,
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
    
  return (
    <Formik initialValues={{caption: '', imageUrl: ''}}
    onSubmit={values => uploadPostToFirebase(values.imageUrl, values.caption)}
    validationSchema={uploadPostSchema}
    validateOnMount={true}
    >
    {({ handleBlur, handleChange, handleSubmit, values, errors, isValid}) => 
        <>
        <View style={{ marginTop: 20}}>
            <Image source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl :PLACEHOLDER_IMG }} 
            style={{ width: '100%', height: 300, borderRadius: 25}}/>

            <View>
            <TextInput 
            placeholder='Write a caption...' placeholderTextColor={'gray'}
            style={{ backgroundColor: 'black', color: 'white', fontSize: 20}}
            multiline={true}
            onChangeText={handleChange('caption')}
            onBlur={handleBlur('caption')}
            value={values.caption}

        />
            </View>
        </View>
        <Divider />
        <TextInput 
        onChange={e => setThumbnailUrl(e.nativeEvent.text)}
            placeholder='Enter image URL' placeholderTextColor={'gray'}
            style={{ backgroundColor: 'black', color: 'white', fontSize: 18, marginTop: 10}}
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
            multiline={true}
        />
        {
            errors.imageUrl && (
                <Text style={{fontSize: 14, color:'red'}}>
                    {errors.imageUrl}
                </Text>
            )
        }
        <Text></Text>
        <Button onPress={handleSubmit} title='Post' disabled={!isValid} color='#007AFF'/>
    </>
    }
    </Formik>
  )
}

export default FormikPostUploader