import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TextInput,
    ScrollView,
    SafeAreaView
} from 'react-native';
import auth from '@react-native-firebase/auth';
// import { firebase } from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';



const Login = (props) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //Register user
    const userSignin = async () => {
        if (!email || !password) {
            alert("Please fill out the empty fields")
        } else {
            try {
                const newReg = await auth().signInWithEmailAndPassword(email, password)

                console.log('Sign in done')
                props.navigation.navigate('Userlist', { uid: newReg.user.uid })
                return newReg

            } catch (err) {
                alert('Email or Password incorrect');
            }
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, marginVertical: '10%', alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#FFBF00", alignSelf: 'center', marginBottom: 30 }}>SignIn</Text>

                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor={'white'}
                        style={{

                            textAlign: 'center',
                            height: 50,
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#FFBF00',
                            borderRadius: 5,
                            marginTop: 10,
                            color: 'white'
                        }}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(val) => setEmail(val)}
                    />
                    <TextInput
                        placeholder="Enter Password"
                        placeholderTextColor={'white'}
                        style={{

                            textAlign: 'center',
                            height: 50,
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#FFBF00',
                            borderRadius: 5,
                            marginTop: 10,
                            color: 'white'
                        }}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={(val) => setPassword(val)}
                    />
                    <TouchableOpacity onPress={() => userSignin()} style={{ width: '30%', height: 40, backgroundColor: '#FFBF00', borderRadius: 5, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Signin</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: '500', marginTop: 6 }}>Are you new here?</Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("Signupscreen") }} style={{ alignSelf: 'center' }}><Text style={{ alignSelf: 'center', color: '#FFBF00', fontSize: 16, fontWeight: '500', marginTop: 5, marginLeft: 6 }}>Signup</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Login;
