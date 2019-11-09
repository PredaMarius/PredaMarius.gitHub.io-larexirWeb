
import React from 'react';
import {connect} from 'react-redux';
import './app-bar.styles.scss';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';


class Bar extends React.Component {
   
    handleSignIn=()=>{
    this.props.history.push('/signin');
    }

    handleContact=()=>{
        this.props.history.push('/contact');
        }

    handleContFirma=()=>{
        this.props.history.push('/contfirma/1');
        }
    render() {
        const {handleSignOut, currentUser}=this.props
        
    
        return (
            <div className="root">
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className="title">
                    Larexir Decor WebStore
                </Typography>
                
                {currentUser !== null? 
                    <Button color="inherit" onClick={this.handleContact}>Contact</Button>
                    : 
                    null
                }

                {currentUser !== null? 
                    <Button color="inherit" onClick={this.handleContFirma}>Firma:{currentUser.idFirma.denumire}</Button>
                    : 
                    null
                }

                {currentUser !== null? 
                    <Button color="inherit" onClick={handleSignOut}>Deonectare</Button>
                    : 
                    <Button color="inherit" onClick={this.handleSignIn}>Conectare</Button>
                }
                
                </Toolbar>

            </AppBar>
            </div>
        );
    }
}


const mapStateToProps=state=>({
    currentUser:state.user.currentUser
})

Bar = connect(mapStateToProps)(Bar);

export default withRouter(Bar)