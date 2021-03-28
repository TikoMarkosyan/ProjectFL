import * as types from './types';
import firestore, { firebase } from "@react-native-firebase/firestore";

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { result } from 'lodash';

// get auth in google
export const signInGoogle =  () => {
    return async (dispatch, getState, { getFirebase }) => {
        try {
            const firebase = getFirebase();
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            console.log(firebaseUserCredential);
            dispatch({ type: types.SING_IN, playoud: firebaseUserCredential });
            } catch (error) {
            console.log(error)
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    // user cancelled the login flow
                    console.log("cancled")
                } else if (error.code === statusCodes.IN_PROGRESS) {
                    // operation (e.g. sign in) is in progress already
                    console.log("progres")
                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    // play services not available or outdated
                    console.log("chka")
                } else {
                    // some other error happened
                }
            }
    }
};

export const signIn = creds => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        console.log("test singin");
        firebase
            .auth()
            .signInWithEmailAndPassword(creds.email, creds.password)
            .then((res) => {
            
                dispatch({ type: types.SING_IN, playoud:res});
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.SIGN_IN_ERR }, err);
            });
    };
};

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({
                    type: types.SIGN_OUT
                });
            });
    };
};

export const signUp = creds => {
    return  (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .createUserWithEmailAndPassword(creds.email, creds.password)
            .then((res) => {
             
                const user = firebase.auth().currentUser;
                 user.sendEmailVerification();
            // need to change for real db
                firestore()
                    .collection('users')
                    .doc(res.user.uid)
                    .set({
                        firstname: "Tigran2",
                        secondename: "Markosyan3",
                    });
                dispatch({ type: types.SIGN_UP, playoud: res},res);
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: types.SIGN_UP_ERR }, err);
            });
    };
};

export const forgotPassword = (email) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => console.log('', 'Your password reset mail has been sent'))
            .catch(error => console.log('Error', error.message));
    };
}