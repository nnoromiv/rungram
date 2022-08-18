import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { USERS } from '../../data/users'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDoc, limit, onSnapshot, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

const Stories = () => {

  const auth = getAuth()
  const [currentProfilePictiure, setCurrentProfilePicture] = useState('')

  const getUser = async () => {
      const docRef = doc( db, 'users', auth.currentUser.email)
      const docSnap = await getDoc(docRef)
      docSnap.exists() && setCurrentProfilePicture({
        profilePicture: docSnap.data().profile_picture
      })
  }

useEffect(() => {
  getUser()
},[])

  return (
    <View style={{ marginBottom: 13}}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View style={{ alignItems: 'center'}}>
    <Image style={styles.yourStory} source={{ uri: currentProfilePictiure.profilePicture }}/>
    <Text style={styles.addStory}>+</Text>
    <Text style={{ color: 'white'}}> Your story</Text>
    </View>
    {USERS.map((story, index) => (
        <View key={index} style={{ alignItems: 'center'}}>
        <Image source={{uri: story.image}} style={styles.story} />
        <Text style={{ color: 'white'}}> {
            story.user.length > 11 ? story.user.slice(0,8).toLowerCase() + '...' : story.user.toLowerCase()
        } </Text>
        </View>
    ))}
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    story: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 3,
        borderColor: 'white',
    },
    yourStory : {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 6,
        marginTop: 10
    },
    addStory: {
      color: 'white',
      borderWidth: 1,
      width: 20,
      textAlign: 'center',
      borderRadius: 50,
      position: 'absolute',
      bottom: 20,
      right: -1,
      backgroundColor: 'blue'
    }
})

export default Stories