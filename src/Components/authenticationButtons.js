import React, { useEffect, useState } from 'react';
import Link from 'react';
import { View } from 'react-native';
import { Card, Text, HelperText, TextInput, Button } from 'react-native-paper';
import { UserAuth } from '../Context/AuthContext'


// https://www.youtube.com/watch?v=S_sV6bYWKXQ&ab_channel=CodeCommerce

export const AuthenticationButtons = () => {
    const { user, signIn, logOut, signUp } = UserAuth();
    const [loading, setLoading] = useState(true);

    const handleSignIn = async () => {
        try {
            console.log("joe");
            await signIn();
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        }
        checkAuthentication();
    }, [user])

    const signInButton = <Button onPress={handleSignIn}>Log In</Button>
    const logOutButton = <Button onPress={handleLogOut}>Sign Out</Button>
    const userInfo = (
        <View>
            <Text>Welcome, {user?.displayName}</Text>
            {logOutButton}
        </View>
    )

    return (
        <View>
            {loading ? null : !user ? signInButton : userInfo}
        </View>
    )
}

export default AuthenticationButtons;