import React, { useEffect,useState } from 'react';
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
    const [root, setRoot] = useState(false)
    useEffect(() => {
        console.log("tiko markoyan tiko markosyan");
        console.log(props.uid && props.emailVerified);
        if (props.uid && props.emailVerified) {
            setRoot(true);
        } else {
            setRoot(false);
        } 
    }, [props])
    const res = root ? <LogIn /> : <Auth />
    console.log((props.uid && props.emailVerified) ? "mtanq aziz" : "login hl@" )
    return (
            <>
            { res } 
            </>
    );
};

const mapStateToProps = (state) => {
    console.log("final 3333333333333333333333333333333333333333333333333333");
    console.log(state.auth.authUser);
    const uid = state.firebase.auth.uid;
    const isLoaded = state.firebase.auth.isLoaded;
    if (isLoaded) {
        const emailVerified = state.auth.authUser.emailVerified;
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
