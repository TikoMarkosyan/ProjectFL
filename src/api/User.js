import firestore from "@react-native-firebase/firestore";
import { strings } from '../utils/i18n';

export default  getUser = (uid) => {
    return (dispatch, getState, { getFirebase }) => {
        firestore().collection('users').doc(uid).get().then((doc) => {
            if (doc.exists) {
                dispatch({ type: "GET_INFO", playoud: doc.data() }, doc.data());
            } else {
                // doc.data() will be undefined in this case
                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: strings("error.error_document")} },);
            }
        }).catch((error) => {
            dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: error+"" } },);
        });
    };
}
