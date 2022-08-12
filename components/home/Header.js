import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import  '../../firebase/firebase'
import { getAuth } from 'firebase/auth'

const handleSignOut = async() => {
    const auth = getAuth()
    try {
        await auth.signOut()
        console.log('SignOut successful')
    } catch (error) {
        console.log(error.message)
    }
}

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={handleSignOut}>
    <Image style={styles.logo} source={require('../../assets/logo.webp')} />
    </TouchableOpacity>

    <View style={styles.iconContainer}>
    <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
    <Image style={styles.icon} source={{
        uri: 'https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/60/ffffff/external-plus-multimedia-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png'
    }} />
    </TouchableOpacity>
    <TouchableOpacity>
    <Image style={styles.icon} source={{
        uri: 'https://img.icons8.com/material-outlined/60/ffffff/filled-like.png'
    }} />
    </TouchableOpacity>
    <TouchableOpacity>
    <View style={styles.unreadBadge}>
        <Text style={styles.unreadBadgeText}>11</Text>
    </View>
    <Image style={styles.icon} source={{
        uri: 'https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/60/ffffff/external-Messenger-social-media-tanah-basah-basic-outline-tanah-basah.png'
    }} />
    </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    logo : {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    iconContainer: {
        flexDirection: 'row'
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: '600'
    }
})

export default Header