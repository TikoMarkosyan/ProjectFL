import * as types from './types';
import firestore from "@react-native-firebase/firestore";

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