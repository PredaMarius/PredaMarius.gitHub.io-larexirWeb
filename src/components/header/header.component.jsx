import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import CartContext from '../../contexts/cart/cart.context';
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({handleSignOut, currentUser}) => {
    const [hidden, setHidden]= useState(true);
    const toggleHidden=()=> setHidden(!hidden);
    console.log(currentUser)
    return(
        <div className='header'>
            <Link className='logo-container' to="/">
                <img
                    alt=""
                    src="http://larexir.ro/wp-content/themes/larexir/images/logo.png"
                    className='logo'
                />
            </Link>

            <div className='options'>
                        
                {
                currentUser !== null?
                <div className="option" onClick={handleSignOut}>DECONECTARE</div>
                :
                <Link className='option' to='/signin'>CONECTARE</Link>
                }
                

            {
                currentUser!== null?
                <Link className='option' to="/contfirma/1">Firma:{currentUser.idFirma.denumire}</Link>
                :
                null
                }
                <CartContext.Provider value={{hidden, toggleHidden}} >
                <div className='option'><CartIcon/></div>
                </CartContext.Provider>
               
                
            </div>
            {
                hidden ? null :  <CartDropdown/>

            }
        
            
        </div>
    );
}

const mapStateToProps=state=>({
    currentUser:state.user.currentUser
})
export default connect(mapStateToProps)(Header);