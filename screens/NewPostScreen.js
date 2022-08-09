import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import AddNewPost from '../components/newPost/AddNewPost'
import { styles } from './HomeScreen'

const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.bodyContainer}>
    <ScrollView>
    <AddNewPost navigation={navigation}/>
    </ScrollView>
    </SafeAreaView>
  )
}

export default NewPostScreen