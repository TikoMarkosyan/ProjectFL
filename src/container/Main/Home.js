import React, { useState,useEffect } from 'react';
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
import { signOut } from "../../redux/Actions/authActions";
import { getUser } from "../../redux/Actions/api/User";
function Home(props) {

    const [load, setLoad] = useState(true);
    useEffect(() => {
        props.getUser(props.uid);
    }, [])

    useEffect(() => {
        console.log(props.user)
        setLoad(false);
    }, [props])

    return (
        
        load ? <Text>Loadding</Text> :
            <>
                <Text>{props.user.user.firstname} welcome home</Text>
                <Button title="logout" onPress={() => { console.log("singout"); props.signOut() }} />
            </>
        
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    const uid = state.firebase.auth.uid;
    const user = state.user;
    return {
        uid: uid,
        user:user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        getUser: (id) => dispatch(getUser(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);