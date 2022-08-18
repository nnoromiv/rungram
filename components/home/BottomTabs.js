import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { Divider } from './Post'
export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/material/60/ffffff/home.png',
        inactive: 'https://img.icons8.com/material-outlined/500/ffffff/home.png'
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/search--v5.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/search--v5.png'
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png'
    },
    {
        name: 'Activity',
        active: 'https://img.icons8.com/material/60/ffffff/filled-like.png',
        inactive: 'https://img.icons8.com/material-outlined/60/ffffff/filled-like.png'
    },
    {
        name: 'Profile',
        active: 'https://media.istockphoto.com/photos/african-megacity-lagos-nigeria-picture-id1320231994?k=20&m=1320231994&s=612x612&w=0&h=qE_Q7MSjh0L7uRxJmb1yZqIPqlZ3rBWqamoqJdQmz4c=',
        inactive: 'https://media.istockphoto.com/photos/african-megacity-lagos-nigeria-picture-id1320231994?k=20&m=1320231994&s=612x612&w=0&h=qE_Q7MSjh0L7uRxJmb1yZqIPqlZ3rBWqamoqJdQmz4c='
    },
]

const BottomTabs = ({icons}) => {
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({icon}) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image source={{ uri: activeTab === icon.name ? icon.active : icon.inactive}} style={[
                styles.icon,
                icon.name === 'Profile' ? styles.profilePic() : null,
                activeTab === 'Profile' && icon.name === 'Profile' ? styles.profilePic(activeTab) : null
                ]}/>
        </TouchableOpacity>
    )
  return (
    <View style={styles.wrapper}>
    <Divider />
        <View style={styles.container}>
     {
        icons.map((icon, index) => (
            <Icon key={index} icon={icon} />
        ))
     }
    </View>
    </View>
  )
}

const styles = StyleSheet.create ({
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: -10,
        zIndex: 999,
        backgroundColor: '#000000'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10
    },
    icon: {
        width: 30,
        height: 30,
    },
    profilePic:(activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab === 'Profile' ? 2 : 0,
        borderColor: 'white'
    })
})

export default BottomTabs