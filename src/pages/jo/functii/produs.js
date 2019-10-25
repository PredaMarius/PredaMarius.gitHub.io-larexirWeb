export const mpJV=(vLungime=0, vInaltime=0,vDeschidere=0)=>{
    switch(vInaltime){
        case 0:
            return (vLungime / 1000).toFixed(2)
        default:
            if(vDeschidere==="L"){
                return ((vLungime*116 * (vInaltime>1500?vInaltime:1500) *6/10)/1000000).toFixed(2)
            }else{
                return (vLungime * (vInaltime>1500?vInaltime:1500) /1000000).toFixed(2)
            }
    }
}


export const actJV=(vInaltime=0)=>{
    switch(true){
        case (vInaltime<=800):
            return 800
        case (vInaltime>800 && vInaltime<=900) :
                return (vInaltime/100).toFixed(0)
        case (vInaltime>900 && vInaltime<=1200) :
                return ((vInaltime-100)/100).toFixed(0)*100
        case (vInaltime>1200 && vInaltime<=2000) :
                return ((vInaltime-200)/100).toFixed(0)*100
        case (vInaltime>2000) :
                return ((vInaltime-300)/100).toFixed(0)*100
        default:
                return 0
    } 
}

export const pretJV=(vMP=0,vPretMaterial=0,vConsole=0,vPretConsole=0,vBuc)=>{
    return ((vMP*vPretMaterial+vConsole*vPretConsole)*vBuc).toFixed(2)
}

