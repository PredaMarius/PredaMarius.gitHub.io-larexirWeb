import {strapi} from "../../../strapi/strapi.config";

export const stergeComanda= async (comandaID, grid)=>{
    if (grid) {
        if (grid.getSelectedRowIndexes().length){
          /** Delete record */
          const response= await strapi.deleteEntry("comandas", comandaID)
          .catch(e=>(alert("Eroare. Verificati conexiunea la internet. Error:" & e)));
          if (JSON.stringify(response)===JSON.stringify({})){
            (grid.dataSource).splice(grid.getSelectedRowIndexes()[0], 1);
          }
        }
        else {
            alert("Nu ati selectat nici o comanda!");
        }
        /** Refresh the Grid */
        grid.refresh();
    }  
}

export const adaugaComandaNoua=async (tipProdus,currentUser,comanda,grid,comenzi,setComanda,setOpenEditComanda)=>{
    if (grid) {
        const res = await strapi.createEntry("comandas",
            {
                "idFirma": currentUser.idFirma.id,
                "tipProdus":tipProdus,
                "clientClient":  comanda.clientClient?comanda.clientClient:"Client necompletat", 
                "valoareCatalog":0, 
                "discount": currentUser.idFirma.discountJV, 
                "valoareComanda":0, 
                "valoareClientFinal":0, 
                "observatii":comanda.observatii?comanda.observatii:"", 
                "adresaLivrare":comanda.adresaLivrare,
                "stadiu": "NETRANSMISA", 
              }
        ).catch(e=>(alert("Eroare. Verificati conexiunea la internet. Error:"&e )));
        try{
            await comenzi.unshift(res)
            await setComanda(res);
            setOpenEditComanda({open:false, title:"",add:true});
            grid.refresh()
        }catch(e){
            alert("Eroare. Verificati conexiunea la internet. Error:"&e );
        }
    }
}

export const modificaComanda=async(currentUser, comanda, comenzi, grid, setComanda,setOpenEditComanda )=>{
    if (grid) {
            
        const res = await strapi.updateEntry("comandas",comanda.id,
           {    "clientClient":  comanda.clientClient?comanda.clientClient:"Client necompletat", 
                "valoareCatalog":comanda.valoareCatalog?comanda.valoareCatalog:0, 
                "discount": currentUser.idFirma.discountJV, 
                "valoareComanda":comanda.valoareComanda?comanda.valoareComanda:0, 
                "valoareClientFinal":comanda.valoareClientFinal?comanda.valoareClientFinal:0, 
                "observatii":comanda.observatii?comanda.observatii:"", 
                "adresaLivrare":comanda.adresaLivrare?comanda.adresaLivrare:"",
                "stadiu": comanda.stadiu?comanda.stadiu:"NETRANSMISA", 
            }
        ).catch(e=>(alert("Eroare. Verificati conexiunea la internet. Error:"&e )));
        try{
            var foundComanda = comenzi.findIndex(com => com.id == res.id);
            comenzi[foundComanda]=res
            setComanda(res);
            setOpenEditComanda({open:false, title:"",add:true});
            grid.refresh()
        }catch(e){
            alert("Eroare. Verificati conexiunea la internet. Error:"&e );
        }
    }
}

   
  