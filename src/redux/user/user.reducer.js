import { SET_CURRENT_USER, SET_DELIVERY_ADDRESSES } from "./user.actions.types"

const INITIAL_STATE = {
    currentUser:null,
    deliveryAddresses: []
  };

const userReducer=(state = INITIAL_STATE, action)=> {
   switch(action.type){
    case SET_CURRENT_USER:
      return{
      ...state, 
      currentUser:action.payload
      }
    case SET_DELIVERY_ADDRESSES:
        return{
        ...state, 
        deliveryAddresses:action.payload
        }  

     default:
       return state;
   }
  };
  
export default userReducer;