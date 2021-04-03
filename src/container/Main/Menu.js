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

import InputSpinner from "react-native-input-spinner";
import { addFoodOrder } from "../../redux/Actions/hallFoodAction";
import { strings } from '../../utils/i18n';

import { connect } from "react-redux";

function Menu(props) {

    const [number, setNumber] = useState(1);
    const [foodIngredients, setFoodIngredients] = useState({});

    const toggleIngredients = (item,bool) => {
        setFoodIngredients({
            ...foodIngredients,
            [item]:!bool
        })
    }

    const save = (foodIngredients) => {
        props.addFoodOrder(foodIngredients);
        props.navigation.goBack();
    }

    useEffect(() => {
        setFoodIngredients(props.menu);
    }, [props.menu])

    const res = Object.keys(props.menu).map((item, index) => {
       
                     if (foodIngredients[item] === false) {
                        return (
                            <>
                            <Text>{item + " ka"}</Text>
                                <Button
                                    title={strings("menu.add_button")}
                                    onPress={() => { toggleIngredients(item,false) }}
                                  />
                            </>
                        )
                     } else if (foodIngredients[item] === true) {
                         return (
                             <>
                                 <Text>{item + " cka"}</Text>
                                 <Button
                                     title={strings("menu.remove_button")}
                                     onPress={() => { toggleIngredients(item, true) }}
                                 />
                             </>
                         )
                     } else if (foodIngredients[item] >= 1 && item != "price") {
                             return(
                                 <>
                                     <Text>bajin
                                     <InputSpinner
                                         max={30}
                                         min={1}
                                         step={1}
                                         colorMax={"#f04048"}
                                         colorMin={"#40c5f4"}
                                         value={number}
                                             onChange={(num) => {
                                              setNumber(num);
                                              setFoodIngredients({
                                                  ...foodIngredients,
                                                  [item]: num
                                              });
                  
                                         }}
                                         />;
                                         </Text>
                                 </>
                             )
                         }
                              
    })

    return (
        <>
            <Text>tiko</Text>
            { res}
            <Button title={strings("menu.save_button")} onPress={() => { save(foodIngredients) }} />
    </>
    )
}


const mapStateToProps = (state) => {

    const menu = state.hallFoodReducer.oneFood
    return {
        menu: menu
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFoodOrder: (obj) => dispatch(addFoodOrder(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);