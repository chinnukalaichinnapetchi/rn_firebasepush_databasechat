import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid } from "react-native";
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const App = () => {


  PushNotification.createChannel(
    {
      channelId: "fcm_default_channel",
      channelName: "push_notification",
    }
  )

  useEffect(() => {
    checkToken();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.configure({

        onRegister: function (token) {
          console.log("TOKEN:", token);
        },

        onNotification: function (notification) {
          if (notification.foreground) {
            console.log(notification.foreground, "nottt", remoteMessage);
            PushNotification.localNotification({
              message: remoteMessage.notification.title,

              channelId: 'fcm_default_channel',
              vibrate: true,
            });
          }


        },

        onAction: function (notification) {


        },

        onRegistrationError: function (err) {
          console.error(err.message, err);
        },

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },


        popInitialNotification: true,


        requestPermissions: true,
      });
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      // Alert.alert(fcmToken);
    }
  }
  return (
    <View style={styles.Container}>
      {/* <NotificationController /> */}
      <Text style={styles.paragraph}> Push Notification With Firebasse  </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center'
  },
  paragraph: {
    textAlign: "center",
    fontSize: 22,
    color: "black",
    fontWeight: 'bold',
  },
})
export default App;