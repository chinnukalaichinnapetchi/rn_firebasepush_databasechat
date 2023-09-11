import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid, TouchableOpacity } from "react-native";



const Success = (props) => {



    return (
        <View style={styles.Container}>
            <View style={{ flex: 1 }}>

                <Text style={styles.paragraph}>Success</Text>


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
        fontSize: 20,
        color: "black",
        fontWeight: 'bold',
        marginHorizontal: 10
    },

})
export default Success;