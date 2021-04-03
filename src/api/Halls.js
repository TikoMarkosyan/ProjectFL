import firestore from "@react-native-firebase/firestore";
import { strings } from '../utils/i18n';
// const string change types.ver

export const getHall = (name) => {
    return (dispatch, getState, { getFirebase }) => {
        firestore().collection('halls').doc(name).get().then((doc) => {
            if (doc.exists) {
                dispatch({ type: "GET_TABLE", playoud: doc.data() });
            } else {
                // doc.data() will be undefined in this case
                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: strings("error.error_document") } },);
            }
        }).catch((error) => {
            dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: error+"" } },);
        });
    };
}

// change more effective query

export const getTable = (id, name) => {
    return (dispatch, getState, { getFirebase }) => {
        firestore().collection("halls").doc(name).get().then((doc) => {
            if (doc.exists) {
                dispatch({ type: "OPEN_TABLE", playoud: doc.data().tables[id] });
            } else {
                // doc.data() will be undefined in this case
                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: strings("error.error_document") } },);
            }
          
            
        }).catch((error) => {
            dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: error+"" } },);
        });

    }
}

export const getOnlyOneFood = (name,i) => {
    return (dispatch, getState, { getFirebase }) => {
        firestore().collection("halls").doc(name).get().then((doc) => {
            if (doc.exists) {
                dispatch({ type: "GET_ONE_FOOD", playoud: doc.data().menu[i] });
            } else {
                // doc.data() will be undefined in this case
                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: strings("error.error_document") } },);
            }


        }).catch((error) => {
            dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: error + "" } },);
        });

    }
}


export const setTableRezerv = (name, user,tbName) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.firestore().collection('halls').doc(name).set({
            tables: {
                [tbName]: {
                    reservation: {
                        booking: true,
                        user:user
                    }
                }
            }
        }, { merge: true });
      
    }
}
// to do setOrder
export const setOrder = (name, tbName, user, info) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.firestore().collection('orderFood').doc(user).set({
            [name]: {
                [tbName]: {
                    ...info
                }
            }
        }, { merge: true }).then(() => {
            dispatch({ type: "DELETE_FOOD_SOPPINGCARD" });
        })

    }
}