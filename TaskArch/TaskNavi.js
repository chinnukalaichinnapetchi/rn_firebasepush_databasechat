/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import Success from './Success';
import Failure from './Failure';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Task from './Task';


const Stack = createNativeStackNavigator();


const TaskNavi = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false

            }}>
                <Stack.Screen
                    name="Task"
                    component={Task}


                />
                <Stack.Screen
                    name="Success"
                    component={Success}


                />
                <Stack.Screen
                    name="Failure"
                    component={Failure}


                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default TaskNavi;
