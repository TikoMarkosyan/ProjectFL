import firestore from "@react-native-firebase/firestore";

// const string change types.ver

export const getHall = (name) => {
    return (dispatch, getState, { getFirebase }) => {
        firestore().collection('halls').doc(name).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                dispatch({ type: "GET_TABLE", playoud: doc.data() });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    };
}

// change more effective query

export const getTable = (id, name) => {
    return (dispatch, getState, { getFirebase }) => {
        firestore().collection("halls").doc(name).get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data().tables[id]);
                dispatch({ type: "OPEN_TABLE", playoud: doc.data().tables[id] });
            } else {
                // doc.data() will be undefined in this case
                console.log(id, name);
                console.log("No such document!");
            }
          
            
        }).catch((error) => {
            console.log("Error getting document:", error);
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
                console.log(id, name);
                console.log("No such document!");
            }


        }).catch((error) => {
            console.log("Error getting document:", error);
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