import provincias from "../provincias.js"

function calcPriceWithZip (pesoTotal, provinciaId){
    const provinciaFind = provincias.find(prov => prov.id == provinciaId)
    console.log(provinciaFind);
    let cost;
    if (provinciaId == 0) {
        cost = 0
        return cost
    }
    if(provinciaFind.id == 1 && pesoTotal < 1000){
        cost = 2340
    }else if(provinciaFind.id == 1 && pesoTotal < 5000 && pesoTotal > 1000){
        cost = 2850
    }else if(provinciaFind.id == 1 && pesoTotal < 10000 && pesoTotal > 5000){
        cost = 3730
    }else if(provinciaFind.id == 1 && pesoTotal < 15000 && pesoTotal > 10000){
        cost = 4600
    }else if(provinciaFind.id == 1 && pesoTotal < 20000 && pesoTotal > 15000){
        cost = 5400
    }else if(provinciaFind.id == 1 && pesoTotal < 25000 && pesoTotal > 20000){
        cost = 6600
    }

    if(provinciaFind.id !== 1 && pesoTotal < 1000){
        cost = 3230
    }else if(provinciaFind.id !== 1 && pesoTotal < 5000 && pesoTotal > 1000){
        cost = 3880
    }else if(provinciaFind.id !== 1 && pesoTotal < 10000 && pesoTotal > 5000){
        cost = 5500
    }else if(provinciaFind.id !== 1 && pesoTotal < 15000 && pesoTotal > 10000){
        cost = 6900
    }else if(provinciaFind.id !== 1 && pesoTotal < 20000 && pesoTotal > 15000){
        cost = 8000
    }else if(provinciaFind.id !== 1 && pesoTotal < 25000 && pesoTotal > 20000){
        cost = 9800
    }

    console.log("pesoTOTAL", pesoTotal);
    console.log("costo", cost);
    // if(typeof cp !== 'number')console.log("No se recibio un numero")
    // if(cp === "9310"){
    //     return 0
    // }else{
    //     return 10
    // }
    return cost
}

export {
    calcPriceWithZip
}