import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) =>  (
    <View style={styles.container}>
        <Header navigation={navigation}/>
        {/* FORMIKPOSTUPLOADER */}
        <FormikPostUploader navigation={navigation}/>
    </View>
)

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
    <Image source={{ uri: 'https://img.icons8.com/material-rounded/60/ffffff/return.png'}} 
    style={{ width: 30, height: 30,}}/>
    </TouchableOpacity>
      <Text style={styles.headerText}>NEW POST</Text>
      <Text></Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 10
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 20,
        marginRight: 22
    }
})

export default AddNewPost