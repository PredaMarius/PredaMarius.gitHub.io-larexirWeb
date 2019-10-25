import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Selection,Page, Inject,Toolbar, Sort, CommandColumn, Resize, ColumnMenu } from '@syncfusion/ej2-react-grids';
import './css/reperecomanda.styles.css';
import { Browser } from '@syncfusion/ej2-base';
import {strapi} from "../../strapi/strapi.config";
import ReperEdit from './reperedit';
import {connect} from 'react-redux';
import {setOpenEditReper,adaugaReper, setOpenRepere, setReper, resetareReper} from '../../redux/comanda/comanda.actions'
import {dataFormatRO} from '../../utils/functiiComune'
import ReactModal from 'react-modal';
import {mpJV,actJV} from "./functii/produs"


class RepereComanda extends React.Component {
    constructor(props) {
        super(props); 
        this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit' } }];
        this.toolbarOptions = [
            { text: 'Adauga', tooltipText: 'Adauga reper noua', prefixIcon: 'e-add', id: 'Adauga' },
            { text: 'Modifica', tooltipText: 'Modifica reperul selectat', prefixIcon: 'e-edit', id: 'Modifica' },
            { text: 'Sterge', tooltipText: 'Sterge reperul selectat', prefixIcon: 'e-delete', id: 'Sterge' },
        ];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: this.dialogTemplate , allowEditOnDblClick: false };
    };
   
    actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            if (Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                args.dialog.dataBind();    
            }
        }
    }

   
    rowselect(args) {
        const {setReper}=this.props;
        let selRecord = args.data;
        setReper(selRecord)
    }

    rowdeselect(){
        const {resetareReper}=this.props;
        resetareReper();
    }

    clickHandlerMaster=async e=>{
        const {comanda, setReper, setOpenEditReper, reper}=this.props;
        if (e.item.properties.id==='Adauga'){
            setReper({});
            setOpenEditReper({open:true, title:"Adauga reper nou",add:true});
        }
        if (e.item.properties.id==='Modifica' && comanda.id){
            setOpenEditReper({open:true, title:"Modifica reper",add:false});
        }
        if (e.item.properties.id==='Sterge'){
            if (this.masterGrid) {
                const selectedRow = this.masterGrid.getSelectedRowIndexes()[0];
                if (this.masterGrid.getSelectedRowIndexes().length){
                  /** Delete record */
                  const response= await strapi.deleteEntry("comandarepers", reper.id)
                  .catch(e=>(alert("Eroare. Verificati conexiunea la internet. Error:" & e)));
                  
                  if (JSON.stringify(response)===JSON.stringify({})){
                    (this.masterGrid.dataSource).splice(selectedRow, 1);
                  }
                }
                else {
                    alert("Nu ati selectat nici un reper!");
                }
                /** Refresh the Grid */
                this.masterGrid.refresh();
            }
        }   
    }

    adaugaReper=async ()=>{
        const {comenzi,comanda,reper, setReper,setOpenEditReper}=this.props;
        if (this.masterGrid) {
            const res = await strapi.createEntry("comandarepers",
               {
                    "idComanda":comanda.id,
                    "nrCrt":Number(reper.nrCrt?reper.nrCrt:0), // de pus functia de numeroatare automata
                    "tipSubprodus":0,
                    "lungime":Number(reper.lungime?reper.lungime:0) ,
                    "inaltime":Number(reper.inaltime?reper.inaltime:0),
                    "deschidere":reper.deschidere?reper.deschidere:"",
                    "material":reper.material?reper.material:0,
                    "codMaterial":reper.codMaterial?reper.codMaterial:"",
                    "lungimeSnur":Number(reper.lungimeSnur?reper.lungimeSnur:0),
                    "console":Number(reper.console?reper.console:0),
                    "buc":Number(reper.buc?reper.buc:0),
                    "mp":mpJV(reper.lungime, reper.inaltime, reper.deschidere),
                    "pretCatalog":Number(reper.pretCatalog?reper.pretCatalog:0),
                    "tipProdus":"JV",
                    "denumireProdus":"JALUZELE VERTICALE",
                    "denumireSubProdus":"JALUZELE VERTICALE",
                    "denumireMaterial":reper.denumireMaterial?reper.denumireMaterial:""
                  }
            ).catch(e=>(alert("Eroare. Verificati conexiunea la internet. Error:" & e)));
            try{
                var foundComanda = comenzi.findIndex(com => com.id == res.idComanda.id);
                comenzi[foundComanda].comandarepers.unshift(res)
                setReper(res);
                setOpenEditReper({open:false, title:"",add:true});
                this.masterGrid.refresh()
            }catch(e){
                alert("Eroare. Verificati conexiunea la internet. Error:"&e );
            }
        }
    };      

    modificaReper=async ()=>{
        const {reper, setReper,setOpenEditReper,repere, comenzi}=this.props;
        if (this.masterGrid) {  
            const res = await strapi.updateEntry("comandarepers",reper.id,
            {
                "lungime":Number(reper.lungime?reper.lungime:0) ,
                "inaltime":Number(reper.inaltime?reper.inaltime:0),
                "deschidere":reper.deschidere?reper.deschidere:"",
                "material":reper.material?reper.material:0,
                "codMaterial":reper.codMaterial?reper.codMaterial:"",
                "lungimeSnur":Number(reper.lungimeSnur?reper.lungimeSnur:0),
                "console":Number(reper.console?reper.console:0),
                "buc":Number(reper.buc?reper.buc:0),
                "mp":mpJV(reper.lungime, reper.inaltime, reper.deschidere),
                "pretCatalog":Number(reper.pretCatalog?reper.pretCatalog:0),
                "tipProdus":"JV",
                "denumireProdus":"JALUZELE VERTICALE",
                "denumireSubProdus":"JALUZELE VERTICALE",
                "denumireMaterial":reper.denumireMaterial?reper.denumireMaterial:""
              }
            ).catch(e=>(alert("Eroare. Verificati conexiunea la internet. Error:"&e )));
            
            try{
                var foundComanda = comenzi.findIndex(com => com.id == res.idComanda.id);
                var foundReper =  comenzi[foundComanda].comandarepers.findIndex(rep => rep.id == res.id);
                comenzi[foundComanda].comandarepers.splice(foundReper,1,res)
                setReper(res);
                setOpenEditReper({open:false, title:"",add:true});
                this.masterGrid.refresh()
            }catch(e){
                alert("Eroare. Verificati conexiunea la internet. Error:"&e );
            }
        }
    };
    
    closeVizualizareRepere=(props)=>(this.props.setOpenRepere(false))

    
    render() {
        return ( 
            <ReactModal
            isOpen={this.props.openRepere} 
            shouldCloseOnOverlayClick={false} 
            ariaHideApp={false}>
                <div className='control-pane'>
                    <div className="antet">
                        <div className="stanga">
                            <div className="identificareComanda">
                                <div className="itemAntet">Numar comanda:{this.props.comanda.id}</div>
                                <div className="itemAntet" >Data comanda:{dataFormatRO(this.props.comanda.dataComanda)}</div>
                                <div className="itemAntet" >Stadiu:{this.props.comanda.stadiu}</div>
                            </div>
                            <div className="informatiiComanda">
                                <div className="itemAntet">Client:{this.props.comanda.clientClient}</div> 
                                <div className="itemAntet" >Observatii:{this.props.comanda.observatii}</div>
                            </div>
                        </div>
                        <div className="dreapta">
                            <div className="btnClose">
                                <button onClick={this.closeVizualizareRepere}>X</button>
                            </div>
                        </div>
                    </div>
                   
                    <ReperEdit adaugaReper={this.adaugaReper} modificaReper={this.modificaReper}/>

                    <div className='control-section'>
                        <GridComponent dataSource={this.props.comanda.id?this.props.comenzi.filter(com=>com.id==this.props.comanda.id.toString())[0].comandarepers:[]} rowSelected={this.rowselect.bind(this)}  
                                    allowPaging={true} toolbar={this.toolbarOptions} editSettings={this.editSettings} actionComplete={this.actionComplete.bind(this)}
                                    toolbarClick={this.clickHandlerMaster} ref={g => this.masterGrid = g} allowSorting ={true} 
                                     allowResizing={true} showColumnMenu={true} rowDeselected={this.rowdeselect.bind(this)}
                                    selectedRowIndex={-1} 
                        >
                            <ColumnsDirective>
                                <ColumnDirective field='id' headerText='Comanda' width='0' isPrimaryKey={true}/>
                                <ColumnDirective field='nrCrt' headerText='Nr.' width='50'/>
                                <ColumnDirective field='lungime' headerText='Lungime(Garnisa)' width='100'/>
                                <ColumnDirective field='inaltime' headerText='Inaltime' width='100'/>
                                <ColumnDirective field='deschidere' headerText='T' width='75'/>
                                <ColumnDirective field='denumireMaterial' headerText='Material' width='175'/>
                                <ColumnDirective field='codMaterial' headerText='Cod culoare' width='120'/>
                                <ColumnDirective field='lungimeSnur' headerText='Act.' width='75'/>
                                <ColumnDirective field='mp' headerText='MP' type='number' format='N2' width='50'/>
                                <ColumnDirective field='console' headerText='Console' width='100'/>
                                <ColumnDirective field='buc' headerText='Cant.' width='120'/>
                                <ColumnDirective field='pretCatalog' headerText='Pret' width='75'/>
                            </ColumnsDirective>
                            <Inject services={[Selection, Page, Sort,Toolbar, CommandColumn, Resize, ColumnMenu]}/>
                        </GridComponent>
                    </div>
                </div>
        </ReactModal>
        )}
}

const mapDispatchToProps=dispatch=>({
    setOpenEditReper:(stare)=>dispatch(setOpenEditReper(stare)),
    setOpenRepere:(stare)=>dispatch(setOpenRepere(stare)),
    adaugaReper:(reper)=>dispatch(adaugaReper(reper)),
    setReper:(reper)=>dispatch(setReper(reper)),
    resetareReper:()=>dispatch(resetareReper())
  })
  
const mapStateToProps=state=>({
    comenzi:state.comanda.comenzi,
    currentUser:state.user.currentUser,
    comanda:state.comanda.comanda,
    reper:state.comanda.reper,
    openRepere:state.comanda.openRepere
})

export default connect(mapStateToProps,mapDispatchToProps)(RepereComanda);
