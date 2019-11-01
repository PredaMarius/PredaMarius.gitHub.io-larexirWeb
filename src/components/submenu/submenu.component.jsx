import React from 'react';
import './submenu.styles.scss';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';

const SubMenu=({title, history, linkUrlNewOrder, linkUrlOrdersHistory,linkUrlOrdersUnsent, match})=>(
    
    <div className='submenu'>
        <h1 className='title'>{title.toUpperCase()}</h1>
            <Button 
                variant="contained" 
                color="primary"
                onClick={()=>history.push(`${match.url}${linkUrlNewOrder}`)}
                className='submenu-button'
            >
                    COMANDA NOUA
            </Button>

            <Button 
                variant="contained" 
                color="primary"
                onClick={()=>history.push(`${match.url}${linkUrlOrdersUnsent}`)}
                className='submenu-button' 
            >
                    COMENZI NETRIMISE
            </Button>

            <Button 
                variant="contained" 
                color="primary"
                onClick={()=>history.push(`${match.url}${linkUrlOrdersHistory}`)}
                className='submenu-button'
            >
                    ISTORIC COMENZI TRIMISE
            </Button>
    </div>
)

export default withRouter(SubMenu);