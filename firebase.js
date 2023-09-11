// import { firebase } from "@react-native-firebase/messaging";
import React, { useRef, useState } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import { firebase } from '@react-native-firebase/database';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
//database  realtimedatabase
const reference = firebase
    .app()
    .database('gs://samplernpush-c09ce.appspot.com')
    .ref('/uploadimage');

const firebaseimg = () => {
    const [imagepath, setimagepath] = useState('')
    const [readimages, setreadimages] = useState('')
    const [readdata, setreaddata] = useState(false)

    const RbSheet = useRef(null)

    //write image to Db
    const writeimage = async (image) => {
        var imagename = image.path.split('/')
        console.log(imagename[11], 'imagename');
        const reference = storage().ref(
            `/myfiles/${imagename[11]}`
        );


        const task = reference.putFile(
            image.path.replace("file://", "")
        );


        task.on("state_changed", (taskSnapshot) => {

            console.log(
                `${taskSnapshot.bytesTransferred} transferred 
               out of ${taskSnapshot.totalBytes}`
            );
        });
        task.then(() => {

        });


        // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${imagename[11]}`;
        // // uploads file
        // await ref.putFile(pathToFile);
        setreaddata(false)
        // reference.set({
        //     url: image.path,

        // })
        //     .then(() => console.log('Data set.'))
        //     .catch((e) => console.log("errer", e))

    };

    //readimage from db
    const readimage = async () => {
        var Ref = firebase.storage().ref("myfiles");



        Ref.listAll().then(function (result) {
            result.items.forEach(function (imageRef) {

                imageRef.getDownloadURL().then(function (url) {
                    console.log("url-------->", url);
                    setreaddata(true)
                    setreadimages(url)

                }).catch(function (error) {

                });
            });
        }).catch(function (error) {

        });



        // reference.once('value', snapshot => {
        //     let data = snapshot.val();
        //     setreadimages(data.url)
        //     setreaddata(true)

        //     console.log("data================>", snapshot, data);
        // });
    }

    const upload = (value) => {
        if (value == 1) {
            RbSheet.current.close()
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {

                writeimage(image)
                console.log("image------------->", image);
                setimagepath(image.path)
            });
        } else {
            RbSheet.current.close()
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {

                writeimage(image)
                setimagepath(image.path)


            });
        }

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    {imagepath != '' ?
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <Image style={{ width: 200, height: 300 }} source={{ uri: imagepath }}></Image>
                        </View>
                        : null}


                    <TouchableOpacity onPress={() => { RbSheet.current.open() }} style={{ width: '50%', height: '5%', backgroundColor: 'green', borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'white', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 7 }}>Write Image</Text>
                    </TouchableOpacity>
                    {readdata == true && readimages != '' ?
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                            <Image style={{ width: 200, height: 300 }} source={{ uri: readimages }}></Image>
                        </View>
                        : null}
                    <TouchableOpacity onPress={() => { console.log("loggggggggggg"); readimage() }} style={{ width: '50%', height: '5%', backgroundColor: 'red', borderRadius: 5, alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: 'white', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 7 }}>Read Image</Text>
                    </TouchableOpacity>
                </View>

                <RBSheet
                    ref={RbSheet}
                    height={200}
                    openDuration={250}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8

                        }
                    }}
                >
                    <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 15, marginHorizontal: 30 }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Select file</Text>
                    </View>
                    <TouchableOpacity onPress={() => { RbSheet.current.close(), upload(1) }} style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 30 }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Take a Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { RbSheet.current.close(), upload(2) }} style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 30 }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Choose from Gallery</Text>
                    </TouchableOpacity>

                </RBSheet>

            </View>

        </SafeAreaView>
    )

}
export default firebaseimg;