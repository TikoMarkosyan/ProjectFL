import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    TextInput,
    Text,
    useColorScheme,
    View,
    Button,
} from 'react-native';
import { connect } from "react-redux";
import { signIn, forgotPassword } from "../../redux/Actions/authActions";

function ForgotPassword(props) {
    const [email, setEmail] = useState("");
    const onChangePaswword = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) !== false) {
            props.forgotPassword(email);
            props.navigation.goBack();
        } else {
            // to do error messeage
           // console.log("error is not valid email");
        }

    }
    return (
        <>
            <TextInput placeholder="email" type="email" onChangeText={(val) => { setEmail(val) }} />
            <Button title="FrogotPassword" onPress={() => onChangePaswword()} />
        </>

    )
}

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    return {
        uid: uid,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
        forgotPassword: (email) => dispatch(forgotPassword(email))

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);