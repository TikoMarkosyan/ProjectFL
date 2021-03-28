import firestore from "@react-native-firebase/firestore";


export default  getUser = (uid) => {
    return (dispatch, getState, { getFirebase }) => {
        firestore().collection('users').doc(uid).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                dispatch({ type: "GET_INFO", playoud: doc.data() }, doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    };
}
