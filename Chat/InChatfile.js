import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const InChatfile = ({ filePath }) => {
    console.log("inchatfile]====================?");
    var fileType = '';
    var name = '';
    // if (filePath !== undefined) {
    //     name = filePath.split('/').pop();
    //     fileType = filePath.split('.').pop();
    // }
    return (
        <View style={styles.container}>
            <View
                style={styles.frame}
            >
                <Image
                    source={{ uri: filePath }}

                    style={{ height: 60, width: 60 }}
                />

            </View>
        </View>
    );
};
export default InChatfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        borderRadius: 15,
        padding: 5,
    },
    text: {
        color: 'black',
        marginTop: 10,
        fontSize: 16,
        lineHeight: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    textType: {
        color: 'black',
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    frame: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 5,
        marginTop: -4,
    },
});
