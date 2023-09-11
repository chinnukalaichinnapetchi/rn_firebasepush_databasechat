import React, { useEffect, useState, } from "react";
import { SafeAreaView, FlatList, StatusBar, View, Text, Image, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';
const Userlist = (props) => {
    const [users, setUsers] = useState(null)
    useEffect(() => {
        getUsers()
    }, [])


    const getUsers = async () => {

        const querySanp = await firestore().collection('users').where('uid', '!=', props?.route?.params?.uid).get()
        const allUsers = querySanp.docs.map(docSnap => docSnap.data())
        console.log(allUsers)
        setUsers(allUsers)
    }




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar />
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.uid}
                    renderItem={({ item }) => {
                        console.log("item", item);
                        return (
                            <View>
                                {item.email != '' ?
                                    <TouchableOpacity
                                        // style={{ backgroundColor: '#FFBF00' }}
                                        onPress={() => props.navigation.navigate('Chatscreen', { name: item.name, uid: item.uid, users: users })}
                                    >
                                        <View style={{
                                            width: '100%',
                                            height: 'auto',
                                            marginHorizontal: 4,
                                            marginVertical: 6,
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                        }} >
                                            <Image style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 25,
                                            }} source={{ uri: item.email === 'adb1@gmail.com' ? 'https://picsum.photos/200/300' : 'https://picsum.photos/200' }} />
                                            <View style={{
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                padding: 5,
                                                paddingLeft: 10,
                                                width: 300,
                                                backgroundColor: 'transparent',
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#FFBF00',
                                            }}>

                                                <Text style={{ paddingTop: 5, color: 'white' }} >{item.email}</Text>

                                                <Text style={{ paddingTop: 5, color: 'white' }} >{item.uid}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    : null}
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    );
};



export default Userlist;