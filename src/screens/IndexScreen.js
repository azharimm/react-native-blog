import React, {useContext, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native'
import {Context} from '../context/BlogContext'
import {Feather} from '@expo/vector-icons'

const IndexScreen = ({navigation}) => {
    const {state, deleteBlogPost, getBlogPosts} = useContext(Context)

    useEffect(() => {
        //fetch when first load
        getBlogPosts()
        //fetch when screen load again
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts()
        })
        //remove when screen remove
        return () => {
            listener.remove()
        }

    }, [])
    
    return (
        <View>
            <FlatList 
            data={state}
            keyExtractor={(blogPost) => blogPost.title}
            renderItem={({item}) => {
                return (
                <TouchableOpacity onPress={()=> navigation.navigate('Show', {id: item.id})}>
                    <View style={styles.row}>
                        <Text style={styles.title}>{item.title} - {item.id}</Text>
                        <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                            <Feather style={styles.icon} name="trash" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                )
            }} />
        </View>
    )
}

IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Create')}><Feather name="plus" size={30} /></TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24
    }
})

export default IndexScreen