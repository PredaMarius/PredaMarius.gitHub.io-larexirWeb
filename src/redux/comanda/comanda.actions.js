import {LOAD_COMENZI, SET_COMANDA, SET_REPER, SET_OPEN_EDIT_COMANDA,SET_OPEN_EDIT_REPER,SET_OPEN_REPERE, ADAUGA_COMANDA, RESETARE_COMANDA, RESETARE_REPER, ADAUGA_REPER, LOAD_MATERIALE, LOAD_PRETCONSOLE} from "./comanda.actions.types"

export const loadComenzi =(comenzi)=> ({
    type:LOAD_COMENZI,
    payload:comenzi
});

export const loadMateriale =(materiale)=> ({
  type:LOAD_MATERIALE,
  payload:materiale
});

export const setComanda =(comanda)=> ({
  type:SET_COMANDA,
  payload:comanda
});

export const setReper = (reper)=> ({
  type:SET_REPER,
  payload:reper
});

export const setOpenEditComanda =(stare)=> ({
  type:SET_OPEN_EDIT_COMANDA,
  payload:stare
});

export const setOpenEditReper =(stare)=> ({
  type:SET_OPEN_EDIT_REPER,
  payload:stare
});

export const setOpenRepere =(stare)=> ({
  type:SET_OPEN_REPERE,
  payload:stare
});

export const adaugaComanda =(comanda)=> ({
  type:ADAUGA_COMANDA,
  payload:comanda
});

export const adaugaReper =(reper)=> ({
  type:ADAUGA_REPER,
  payload:reper
});

export const resetareComanda =()=> ({
  type:RESETARE_COMANDA
});

export const resetareReper =()=> ({
  type:RESETARE_REPER
});

export const loadPretConsole=(pret)=>({
  type:LOAD_PRETCONSOLE,
  payload:pret
});