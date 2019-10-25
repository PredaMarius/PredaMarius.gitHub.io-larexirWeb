import {GET_COMENZI_CURENT_USER, GET_MATERIALE, GET_PRETCONSOLE} from "./data-queries";
import {client} from '../../../graphql/config';


export const incarcaComenzi=(tipProdus,currentUserID,loadComenzi)=>{
      client.query({
          query: GET_COMENZI_CURENT_USER,
          variables: {
              "idFirma": currentUserID,
              "tipProdus":tipProdus
          }
      }).then(res=>(loadComenzi(res.data.comandas)
      )).catch(e=>(alert("Eroare. Verificati conexiunea la internet. Error:" & e))); 
}

export const incarcaMateriale=(tipProdus, loadMateriale)=>{
    client.query({
        query: GET_MATERIALE,
        variables: {
            "tipProdus":tipProdus
        }
    }).then(res=>(loadMateriale(res.data.materials)
    )).catch(e=>(alert("Eroare. Verificati conexiunea la internet. Error:" & e)));
}

export const incarcaPretConsole=(loadPretConsole)=>{
    client.query({
        query: GET_PRETCONSOLE
    }).then(res=>(loadPretConsole(res.data.optionals[0].pret)
    )).catch(e=>(alert("Eroare. Verificati conexiunea la internet. Error:" & e)));
}


