import { SET_CURRENT_USER, SET_DELIVERY_ADDRESSES } from "./user.actions.types"

export const setCurrentUser =(user)=> ({
    type:SET_CURRENT_USER,
    payload:user
  });

  export const setCurrentUserDeliveryAddresses =(deliveryAddresses)=> ({
    type:SET_DELIVERY_ADDRESSES,
    payload:deliveryAddresses
  });