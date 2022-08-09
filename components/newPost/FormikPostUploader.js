import { View, Text, Image, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Divider } from '../home/Post'
import validUrl from 'valid-url'

const PLACEHOLDER_IMG = 'https://img.icons8.com/sf-black-filled/500/ffffff/image.png'

const uploadPostSchema = yup.object().shape({
    imageUrl: yup.string().url().required('A URL is required'),
    caption: yup.string().max(2200, 'Characted limit reached')
})
  

const FormikPostUploader = ({navigation}) => {
    const [ thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
  return (
    <Formik initialValues={{caption: '', imageUrl: ''}}
    onSubmit={(values) => {console.log(values)
    console.log('Your post was submitted successfully')
    navigation.goBack()
    }}
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