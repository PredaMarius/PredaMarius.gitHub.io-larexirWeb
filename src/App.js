import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import {getUser, clearToken, getAdreseLivrare} from "./strapi/strapi.utils.js";
import Header from './components/header/header.component';
import SignIn from './components/sign-in/sign-in.component';
import HomePage from './pages/homepage/homepage.component';
import ContactPage from './pages/contactpage/contactpage.component'
import ComenziJO from './pages/jo/comenzi'
import {connect} from 'react-redux';
import {setCurrentUser, setCurrentUserDeliveryAddresses} from './redux/user/user.actions'



class App extends React.Component {
 

componentDidMount(){
  this.props.setCurrentUser(getUser())
  this.props.setCurrentUserDeliveryAddresses(getAdreseLivrare())
}

handleSignIn=()=>{
  this.props.setCurrentUser(getUser())
} 


handleSignOut=()=>{
  clearToken();
  this.props.setCurrentUser(null)
  this.props.setCurrentUserDeliveryAddresses(null)
}


 render(){
    return (
      <div> 
            <Header handleSignOut={this.handleSignOut}/>
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route exact path='/contact' component={ContactPage}/>
              <Route exact path='/signin' render={() => (
                this.props.currentUser?
                (<Redirect to='/'/>)
                :
                <SignIn handleSignIn={this.handleSignIn}/> )
                }/>
              
              <Route path='/jaluzeleverticale' component={ComenziJO}/>
            </Switch>
      </div>
    );
  }
  
}

const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user)),
  setCurrentUserDeliveryAddresses:addresses=>dispatch(setCurrentUserDeliveryAddresses(addresses))
})
export default connect(null,mapDispatchToProps)(App);
