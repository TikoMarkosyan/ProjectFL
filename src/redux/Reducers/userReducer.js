/*
 * add user info if should
 * */
import * as types from '../Actions/types';

const initialState = {
	user: {
		firstname: "",
		secondename:"",
		}
}
const userReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.GET_INFO:
			return {
				user: {
					...action.playoud
                }
			};
		case types.SIGN_OUT: {
			return initialState
		}
		default:
			return state;
	}
}

export default userReducer;