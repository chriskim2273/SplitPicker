import { useContext, createContext, useState, useEffect } from 'react';
import { auth } from '../../firebase'
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import axios from "axios";

//import { useNavigation } from '@react-navigation/core';

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //const navigation = useNavigation();


    const registerNewUserOnDatabase = async (user) => {
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
            console.log(JSON.stringify(error));
            if (error.code === 'auth/wrong-password') {
                alert('Wrong password provided.');
            } else {
                alert('An error occurred while signing in.');
            }
        });
    }

    const signUp = () => {
        try {
            createUserWithEmailAndPassword(auth, "christopher.kim.1@stonybrook.edu", "pokemon2273")
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log("Registered as ", user.email);
                    registerNewUserOnDatabase(user);
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
                    // Load splits?
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

    const saveSplitsToDatabase = async (all_splits) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.stsTokenManager.accessToken
            }
        }
        await axios.post('http://127.0.0.1:5000/setUserSplits', {
            'user_id': user.uid,
            'all_splits': all_splits,
        }, options).then((response) => {
            console.log(JSON.stringify(response.data));
        }, (error) => {
            console.log(error);
        });
    }

    return (<AuthContext.Provider value={{ user, signIn, logOut, signUp, saveSplitsToDatabase }}>{children}</AuthContext.Provider>)
}

export const UserAuth = () => {
    return useContext(AuthContext)
}