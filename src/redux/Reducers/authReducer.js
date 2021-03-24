/*
 * add error side after see design
 * */
import * as types from '../Actions/types';

const initialState = {
	authUser: {
		emailVerified: "",
		uid: "",
	}
}
const authReducer = (state = initialState, action) => {

	switch (action.type) {

		case types.SING_IN:
			return {
				authUser: {
					emailVerified: action.playoud.user.emailVerified,
					uid: action.playoud.user.uid
				}
			}
		case types.SING_IN_ERR:
			console.log("Sign in error...");
			return state;
		case "SIGN_OUT":
			console.log("You signed out..");
			return state;
		case types.SIGN_UP:
			return {
				authUser: {
					emailVerified: action.playoud.user.emailVerified,
					uid: action.playoud.user.uid
				}
				
			};
		case types.SIGN_UP_ERR:
			console.log("Sign up error...");
			return state;
		default:
			return state;
	}
}

export default authReducer;