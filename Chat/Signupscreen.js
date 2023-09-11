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



const SignupScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const userRegistration = async () => {
        if (!email || !password) {
            alert("Please fill out the empty fields")
        } else {
            try {
                const newReg = await auth().createUserWithEmailAndPassword(email, password)
                firestore().collection('users').doc(newReg.user.uid).set({

                    email: newReg.user.email,
                    uid: newReg.user.uid
                })
                props.navigation.navigate("Login")
            } catch (err) {
                alert(err);

            }
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, marginVertical: '10%', alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#FFBF00", alignSelf: 'center', marginBottom: 30 }}>Signup</Text>

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
                    <TouchableOpacity onPress={() => userRegistration()} style={{ width: '30%', height: 40, backgroundColor: '#FFBF00', borderRadius: 5, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Signup</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </SafeAreaView>
    )
}
export default SignupScreen;
