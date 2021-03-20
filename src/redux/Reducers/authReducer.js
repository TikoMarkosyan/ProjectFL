/*
 * add error side after see design
 * */
import * as types from '../Actions/types';


const authReducer = (state = {}, action) => {

	switch (action.type) {

		case types.SING_IN:
			return {
				...state,
				userinfo:action.playoud
			}
		case types.SING_IN_ERR:
			console.log("Sign in error...");
			return state;
		case "SIGN_OUT":
			console.log("You signed out..");
			return state;
		case types.SIGN_UP:
			console.log("tiko welcome")
			toast("Welcome..");
			return state;
		case types.SIGN_UP_ERR:
			console.log("Sign up error...");
			return state;
		default:
			return state;
	}
}

export default authReducer;