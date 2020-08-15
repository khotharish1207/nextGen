import React from 'react'
import { Alert } from 'react-native';

export const getLoginAlert = () => {
    Alert.alert(
        "Alert",
        "Please login to perform this action",
        [{
            text: "OK"
        }],
    );
}