import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'
import '../firebase/firebase'
import { collection, collectionGroup, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])
  const colGroup = collectionGroup(db, 'posts')
  useEffect(() => {
      onSnapshot(query(colGroup, orderBy('createdAt', 'desc') ),{
        next: (snapshot => {
          setPosts(snapshot.docs.map(post => (
            {
              id: post.id, ...post.data()
            }
          )))
        }),
        // error: (error => console.log(error))
      })
  },[])
  return (
    <SafeAreaView style={styles.bodyContainer}>
      <Header navigation={navigation}/>
      <Stories />
      <ScrollView vertical>
        {posts.map((post, index) => (
            <Post post={post} key={index}/>
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons}/>
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: 'black',
        flex: 1
    }
})

export default HomeScreen
