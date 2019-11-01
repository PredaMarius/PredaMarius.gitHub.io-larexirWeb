import React from 'react';
import './css/comenzi.styles.css';
import { Browser } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective, Selection,Page, Inject,Toolbar, Sort, CommandColumn, Resize, ColumnMenu } from '@syncfusion/ej2-react-grids';
import ComandaEdit from './comandaedit';
import RepereComanda from './reperecomanda';
import {connect} from 'react-redux';
import {loadComenzi,setComanda, setOpenEditComanda,setOpenRepere,adaugaComanda, resetareComanda, loadMateriale, loadPretConsole} from '../../redux/comanda/comanda.actions'
import {dataFormatRO} from '../../utils/functiiComune'
import {incarcaComenzi, incarcaMateriale, incarcaPretConsole} from './functii/api'
import {stergeComanda, adaugaComandaNoua, modificaComanda} from './functii/crud'

class ComenziJO extends React.Component {
    constructor(props) {
        super(props); 
        this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit'} }];
        this.toolbarOptions = [
            { text: 'Adauga', tooltipText: 'Adauga comanda noua', prefixIcon: 'e-add', id: 'Adauga' },
            { text: 'Modifica', tooltipText: 'Modifica comanda selectata', prefixIcon: 'e-edit', id: 'Modifica' },
            { text: 'Sterge', tooltipText: 'Sterge comanda selectata', prefixIcon: 'e-delete', id: 'Sterge' },
        ];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: this.dialogTemplate , allowEditOnDblClick: false };
        this.tipProdus="JV"
    };
   
    componentDidMount(){
        const {currentUser,loadComenzi, loadMateriale, loadPretConsole}=this.props;
            // functiile de mai jos se afla in functii/api
            incarcaComenzi(this.tipProdus,currentUser.idFirma.id,loadComenzi);
            incarcaMateriale(this.tipProdus, loadMateriale);
            incarcaPretConsole(loadPretConsole);
    }   
   
    actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            if (Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                args.dialog.dataBind();    
            }
        }
    }

    onQueryCellInfo(args) {
        if (args.column.field === 'stadiu') {
            if (args.cell.textContent === "TRANSMISA") {
                args.cell.querySelector(".statustxt").classList.add("e-activecolor");
                args.cell.querySelector(".statustemp").classList.add("e-activecolor");
            }
            if (args.cell.textContent === "NETRANSMISA") {
                args.cell.querySelector(".statustxt").classList.add("e-inactivecolor");
                args.cell.querySelector(".statustemp").classList.add("e-inactivecolor");
            }
        }
    }

    rowselect(args) {
        const {setComanda}=this.props;
        let selRecord = args.data;
        setComanda(selRecord)
    }

    rowdeselect(args){
        const {resetareComanda}=this.props;
        if (args.target.outerText==="Continut"){
            args.cancel=true
        }else{
            resetareComanda();
        }
    }

    handleToolbarClick=async (e)=>{
        const {comanda, setComanda, setOpenEditComanda}=this.props;

        if (e.item.properties.id==='Adauga'){
            setComanda({});
            setOpenEditComanda({open:true, title:"Adauga comanda noua",add:true});
        }

        if (e.item.properties.id==='Modifica' && comanda.id){
            setOpenEditComanda({open:true, title:"Modifica comanda",add:false});
        }else if (e.item.properties.id==='Modifica'){
            alert("Nu ati selectat nici o comanda!");
        }

        if (e.item.properties.id==='Sterge'){
            stergeComanda(comanda.id, this.masterGrid)
        }   
    }

    handleAdaugaComanda=async ()=>{
        const {comanda, currentUser, setComanda,setOpenEditComanda,comenzi}=this.props;
        adaugaComandaNoua(this.tipProdus,currentUser,comanda,this.masterGrid,comenzi,setComanda,setOpenEditComanda);
    };

    handleModificaComanda=async ()=>{
        const {comanda, currentUser, setComanda,setOpenEditComanda,comenzi}=this.props;
        modificaComanda(currentUser, comanda, comenzi, this.masterGrid, setComanda,setOpenEditComanda );
    };


                        
    statusTemplate=(props)=> {
        return (<div id="stadiu" className="statustemp">
      <span className="statustxt">{props.stadiu}</span>
    </div>);
    }

    dataTemplate=(props)=>{return (<div><span>{dataFormatRO(props.dataComanda)}</span></div>)}

    vizualizareRepere=(e)=>{ 
            e.stopPropagation()
            this.props.setOpenRepere(true);
    }

    butttonVizualizareRepere=()=>{
        return(
            <button className="butonContinut" onClick={this.vizualizareRepere}>Continut</button>
        )
    }    

    render() {
        return (       
            <div className='control-pane'>
                
                <h1 className="title">COMENZI JALUZELE VERTICALE</h1>
                <ComandaEdit handleAdaugaComanda={this.handleAdaugaComanda} handleModificaComanda={this.handleModificaComanda}/>
                <RepereComanda/>

                <div className='control-section'>
                    <GridComponent dataSource={this.props.comenzi} rowSelected={this.rowselect.bind(this)}  
                                allowPaging={true} toolbar={this.toolbarOptions} editSettings={this.editSettings} actionComplete={this.actionComplete.bind(this)}
                                toolbarClick={this.handleToolbarClick} ref={g => this.masterGrid = g} allowSorting ={true} 
                                queryCellInfo={this.onQueryCellInfo.bind(this)}  allowResizing={true} showColumnMenu={true} rowDeselected={this.rowdeselect.bind(this)}
                                selectedRowIndex={-1} 
                                >
                        <ColumnsDirective>
                            <ColumnDirective field='id' headerText='Comanda' width='120' isPrimaryKey={true}/>
                            <ColumnDirective field='dataComanda' headerText='Data' template={this.dataTemplate} width='120'/>
                            <ColumnDirective headerText='Continut' width='100'  template={this.butttonVizualizareRepere}/>
                                
                            <ColumnDirective field='stadiu' headerText='Stadiu' template={this.statusTemplate}   width='80'/>
                            <ColumnDirective field='clientClient' headerText='Client' width='200'/>
                            <ColumnDirective field='valoareComanda' headerText='Val. comanda' width='100'/>
                            <ColumnDirective field='observatii' headerText='Observatii' width='100'/>
                            
                        </ColumnsDirective>
                        <Inject services={[Selection, Page, Sort,Toolbar, CommandColumn, Resize, ColumnMenu]}/>
                    </GridComponent>
                </div>
            </div>);
    }
}

const mapDispatchToProps=dispatch=>({
    loadComenzi:(comenzi)=>dispatch(loadComenzi(comenzi)),
    loadMateriale:(materiale)=>dispatch(loadMateriale(materiale)),
    loadPretConsole:(pret)=>dispatch(loadPretConsole(pret)),
    setComanda:(comanda)=>dispatch(setComanda(comanda)),
    setOpenEditComanda:(stare)=>dispatch(setOpenEditComanda(stare)),
    adaugaComanda:(comanda)=>dispatch(adaugaComanda(comanda)),
    resetareComanda:()=>dispatch(resetareComanda()),
    setOpenRepere:(stare)=>dispatch(setOpenRepere(stare))
  })
  
const mapStateToProps=state=>({
    currentUser:state.user.currentUser,
    comenzi:state.comanda.comenzi,
    comanda:state.comanda.comanda,
    pretConsole:state.comanda.pretConsole,
    openRepere:state.comanda.openRepere    
})

export default connect(mapStateToProps,mapDispatchToProps)(ComenziJO);


