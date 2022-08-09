import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { Divider } from './Post'
export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/material-outlined/60/ffffff/home-filled.png',
        inactive: 'https://img.icons8.com/puffy/500/ffffff/experimental-home-puffy.png'
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/search--v5.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/search--v5.png'
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/film-reel--v1.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/film-reel--v1.png'
    },
    {
        name: 'Shop',
        active: 'https://img.icons8.com/fluency-systems-filled/50/ffffff/shop.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/500/ffffff/shop.png'
    },
    {
        name: 'Profile',
        active: 'https://images.generated.photos/18twiOQ0KNpANuKhvd_BmDimhEXv3lAOSt-uCM8j2NY/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvNzkzMjVl/ODgtMmIxMC00OGMy/LTkxNGMtYzc0ZTFj/M2U3ODBiLmpwZw.jpg',
        inactive: 'https://images.generated.photos/18twiOQ0KNpANuKhvd_BmDimhEXv3lAOSt-uCM8j2NY/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvNzkzMjVl/ODgtMmIxMC00OGMy/LTkxNGMtYzc0ZTFj/M2U3ODBiLmpwZw.jpg'
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
        bottom: 0,
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