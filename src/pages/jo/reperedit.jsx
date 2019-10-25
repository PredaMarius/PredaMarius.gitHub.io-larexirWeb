import React from 'react';
import './css/reperedit.styles.css';
import { ComboBoxComponent} from '@syncfusion/ej2-react-dropdowns';
import ReactModal from 'react-modal';
import CustomButton from '../../components/custom-button/custom-button.component';
import {connect} from 'react-redux';
import {setReper,setOpenEditReper} from '../../redux/comanda/comanda.actions'
import {mpJV, actJV, pretJV} from "./functii/produs";
import { columnSelectionComplete } from '@syncfusion/ej2-grids';

class ReperEdit extends React.Component {
    constructor(props) {
        super(props);  
        const{reper}=this.props     
        this.fieldsMaterial = { text: 'denumire', value: 'key' };
        this.fieldsDeschidere={ text: 'denumire', value: 'value' };
        this.deschidere=[{denumire:"T1",value:"1"},{denumire:"T2",value:"2"},{denumire:"T3",value:"3"}, {denumire:"T4",value:"4"},{denumire:"Lamele",value:"L"}, {denumire:"Dubla deschidere",value:"DA"}]
    }

    onChangeMaterial= async(item)=>{
        console.log(item)
        const {setReper, reper}=this.props;
        let key = "material";
        let key2="denumireMaterial";
        let value=null;
        let value2="";
        
        if (item.itemData){
            value = item.value;
            value2=item.itemData.denumire
        }
        await setReper({...reper, [key]: value, [key2]:value2})
        await this.calculPretCatalog()
       
    }
  
    onChangeDeschidere= async (item)=>{
        const {setReper, reper}=this.props;
        let key = "deschidere";
        let value = item===null?0:item.value; 
        await setReper({...reper, [key]: value})
        await this.calculPretCatalog()
    
       
    }

    onChange=async (e)=> {
        const {setReper,reper, pretConsole, materiale}=this.props;
        let key = e.target.name;
        let value = e.target.value;
        await setReper({...reper, [key]: value}) 

        if(key==="inaltime"){
            await this.calculLungimeSnur()
            await this.calculPretCatalog()
        }else{
            await this.calculPretCatalog()
        }
    }

    calculLungimeSnur= async ()=>{
        const {setReper,reper}=this.props;
       console.log("declansare blur")
        setReper({...reper, lungimeSnur:actJV(reper.inaltime)})  
    }

    calculPretCatalog= async()=>{
        const {reper, setReper,pretConsole, materiale}=this.props
        const pretMaterialSelectat=materiale.filter(mat=>(mat.key==reper.material))[0]?materiale.filter(mat=>(mat.key==reper.material))[0].pret:0
        console.log(mpJV(reper.lungime, reper.inaltime, reper.deschidere),pretMaterialSelectat,reper.console,pretConsole,reper.buc)
        setReper({...reper, pretCatalog:pretJV(mpJV(reper.lungime, reper.inaltime, reper.deschidere),pretMaterialSelectat,reper.console,pretConsole,reper.buc)})  
    }

       
    closeModal=()=> {
        
        const {setOpenEditReper}=this.props;
        setOpenEditReper({open:false, title:"",add:true});
    } 

    render() { 
        const {reper}=this.props   
        return (
            <ReactModal
            isOpen={this.props.openEditReper.open} 
            shouldCloseOnOverlayClick={false} 
            ariaHideApp={false}
            style={{ content:{width:'400px', height:'800px'}}}>
                <div>
                    <div className='title'>
                        <h1>{this.props.openEditReper.title}</h1>
                    </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='nrCrt' autoFocus value={this.props.reper.nrCrt} onChange={this.onChange}  />
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top">Nr. Crt</label>
                                </div>
                            </div>
                        </div> 

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='lungime' type="number" value={this.props.reper.lungime} onChange={this.onChange} />
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top">Lungime</label>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='inaltime' type="number"  value={this.props.reper.inaltime} onChange={this.onChange} />
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top">Inaltime</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <ComboBoxComponent 
                                    id='deschidere'
                                    ref={(combobox) => {this.deschidereComboBox = combobox}}
                                    dataSource={this.deschidere}
                                    change={this.onChangeDeschidere}
                                    fields={this.fieldsDeschidere}
                                    placeholder="Tip deschidere"
                                    popupHeight='300px'
                                    floatLabelType='Always'
                                    value={this.props.reper.deschidere}
                                    autofill={true}
                                    allowCustom={false}
                                   
                                />         
                            </div>
                            <div className="form-group col-md-6">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='lungimeSnur' type="number" value={this.props.reper.lungimeSnur} onChange={this.onChange}/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top">Lungime snur actionare</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='codMaterial' value={this.props.reper.codMaterial} onChange={this.onChange}/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> Cod culoare</label>
                                </div>
                            </div>
                        </div>


                        <div className="form-row">
                            <div className="form-group col-md-12">
                                    <ComboBoxComponent 
                                        id='material'
                                        ref={(combobox) => {this.materialComboBox = combobox}}
                                        dataSource={this.props.materiale}
                                        change={this.onChangeMaterial}
                                        fields={this.fieldsMaterial}
                                        placeholder="Material"
                                        popupHeight='300px'
                                        floatLabelType='Always'
                                        value={this.props.reper.material}
                                        autofill={true}
                                        allowCustom={false} 
                                    />         
                                </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='mp' type="number" value={mpJV(reper.lungime, reper.inaltime, reper.deschidere)}  disabled={true}/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> MP</label>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='console' type="number" value={this.props.reper.console} onChange={this.onChange} />
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> Console (buc) </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='pretCatalog' type="number" value={this.props.reper.pretCatalog}  disabled={true}/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> Pret </label>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="e-float-input e-control-wrapper">
                                    <input name='buc' type="number" value={this.props.reper.buc} onChange={this.onChange} onBlur={this.calculPretCatalog}/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"> Cantitate </label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-buttons">
                            <CustomButton  onClick={this.props.openEditReper.add?this.props.adaugaReper:this.props.modificaReper}>Salveaza</CustomButton>
                            <CustomButton onClick={this.closeModal}>Abandon</CustomButton>
                        </div>
                </div>
            </ReactModal>);
    }

}

const mapDispatchToProps=dispatch=>({
    setReper:(reper)=>dispatch(setReper(reper)),
    setOpenEditReper:(stare)=>dispatch(setOpenEditReper(stare))
})
  
const mapStateToProps=state=>({
    materiale:state.comanda.materiale,
    reper:state.comanda.reper,
    openEditReper:state.comanda.openEditReper,
    pretConsole:state.comanda.pretConsole
})

export default connect(mapStateToProps,mapDispatchToProps)(ReperEdit);