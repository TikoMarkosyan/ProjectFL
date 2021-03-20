import React from 'react';
import { Provider } from 'react-redux';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import { Auth, LogIn } from "./src/navigation/index";
import { connect } from "react-redux";

function App(props) {
    console.log(props.uid+""+ props.emailVerified)
    const res = (props.uid && props.emailVerified) ? <LogIn /> : <Auth />
    console.log((props.uid && props.emailVerified) ? "tiko" : "first")
    return (
            <>
            { res } 
            </>
    );
};

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    const isLoaded = state.firebase.auth.isLoaded;
    if (isLoaded) {
        const emailVerified = state.firebase.auth.emailVerified;
        return {
            uid: uid,
            isLoaded: isLoaded,
            emailVerified: emailVerified
        };
    }
    return {
        uid: uid,
        emailVerified: null,

    };
};
/*
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),

    };
};*/
export default connect(mapStateToProps, null)(App);
