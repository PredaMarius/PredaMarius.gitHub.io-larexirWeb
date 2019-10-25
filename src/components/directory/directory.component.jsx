import React from 'react';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';

class Directory extends React.Component{
    constructor(){
        super();
        this.state={
            sections:[{
                title:'jaluzele verticale',
                imageUrl:'http://larexir.ro/wp-content/uploads/2015/12/jal_vert.png',
                size:'medium',
                id:1,
                linkUrl:'jaluzeleverticale'
            },
            {
                title:'rolete panza',
                imageUrl:'http://larexir.ro/wp-content/uploads/2015/12/rolete_textile.png',
                size:'medium',
                id:2,
                linkUrl:'roletepanza'
            },
            {
                title:'rulouri exterioare',
                imageUrl:'http://larexir.ro/wp-content/uploads/2015/12/rulou_suprapus.png',
                size:'medium',
                id:3,
                linkUrl:'rulouriexterioare'
            },
            {
                title:'usi de garaj',
                imageUrl:'http://larexir.ro/wp-content/uploads/2015/12/usi_garaj.png',
                size:'medium',
                id:4,
                linkUrl:'usigaraj'
            },
            {
                title:'plase insecte',
                imageUrl:'http://larexir.ro/_grafic/produse/plase/plase_rulou_01.png',
                size:'medium',
                id:5,
                linkUrl:'plaseinsecte'
            },
            {
                title:'jaluzele orizontale',
                imageUrl:'http://larexir.ro/wp-content/uploads/2015/12/jaluzele_orizontale.png',
                size:'medium',
                id:6,
                linkUrl:'jaluzeleorizontale'
            }]
        }
    }

    render(){
        return(

            <div className='directory-menu'>
                { this.state.sections.map(({id, ...otherSectionProps})=>(
                    <MenuItem key={id} {...otherSectionProps}/>
                ))}   
            </div>
        )
    }
}

export default Directory;