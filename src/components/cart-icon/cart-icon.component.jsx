import React, {useContext} from 'react';
import './cart-icon.styles.scss';
import CartContext from '../../contexts/cart/cart.context';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';


const CartIcon=()=>{
    const {toggleHidden}= useContext(CartContext);
    return(
        <div className= 'cart-icon' onClick={toggleHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    );
};

export default CartIcon;
