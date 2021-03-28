import * as types from '../Actions/types';

const initialState = {
	shoppingCard: {},
	hallName:"",
	menu: {},
	tables: {},
	table: { name: "" },
	oneFood: {}
}
const hallFoodReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.GET_TABLE:
			return {
					...state,
					...action.playoud
			};
		case types.OPEN_TABLE:
			return {
				...state,
				table: { ...action.playoud }
			}
		case types.GET_ONE_FOOD:
			return {
				...state,
				oneFood: { ...action.playoud }
			}
		case types.GET_HALL_NAME:
			return {
				...state,
				hallName: action.playoud
			}
		case types.ADD_FOOD_SOPPINGCARD:
			const key = action.playoud.name;
			return {
				...state,
				shoppingCard: {
					...state.shoppingCard,
					[key]: { ...action.playoud }
                }
			}
		case types.DELETE_FOOD_SOPPINGCARD:
			return {
				...state,
				shoppingCard: {}
			}
		case types.SIGN_OUT: {
			return initialState
        }
		default:
			return state;
	}
}

export default hallFoodReducer;