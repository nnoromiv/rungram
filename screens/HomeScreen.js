import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.bodyContainer}>
      <Header navigation={navigation}/>
      <Stories />
      <ScrollView vertical>
        {POSTS.map((post, index) => (
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
