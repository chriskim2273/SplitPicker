import { useContext, createContext, useState, useEffect } from 'react';
import { auth } from '../../firebase'
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import axios from "axios";

//import { useNavigation } from '@react-navigation/core';

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //const navigation = useNavigation();

    const signUp = () => {
        try {
            createUserWithEmailAndPassword(auth, "christopher.kim.1@stonybrook.edu", "pokemon2273")
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log("Registered as ", user.email);
                    const registerNewUserOnMongo = async () => {
                        const options = {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': user.stsTokenManager.accessToken
                            }
                        }
                        await axios.post('http://127.0.0.1:5000/registerNewUser', {
                            'user_id': user.uid,
                            'email': user.email,
                        }, options).then((response) => {
                            console.log(JSON.stringify(response.data));
                        }, (error) => {
                            console.log(error);
                        });
                    }
                    registerNewUserOnMongo();
                })
                .catch(error => alert(error.message));
        } catch (error) {
            console.log(error);
        }
    }

    const signIn = () => {
        try {
            signInWithEmailAndPassword(auth, "christopher.kim.1@stonybrook.edu", "pokemon2273")
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log("Logged in as ", user.email);
                })
                .catch(error => alert(error.message));
        } catch (error) {
            console.log(error);
        }
    }

    const logOut = () => {
        console.log("current user", auth.currentUser);
        signOut(auth)
            .then((result) => {
                console.log("entered sign out functions");
                setUser(null);
            })
            .catch(error => alert(error.message));
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (current_user) => {
            if (current_user) {
                console.log('user' + JSON.stringify(current_user));
                setUser(current_user);
                //navigation.navigate("Home")
            }
        })
        return () => unsubscribe;
    }, [user])


    return (<AuthContext.Provider value={{ user, signIn, logOut, signUp }}>{children}</AuthContext.Provider>)
}

export const UserAuth = () => {
    return useContext(AuthContext)
}