import React, { useState, useEffect } from "react";
import {
    TouchableOpacity,
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
import { getHall, setOrder,getOnlyOneFood, setTableRezerv } from "../../api/Halls";
import { strings } from '../../utils/i18n';

function Table(props) {

    const [load, setLoad] = useState(true);
    const [orderPrice, serOrederPrice] = useState(0);

    const menuorder = (name,id) => {
        props.getOnlyOneFood(name,id)
        props.navigation.navigate('Menu');
    }

    const reserv = () => {
        props.setTableRezerv(props.hallname, props.user, props.table.name);
        props.setOrder(props.hallname, props.table.name, props.user, props.shoppingcard);
        props.getHall(props.hallname);
        props.navigation.goBack();
    }

    const menu = () => {
        return Object.keys(props.menu).map((item, i) => {
            return (
                <>
                    <Text>{"food name " + item}</Text>
                    <Text>{"price " + props.menu[item].price  }</Text>
                    <Button title={strings("table.add_button") } onPress={() => { menuorder(props.hallname, item); }} />
                     </>
                )
         })
    }

    const shoppingcard = () => {
        return Object.keys(props.shoppingcard).map((item, index) => {
            return (
                <>
                    <Text>{item}</Text>
                    { Object.keys(props.shoppingcard[item]).map((el, i) => {
                        if (props.shoppingcard[item][el] === true) {
                            return <Text>{el + " +"}</Text>
                        } else if (props.shoppingcard[item][el] === false) {
                            return <Text>{el + " -"}</Text>
                        } else if (el !== "name") {
                          return  <Text>{el + " " + props.shoppingcard[item][el]}</Text>
                         }
                        
                    })}
            </>
               )
        })
        console.log(prise);
        serOrederPrice(prise);
    }
    useEffect(() => {
        if (props.table !== undefined) {
            setLoad(false);
        }
    }, [props.table])

    useEffect(() => {
        Object.keys(props.shoppingcard).map((item, index) => {
            serOrederPrice(orderPrice + props.shoppingcard[item].section * props.shoppingcard[item].price)
        })
    }, [props.shoppingcard])

return (
     load ? <Text>Loadding</Text> : <>
         <Text>Menu Restoran</Text>
        {menu()}
        <Text>Your Order:</Text>
        {shoppingcard()}
        <Text>your order prise is: {orderPrice}</Text>
        <Button title={strings("table.order_button")}  onPress={ reserv }/>
        </>
        )
}


const mapStateToProps = (state) => {

    const table = state.hallFoodReducer.table;
    const uid = state.firebase.auth.uid;
    const menu = state.hallFoodReducer.menu;
    const hallname = state.hallFoodReducer.hallName;
    const shoppingcard = state.hallFoodReducer.shoppingCard;

    return {
        table: table,
        menu: menu,
        hallname: hallname,
        shoppingcard: shoppingcard,
        user: uid,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHall: (name) => dispatch(getHall(name)),
        setOrder: (name, tbName, user, info) => dispatch(setOrder(name, tbName,user,info)),
        getOnlyOneFood: (name, id) => dispatch(getOnlyOneFood(name, id)),
        setTableRezerv: (name, user, tbName) => dispatch(setTableRezerv(name, user, tbName))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);