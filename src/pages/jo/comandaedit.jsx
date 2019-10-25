import React from 'react';
import './css/comandaedit.styles.css';
import { ComboBoxComponent} from '@syncfusion/ej2-react-dropdowns';
import ReactModal from 'react-modal';
import CustomButton from '../../components/custom-button/custom-button.component';
import {connect} from 'react-redux';
import {setComanda,setOpenEditComanda} from '../../redux/comanda/comanda.actions'

class ComandaEdit extends React.Component {
    constructor(props) {
        super(props);       
        this.fields = { text: 'adresa', value: 'adresa' };
        this.discount=this.props.currentUser.idFirma.discountJV;
    }

   
    onChangeAdresaLivrare=(item)=>{
        const {setComanda, comanda}=this.props;
        console.log(item.id)
        let key = "adresaLivrare";
        let value = item===null?'':item.value; 
        setComanda({...comanda, [key]: value}) 
    }
  
    onChange=(e)=> {
        const {setComanda,comanda}=this.props;
        let key = e.target.name;
        let value = e.target.value;
        setComanda({...comanda, [key]: value})    
    }

    closeModal=()=> {
        const {setOpenEditComanda}=this.props;
        setOpenEditComanda({open:false, title:"",add:true});
    } 

    render() {
         
        return (
          
            <ReactModal
            isOpen={this.props.openEditComanda.open} 
            shouldCloseOnOverlayClick={false} 
            ariaHideApp={false}
            style={{ content:{width:'400px', height:'600px'}}}>
                <div>
                    <div className='title'>
                        <h1>{this.props.openEditComanda.title}</h1>
                    </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='id' value={this.props.comanda.id}  disabled={true}/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top">Numar comanda</label>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='dataComanda' value={this.props.comanda.dataComanda}  disabled={true}/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top">Data comanda</label>
                                </div>
                            </div>
                        </div> 
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='clientClient' autoFocus value={this.props.comanda.clientClient} onChange={this.onChange} />
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> Client final</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <ComboBoxComponent 
                                    id='adresaLivrare'
                                    ref={(combobox) => {this.adresaLivrareComboBox = combobox}}
                                    dataSource={this.props.deliveryAddresses}
                                    change={this.onChangeAdresaLivrare}
                                    fields={this.fields}
                                    placeholder="Adresa de livrare"
                                    popupHeight='300px'
                                    floatLabelType='Always'
                                    value={this.props.comanda.adresaLivrare}
                                    autofill={true}
                                />         
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <div className="e-float-input e-control-wrapper">
                                    <textarea name='observatii' text={this.props.comanda.observatii} onChange={this.onChange}/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> Observatii</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <div className="e-float-input e-control-wrapper">
                                    <input type='number' name='valoareCatalog' value={this.props.comanda.valoareCatalog} disabled={true} />
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> Valoare catalog</label>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='prDiscount' value={this.props.comanda.prDiscount} disabled={true} defaultValue={this.discount}/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> Procent discount</label>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='prDiscount' value={this.props.comanda.valoareComanda} disabled={true} />
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> Valoare comanda</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-row alinieredreapta">
                            <div className="form-group col-md-4">
                                <div className="e-float-input e-control-wrapper alinieredreapta">
                                    <input name='valoareClientFinal' value={this.props.comanda.valoareClientFinal} />
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> Valoare client final</label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-buttons">
                            <CustomButton onClick={this.props.openEditComanda.add?this.props.handleAdaugaComanda:this.props.handleModificaComanda}>Salveaza</CustomButton>
                            <CustomButton onClick={this.closeModal}>Abandon</CustomButton>
                        </div>
                </div>
            </ReactModal>);
    }

}


const mapDispatchToProps=dispatch=>({
    setComanda:(comanda)=>dispatch(setComanda(comanda)),
    setOpenEditComanda:(stare)=>dispatch(setOpenEditComanda(stare))
})
  
const mapStateToProps=state=>({
    currentUser:state.user.currentUser,
    deliveryAddresses:state.user.deliveryAddresses,
    comanda:state.comanda.comanda,
    openEditComanda:state.comanda.openEditComanda,
})

export default connect(mapStateToProps,mapDispatchToProps)(ComandaEdit);