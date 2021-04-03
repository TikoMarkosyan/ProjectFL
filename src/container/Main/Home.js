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
import { getHallName } from "../../redux/Actions/hallFoodAction";
import  getUser  from "../../api/User";
import { getHall, getTable } from "../../api/Halls";
import { strings } from '../../utils/i18n';

function Home(props) {
    const [hallName, setHallName] = useState("");
    const [load, setLoad] = useState(true);

    const chooseTable = (tbname, hallName) => {
        if (props.tables[tbname].reservation.booking !== true) {
            props.getTable(tbname, hallName);
            props.navigation.navigate('Table');
        }
    }
    const chooseHall = (hallName) => {
        props.getHallName(hallName);
        props.getHall(hallName);
    }

    useEffect(() => {
        props.getUser(props.hallName);
    }, [])

    useEffect(() => {
        setLoad(false);
    }, [props])

    return (
        
        load ? <Text>Loadding</Text> :
            <>
                <TextInput placeholder={strings("home.hall")} type="text" onChangeText={(val) => { setHallName(val) }} />
                <Button title={strings("home.serachtable_button") } onPress={() => { chooseHall(hallName); }} />
                { Object.keys(props.tables).map((el, id) => {
                    if (props.tables[el].reservation.booking === true) {
                        return (<><Text>{props.tables[el].name + " is booking"}</Text>
                            </>
                        )
                    }
                    return (<>
                        <Text>{" table name " + props.tables[el].name}</Text>
                        <Button title={strings("home.this_table")}  onPress={() => { chooseTable(props.tables[el].name, hallName) }} />
                    </>
                    )
                })}
                <Button title={strings("home.logout")} onPress={() => {  props.signOut() }} />
            </>
        
    )
}

const mapStateToProps = (state) => {

    const uid = state.firebase.auth.uid;
    const user = state.user;
    const tables = state.hallFoodReducer.tables;
    const shoppingcard = state.hallFoodReducer.shoppingCard;
    const hallname = state.hallFoodReducer.hallName;

    return {
        uid: uid,
        user: user,
        tables: tables,
        shoppingcard: shoppingcard,
        hallname: hallname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        getUser: (id) => dispatch(getUser(id)),
        getHall: (name) => dispatch(getHall(name)),
        getTable: (id, name) => dispatch(getTable(id, name)),
        getHallName: (name) => dispatch(getHallName(name)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
