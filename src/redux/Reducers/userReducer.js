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
			console.log("test", action.playoud)
			return {
				user: {
					...action.playoud
                }
			};
		default:
			return state;
	}
}

export default userReducer;