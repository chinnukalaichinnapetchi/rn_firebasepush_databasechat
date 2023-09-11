import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid, TouchableOpacity } from "react-native";



const Task = (props) => {
    const [awake1, setawake1] = useState(false)
    const [awake2, setawake2] = useState(false)
    const [awake3, setawake3] = useState(false)

    const [active1, setactive1] = useState(false)
    const [active2, setactive2] = useState(false)
    const [active3, setactive3] = useState(false)

    const onpress1 = () => {
        setawake1(!awake1)

    }
    const onpress2 = () => {
        setawake2(!awake2)

    }
    const onpress3 = () => {
        setawake3(!awake3)

    }
    const onpress11 = () => {
        setactive1(!active1)

    }
    const onpress12 = () => {
        setactive2(!active2)

    }
    const onpress13 = () => {
        setactive3(!active3)

    }
    const onsubmitpress = () => {
        console.log(awake3)

        if (awake3 === false && active1 === true && active3 == false && ((awake1 === false || awake2 === false) || (awake1 === true || awake2 === true))) {
            props.navigation.navigate('Success')
        } else if (awake3 === true && active1 == true && ((active2 === false || active3 === false) || (active2 === true || active3 === true))) {
            props.navigation.navigate('Failure')
        } else
            if ((awake2 === false && active3 === true && awake1 === true) && ((awake3 === false || awake3 === true))) {
                props.navigation.navigate('Success')
            } else if (((awake2 === true || awake1 === true) && active3 === true) && ((awake3 === false || awake3 === true))) {
                props.navigation.navigate('Failure')
            } else
                if ((awake1 === true || awake2 === true || awake3 === true) && (active2 === true)) {
                    props.navigation.navigate('Success')
                } else if ((awake1 === false) || (awake1 === false) || (awake3 === false) && (active2 === true)) {
                    props.navigation.navigate('Failure')
                }




    }

    return (
        <View style={styles.Container}>
            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 50, marginTop: '10%' }}>
                    <View style={{ alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            <View style={styles.CircleShape}></View>
                            <Text style={styles.paragraph}>  Sleep</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            <View style={[styles.CircleShape, { backgroundColor: 'green' }]}></View>
                            <Text style={styles.paragraph}>Awake</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 50, marginTop: '10%' }}>
                    <View style={{ alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            <View style={[styles.CircleShape, { backgroundColor: '#FF9800' }]}></View>
                            <Text style={styles.paragraph}>    InActive</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            <View style={[styles.CircleShape, { backgroundColor: 'blue' }]}></View>
                            <Text style={styles.paragraph}>Active</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, marginTop: '15%', }}>
                    <View style={{ flex: 0.1, marginTop: 15, flexDirection: 'row', justifyContent: 'space-around', }}>
                        <TouchableOpacity onPress={() => onpress1()} style={[styles.button, { backgroundColor: awake1 ? 'green' : 'red' }]}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Friend</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onpress2()} style={[styles.button, { backgroundColor: awake2 ? 'green' : 'red' }]}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Arch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onpress3()} style={[styles.button, { backgroundColor: awake3 ? 'green' : 'red' }]}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', alignSelf: 'center', }}>kniish</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.1, marginTop: '15%', flexDirection: 'row', justifyContent: 'space-around', }}>
                        <TouchableOpacity onPress={() => onpress11()} style={[styles.button, { backgroundColor: active1 ? 'blue' : '#FF9800' }]}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>FA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onpress12()} style={[styles.button, { backgroundColor: active2 ? 'blue' : '#FF9800' }]}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Spy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onpress13()} style={[styles.button, { backgroundColor: active3 ? 'blue' : '#FF9800' }]}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', alignSelf: 'center', }}>Signal</Text>
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity onPress={() => onsubmitpress()} style={[styles.button1, { backgroundColor: 'white', flex: 0.1, borderColor: 'black', marginTop: '15%', borderWidth: 1 }]}>
                        <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>Submit</Text>
                    </TouchableOpacity>
                </View>


            </View>
            {/*  */}


        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        // alignItems: 'center'
    },
    paragraph: {
        textAlign: "center",
        fontSize: 18,
        color: "black",
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    CircleShape: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        backgroundColor: 'red',

    },
    button: {

        width: '20%',
        height: '75%',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 4,
        borderRadius: 5,
        // justifyContent: 'center',
        marginHorizontal: 15
    },
    button1: {

        width: '30%',

        alignItems: 'center',
        alignSelf: 'center',
        padding: 1,
        borderRadius: 5,
        justifyContent: 'center',
        marginHorizontal: 15
    },
})
export default Task;