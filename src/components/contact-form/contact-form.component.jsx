import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import './contact-form.styles.scss'

let ContactForm=props=>{
    const {handleSubmit}=props;
    return (
        <div>
            <h2 className="title">Contact</h2>
            
            <div className="contact">
                   
                    <div className="infcontainer">
                        <div>
                            <img  src="http://larexir.ro/wp-content/themes/larexir/images/logo.png" className="logo" alt=""/>
                        </div>
                        <div>
                            <p className="information">
                                Strada Soldat Ene Modoran, Nr. 6 Bucuresti <br></br>
                                RO 24130091<br></br>
                                J40/11378/02.07.2008<br></br>
                                Pentru orice întrebări, ne poţi suna la numarul 0738 455 555 sau ne puteți scrie la adresa office@larexir.ro<br></br>
                                Răspundem cinci zile pe săptămână, în intervalul 09-17:30.
                            </p>
                        </div>
                    </div>
                    
                    <div className="infcontainer">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="group">
                                <label className='form-input-label' htmlFor="email">Email-ul tau</label>
                                <div>
                                    <Field name="email" component="input" type="text" className="form-input" />
                                </div>
                            </div>
                            <div className="group">
                                <label className='form-input-label' htmlFor="subiect">Subiect mesaj</label>
                                <div>
                                    <Field name="subiect" component="input" type="text" className="form-input"/>
                                </div>
                            </div>
                            <div className="group">
                                <label className='form-input-label' htmlFor="mesaj">Mesaj</label>
                                <div>
                                    <Field name="mesaj" component="textarea" className="form-input" />
                                </div>
                            </div>
                            
                            <button type="submit">Trimite mesaj</button>

                        </form>
                    </div>
                </div>
        </div>
    )
}




const mapStateToProps=state=>({ 
    initialValues:{email:state.user.currentUser.email}
})


ContactForm=reduxForm({
    form:'contact'
})(ContactForm)

ContactForm= connect(mapStateToProps)(ContactForm)


export default ContactForm