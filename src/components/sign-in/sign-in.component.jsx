import React from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {strapi} from "../../strapi/strapi.config";
import {setToken,setUser, setAdreseLivrare, adrese} from "../../strapi/strapi.utils.js";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, setCurrentUserDeliveryAddresses} from '../../redux/user/user.actions'

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            open: false,
            mesaj: "",
            loading: false
          };

    }
    
    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        const {handleSignIn}= this.props;
        
          try {
            // set loading to true
            this.setState({ loading: true });
            // make request to sign in user with strapi
            const response = await strapi.login(email, password);
            // set loading to false
            // put token (to manage user session) in local storage
            setToken(response);
            setUser(response.user)
            this.props.setCurrentUser(response.user)
            handleSignIn();
            //make request to strapi for adreselivrares on current user
            const filters = {idFirma: response.user.idFirma.id}
            const res = await strapi.getEntries("adresalivrares",filters);
            console.log(response.user.idFirma.id)
            setAdreseLivrare(adrese(res))
            this.props.setCurrentUserDeliveryAddresses(res)
            this.setState({ loading: false });
            // redirect user to home page
            this.props.history.push('/')
            // this.redirectUser("/");
          } catch (err) {
            // set loading to false
            this.setState({ loading: false });
            // show error message cu SnackBar
            this.setState({ open: true, mesaj: err.message });
          }
      };
   
   
    redirectUser = path => this.props.history.push(path);

    isFormEmpty = ({ email, password }) => {
        return !email || !password;
      };
    
    handleChange=event=>{
        const {value, name}= event.target;
        this.setState({[name]:value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>Conecteaza-te la contul tau</h2>
                <form  className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                    label="Email"
                    name="email" 
                    type="email" 
                    value={this.state.email} 
                    onChange={this.handleChange}
                    required/>

                    <FormInput 
                    label="Parola"
                    name="password" 
                    type="password" 
                    value={this.state.password} 
                    onChange={this.handleChange}
                    required/>
                    <CustomButton type="submit">Autentificare</CustomButton>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user)),
  setCurrentUserDeliveryAddresses:addresses=>dispatch(setCurrentUserDeliveryAddresses(addresses))
})

export default connect(null,mapDispatchToProps)(withRouter(SignIn));