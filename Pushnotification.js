import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { Notification } from 'react-native-notifications';
PushNotification.createChannel({
    channelId: "channel-id", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
},
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
const NotificationController = (props) => {
    useEffect(() => {

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {

            PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
                onRegister: function (token) {
                    console.log("TOKEN:", token);
                },

                // (required) Called when a remote is received or opened, or local notification is opened
                onNotification: function (notification) {
                    console.log("NOTIFICATION:", notification);
                    if (notification.foreground) {
                        console.log(notification.foreground);
                        PushNotification.localNotification({
                            message: remoteMessage.notification.body,
                            title: remoteMessage.notification.title,
                            bigPictureUrl: remoteMessage.notification.android.imageUrl,
                            smallIcon: remoteMessage.notification.android.imageUrl,
                            // channelId: remoteMessage.notification.android.channelId,
                            channelId: 'channel-id',
                            vibrate: true,
                        });
                    }


                },

                onAction: function (notification) {
                    console.log("ACTION:", notification.action);
                    console.log("NOTIFICATION:1", notification);

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

        });
        return unsubscribe;
    }, []);
    return null;
};
export default NotificationController;