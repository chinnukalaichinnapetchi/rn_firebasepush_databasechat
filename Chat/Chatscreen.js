
import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import { GiftedChat, Bubble, Send, InputToolbar, MessageImage } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import InChatfile from './InChatfile';

import { firebase } from '@react-native-firebase/database';





const ChatScreen = (props) => {
    const [messages, setMessages] = useState([]);
    const [msgstate, setmsgstate] = useState(false);
    const [user, setUser] = useState()
    const [imagePath, setImagePath] = useState('')
    useEffect(() => {
        const userCheck = auth().onAuthStateChanged(userlist => {
            if (userlist)
                setUser(userlist)
        })

        return () => {
            userCheck()
            // console.log("user====>", user);
        }
    }, [props])

    // console.log("uid", user);

    const getAllMessages = async () => {
        const docid = props?.route?.params?.uid > user?.uid ? user?.uid + "-" + props?.route?.params?.uid : props?.route?.params?.uid + "-" + user?.uid
        const msgResponse = await firestore().collection('chats')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")
            .get()
        // console.log("msgresponse", msgResponse, docid);
        const allTheMsgs = msgResponse.docs.map(docSanp => {
            return {
                ...docSanp.data(),
                createdAt: docSanp.data().createdAt.toDate()
            }
        })
        if (allTheMsgs == [] || allTheMsgs == undefined || allTheMsgs == '') {
            setmsgstate(true)
        } else {
            setmsgstate(false)
        }
        // console.log("allmessage", allTheMsgs);
        setMessages(allTheMsgs)
    }

    useEffect(() => {
        getAllMessages()
    }, [msgstate == true]);
    useFocusEffect(
        React.useCallback(() => {

            getAllMessages()
            return;
        }, [props])
    );


    const onSend = (msgArray) => {
        console.log("msgArray", msgArray);
        setImagePath('')
        const uid = props?.route?.params?.uid;
        const msg = msgArray[0]
        const usermsg = {
            ...msg,
            sentBy: user?.uid,
            sentTo: uid,
            createdAt: new Date(),
            file: imagePath
        }
        // console.log(usermsg.sentBy, usermsg.sentTo, usermsg.createdAt)

        setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))
        const chatid = uid > user?.uid ? user?.uid + "-" + uid : uid + "-" + user?.uid

        firestore().collection('chats')
            .doc(chatid)
            .collection('messages')
            .add({ ...usermsg, createdAt: firestore.FieldValue.serverTimestamp() })
    }
    const pickDocument = async () => {
        const uid = props?.route?.params?.uid;
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                copyTo: 'documentDirectory',
                mode: 'import',
                allowMultiSelection: true,
            });
            const fileUri = result[0].fileCopyUri;
            if (!fileUri) {
                // console.log('File URI is undefined or null');
                return;
            }
            if (fileUri.indexOf('.png') !== -1 || fileUri.indexOf('.jpg') !== -1) {
                // console.log(fileUri, "fileuriiii");
                var imagename = fileUri.split('/')
                // console.log(imagename, 'imagename');
                const reference = storage().ref(
                    `/myfiles/${imagename[9]}`
                );


                const task = reference.putFile(
                    fileUri.replace("file://", "")
                );


                task.on("state_changed", (taskSnapshot) => {


                });
                task.then(() => {

                });

                var Ref = firebase.storage().ref("myfiles");



                Ref.listAll().then(function (result) {
                    result.items.forEach(function (imageRef) {

                        imageRef.getDownloadURL().then(function (url) {
                            setImagePath(url);

                            // const msg = ''
                            // const usermsg = {
                            //     ...msg,
                            //     sentBy: user?.uid,
                            //     sentTo: uid,
                            //     createdAt: new Date(),
                            //     file: url
                            // }
                            // // console.log(usermsg.sentBy, usermsg.sentTo, usermsg.createdAt)

                            // setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))
                            // const chatid = uid > user?.uid ? user?.uid + "-" + uid : uid + "-" + user?.uid

                            // firestore().collection('chats')
                            //     .doc(chatid)
                            //     .collection('messages')
                            //     .add({ ...usermsg, createdAt: firestore.FieldValue.serverTimestamp() })
                            // console.log("url-------->", url);
                            // setreaddata(true)
                            // setreadimages(url)

                        }).catch(function (error) {

                        });
                    });
                }).catch(function (error) {

                });

                // props.onSend({ image: fileUri })
                // const usermsg = {
                //     ...fileUri,
                //     sentBy: user?.uid,r
                //     sentTo: uid,
                //     createdAt: new Date()
                // }
                // // console.log(usermsg.sentBy, usermsg.sentTo, usermsg.createdAt)

                // setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))
                // const chatid = uid > user?.uid ? user?.uid + "-" + uid : uid + "-" + user?.uid

                // firestore().collection('chats')
                //     .doc(chatid)
                //     .collection('messages')
                //     .add({ ...usermsg, createdAt: firestore.FieldValue.serverTimestamp() })

                // // setIsAttachImage(true);
            } else {
                // props.onSend({ pdf: fileUri, });
                // const usermsg = {
                //     ...fileUri,
                //     sentBy: user?.uid,
                //     sentTo: uid,
                //     createdAt: new Date()
                // }
                // // console.log(usermsg.sentBy, usermsg.sentTo, usermsg.createdAt)

                // setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))
                // const chatid = uid > user?.uid ? user?.uid + "-" + uid : uid + "-" + user?.uid

                // firestore().collection('chats')
                //     .doc(chatid)
                //     .collection('messages')
                //     .add({ ...usermsg, createdAt: firestore.FieldValue.serverTimestamp() })

                //setFilePath(fileUri);
                // setIsAttachFile(true);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled file picker');
            } else {
                console.log('DocumentPicker err => ', err);
                throw err;
            }
        }
    };
    const renderChatFooter = useCallback(() => {
        if (imagePath) {
            return (
                <View >
                    <Image source={{ uri: imagePath }} style={{ height: 85, width: 75 }} />

                </View>
            );
        }
        // if (filePath) {
        //     return (
        //         <View style={styles.chatFooter}>
        //             <InChatFileTransfer
        //                 filePath={filePath}
        //             />
        //             <TouchableOpacity
        //                 onPress={() => setFilePath('')}
        //                 style={styles.buttonFooterChat}
        //             >
        //                 <Text style={styles.textFooterChat}>X</Text>
        //             </TouchableOpacity>
        //         </View>
        //     );
        // }
        // return null;
    }, [imagePath])

    return (
        <View style={{ flex: 1, }}>

            <TouchableOpacity onPress={() => { props.navigation.navigate("Login") }} style={{ backgroundColor: "white", padding: 10, }}>
                <View style={{ flexdirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: '#FFBF00', fontsize: 16, fontWeight: 'bold', }}>Logout</Text>
                </View>
            </TouchableOpacity>
            <GiftedChat
                style={{ flex: 1 }}
                messages={messages}
                onSend={text => onSend(text)}
                user={{
                    _id: user?.uid,
                }}
                renderBubble={(props) => {
                    // let currentMessage = props
                    if (props.currentMessage.file) {
                        console.log("propspropspropspropsprops", props);

                        return (

                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#2e64e5',
                                    borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 5,
                                    width: '30%',
                                }}
                            // onPress={() =>
                            //     navigation.navigate('InChatViewFile', { filePath: currentMessage.file })
                            // }
                            >
                                <InChatfile
                                    style={{ marginTop: -10 }}
                                    filePath={props.currentMessage.file}
                                />
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={{

                                        color: 'white',
                                    }} >
                                        {props.currentMessage.text}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                    return <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: "#FFBF00",

                            }

                        }}
                    />




                }}
                alwaysShowSend
                renderSend={(props) => {

                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => pickDocument()} >
                                <Image style={{ width: 20, height: 20 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/samplernpush-c09ce.appspot.com/o/attachments.png?alt=media&token=dfdf4980-dae8-4cd7-b71f-a1e6d7ca6945' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.onSend({ text: props.text.trim() }, true)} style={{ backgroundColor: '#FFBF00', marginHorizontal: 5, width: 40, height: 24, alignItems: 'center', borderRadius: 2 }}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontsize: 10 }}>Send</Text>
                            </TouchableOpacity>

                        </View>
                    );

                }}
                renderMessageImage={(props) => {
                    return (
                        <MessageImage
                            {...props}
                            imageStyle={{
                                width: '98%',
                                height: Dimensions.get('window').width,
                                resizeMode: 'cover'
                            }}
                        />
                    )
                }}
                // renderActions={(props) => {
                //     let selectFile = async () => {
                //         //Opening Document Picker to select one file
                //         try {
                //             const res = await DocumentPicker.pick({
                //                 //Provide which type of file you want user to pick
                //                 type: [DocumentPicker.types.allFiles],
                //                 //There can me more options as well
                //                 // DocumentPicker.types.allFiles
                //                 // DocumentPicker.types.images
                //                 // DocumentPicker.types.plainText
                //                 // DocumentPicker.types.audio
                //                 // DocumentPicker.types.pdf
                //             });
                //             //Printing the log realted to the file
                //             console.log('res : ' + JSON.stringify(res));
                //             props.onSend({ pdf: res.uri, file_type: 'pdf' });
                //             //Setting the state to show single file attributes
                //             singleFile = res;
                //             // setSingleFile(res);
                //         } catch (err) {
                //             singleFile = null;
                //             // setSingleFile(null);
                //             //Handling any exception (If any)
                //             if (DocumentPicker.isCancel(err)) {
                //                 //If user canceled the document selection
                //                 alert('Canceled from single doc picker');
                //             } else {
                //                 //For Unknown Error
                //                 alert('Unknown Error: ' + JSON.stringify(err));
                //                 throw err;
                //             }
                //         }
                //     }

                // }}
                // renderMessageImage={(props) => {
                //     console.log("propspropspropsprops", props);

                // }}
                renderInputToolbar={(props) => {
                    return <InputToolbar {...props}
                        containerStyle={{ borderTopWidth: 1.5, borderTopColor: '#FFBF00' }}
                        textInputStyle={{ color: "black" }}
                    />
                }}
                renderChatFooter={renderChatFooter}
            />
        </View>

    );
};


export default ChatScreen;