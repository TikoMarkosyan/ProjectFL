import * as types from './types';


export const getHallName = (name) => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({ type: "GET_HALL_NAME", playoud: name });
    };
}

export const addFoodOrder = (food) => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({ type: "ADD_FOOD_SOPPINGCARD", playoud: food });
    };
}

