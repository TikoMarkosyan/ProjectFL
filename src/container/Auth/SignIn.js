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

function SingIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onLog = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log("tiko " + reg.test(email))
        if (reg.test(email) !== false) {
            console.log("tikooo")
            const obj = {
                email: email,
                password: password
            }
            props.signIn(obj);
        } else {
            setError("check your login and password");
        }
    }
    const onRegistrathion = () => {
        props.navigation.navigate('SingUp');
    }
    const onChangePaswword = () => {
        props.navigation.navigate('FrgotPassword');
    }
    return (
        <>
            <TextInput placeholder="email" type="email" onChangeText={(val) => { setEmail(val) } } />
            <TextInput placeholder="password" onChangeText={(val) => { setPassword(val) }} />
            <Text>{ error }</Text>
            <Button title="SignIn" onPress={() => onLog()} />
            <Button title="FrogotPassword" onPress={() => onChangePaswword()} />
            <Button title="SignUp" onPress={() => onRegistrathion()} />
        </>

    )
}

const mapStateToProps = (state) => {
   // console.log("ssssddddddddddsssssssss")
    //console.log(state);
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
export default connect(mapStateToProps, mapDispatchToProps)(SingIn);