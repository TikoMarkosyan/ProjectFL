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
import { signUp } from "../../redux/Actions/authActions";
function SignUp(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reapeatPassword, setReapeatPassword] = useState("");
    const [error, setError] = useState("");

    const onReg = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) !== false && password === reapeatPassword && password.length >= 6) {
            const obj = {
                email: email,
                password: password
            }
            props.signUp(obj);
            props.navigation.goBack();
        } else if (reg.test(email) === false) {
            setError("email is not valid");
        } else if (password !== reapeatPassword) {
            setError("password is not the same");
        } else if (password.length <= 6) {
            setError("password is short");
        }
    }
    return ( 
        <>
            <TextInput placeholder="email" onChangeText={(val) => { setEmail(val) }} />
            <TextInput placeholder="password" onChangeText={(val) => { setPassword(val) }} />
            <TextInput placeholder="repeat password" onChangeText={(val) => { setReapeatPassword(val) }} />
            <Text>{ error }</Text>
            <Button title="Reg" onPress={() => onReg()} />
        </>

    )
}

const mapStateToProps = (state) => {
    console.log(state);
    const uid = state.firebase.auth.uid;
    return {
        uid: uid,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);