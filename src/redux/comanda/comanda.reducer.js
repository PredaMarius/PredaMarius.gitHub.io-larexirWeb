import {LOAD_COMENZI, SET_COMANDA, SET_REPER, SET_OPEN_EDIT_COMANDA,SET_OPEN_EDIT_REPER,SET_OPEN_REPERE,ADAUGA_COMANDA,RESETARE_COMANDA, RESETARE_REPER , ADAUGA_REPER, LOAD_MATERIALE, LOAD_PRETCONSOLE} from "./comanda.actions.types"

const INITIAL_STATE = {
    comenzi:[],
    comanda:{
      id: null,
      clientClient: "",
      valoareCatalog: 0,
      discount: 0,
      valoareComanda: 0,
      valoareClientFinal: 0,
      observatii: "",
      adresaLivrare: "",
      stadiu: "NETRANSMISA",
      idFirma: {id:null},
      dataComanda: "",
      tipProdus: "",
      comandarepers:
      {
      id: null,
      idComanda: null,
      nrCrt: 1,
      tipSubprodus: 0,
      lungime: 0,
      lungimeFinala: 0,
      inaltime: 0,
      inaltimeFinala: 0,
      deschidere: "",
      culoareLamela: 0,
      culoareCaseta: 0,
      material: 0,
      codMaterial: "",
      lungimeSnur: null,
      actionare: null,
      tipActionare: 0,
      actionareStDr: null,
      ax: null,
      culoareComponente: null,
      optional1: 0,
      optional2: 0,
      optional3: 0,
      console: 0,
      buc: 1,
      mp: 0,
      pretCatalog: 0,
      pretCuDiscount: 0,
      pretClientFinal: 0,
      observatii: "",
      tipProdus: "",
      denumireProdus: "",
      denumireSubProdus: "",
      denumireCuloareLamela: "",
      denumireCuloareCaseta: "",
      denumireMaterial: "",
      denumireTipActionare: "",
      denumireOptional1: "",
      denumireOptional2: "",
      denumireOptional3: ""
      }
    
    }
    ,
    repere:[],
    reper:{
      nrCrt: 1,
      tipSubprodus: 0,
      lungime: 0,
      lungimeFinala: 0,
      inaltime: 0,
      inaltimeFinala: 0,
      deschidere: "",
      culoareLamela: 0,
      culoareCaseta: 0,
      material: 0,
      codMaterial: "",
      lungimeSnur: 0,
      actionare: "",
      tipActionare: 0,
      actionareStDr: "",
      ax: "",
      culoareComponente: "",
      optional1: 0,
      optional2: 0,
      optional3: 0,
      console: 0,
      buc: 1,
      mp: 0,
      pretCatalog: 0,
      pretCuDiscount: 0,
      pretClientFinal: 0,
      observatii: 0,
      tipProdus: "",
      denumireProdus: "",
      denumireSubProdus: "",
      denumireCuloareLamela: "",
      denumireCuloareCaseta: "",
      denumireMaterial: "",
      denumireTipActionare: "",
      denumireOptional1: "",
      denumireOptional2: "",
      denumireOptional3: "",
      fotografii: []
    },
    materiale:[],
    pretConsole:0,
    openEditComanda:{open:false, title:'', add:true},
    openRepere:false,
    openEditReper:{open:false, title:'', add:true},
  };

const comandaReducer=(state = INITIAL_STATE, action)=> {
  switch(action.type){

    case LOAD_COMENZI:
      return {
      ...state, 
      comenzi:action.payload
      }
    case LOAD_MATERIALE:
      return {
      ...state, 
      materiale:action.payload
        }
    case LOAD_PRETCONSOLE:
        return {
        ...state, 
        pretConsole:action.payload
        }

    case SET_COMANDA:
        return {
        ...state, 
        comanda:action.payload
      }  
        
    case SET_REPER:
        return {
          ...state,
          reper:action.payload
        }
      
    case SET_OPEN_EDIT_COMANDA:
          return {
            ...state,
            openEditComanda:action.payload
          }

    case SET_OPEN_EDIT_REPER:
          return {
            ...state,
            openEditReper:action.payload
          }
    case SET_OPEN_REPERE:
        return {
          ...state,
          openRepere:action.payload
        }
    
    case ADAUGA_COMANDA:
      return {
        ...state,
        comenzi:this.state.comenzi.unshift(action.payload)
      }

    case ADAUGA_REPER:
        return {
          ...state,
          repere:this.state.repere.unshift(action.payload)
        }
    case RESETARE_COMANDA:
      return {...state, comanda:INITIAL_STATE.comanda}

      case RESETARE_REPER:
          return {...state, reper:INITIAL_STATE.reper}

    default:
       return state;
   }
};
  
export default comandaReducer;