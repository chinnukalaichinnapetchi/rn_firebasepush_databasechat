/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import Login from './Chat/Login';
import Chatscreen from './Chat/Chatscreen';
import Signupscreen from './Chat/Signupscreen';
import Userlist from './Chat/Userlist';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InChatfile from './Chat/InChatfile';


const Stack = createNativeStackNavigator();


const Chatnavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false

            }}>
                <Stack.Screen
                    name="Login"
                    component={Login}


                />
                <Stack.Screen
                    name="Signupscreen"
                    component={Signupscreen}


                />
                <Stack.Screen
                    name="InChatfile"
                    component={InChatfile}


                />
                <Stack.Screen
                    name="Userlist"
                    component={Userlist}


                />

                <Stack.Screen name="Chatscreen" component={Chatscreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Chatnavigation;
