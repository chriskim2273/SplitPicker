import { useContext, createContext, useState, useEffect } from 'react';
import { auth } from '../../firebase'
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
            })
            .catch(error => alert(error.message));
        setUser(null);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (current_user) => {
            if (current_user) {
                console.log(current_user);
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