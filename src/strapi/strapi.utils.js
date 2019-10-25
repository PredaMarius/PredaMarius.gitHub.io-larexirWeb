// Auth
const TOKEN_KEY="jwt";
const USER='user';
const ADRESELIVRARE='adreselivrare'


export const setToken=(value, tokenKey=TOKEN_KEY)=>{
    if(localStorage){
        localStorage.setItem(tokenKey, value.jwt);
        // localStorage.setItem(user, JSON.stringify(value.user))
    }
}

export const setAdreseLivrare=(value,adreselivrare=ADRESELIVRARE)=>{
    if(localStorage){
        localStorage.setItem(adreselivrare,JSON.stringify(value))
    }
}

export const getAdreseLivrare=(adreselivrare=ADRESELIVRARE)=>{
    if(localStorage && localStorage.getItem(adreselivrare)){
        return JSON.parse(localStorage.getItem(adreselivrare));
    }
    return null;
}



export const getToken=(tokenKey=TOKEN_KEY)=>{
    if(localStorage && localStorage.getItem(tokenKey)){
        return JSON.parse(localStorage.getItem(tokenKey));
    }
    return null;
}

export const clearToken=(tokenKey=TOKEN_KEY,user=USER,adreselivrare=ADRESELIVRARE)=>{
    if(localStorage){
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(user)
        localStorage.removeItem(adreselivrare)
        
    }
    return null;
}

export const getUser=(user=USER)=>{
    if(localStorage && localStorage.getItem(user)){
        return JSON.parse(localStorage.getItem(user));
    }
    return null;
}


export const setUser=(value,user=USER)=>{
    if(localStorage){
        localStorage.setItem(user,JSON.stringify(value))
    }
}
// --------------------------------------------------------
function objectToString(json){
	const arr=[];
	if (json.length>0){
		json.map(object=>(arr.push({adresa:object})));
	}

return(arr.length>0?arr:[{adresa:""}])
}
// --------------------------------------------------------
export function adrese(json){
const adr=[]
objectToString(json).map(o=>(adr.push({adresa:"".concat(o.adresa.numeLocatie,", ").concat(o.adresa.oras,", ").concat(o.adresa.adresa,", cod postal ").concat(o.adresa.codPostal,"")})))
return adr
}
// -------------------------------------------------------