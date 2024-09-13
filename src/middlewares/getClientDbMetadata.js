import mercadopago from "mercadopago";

export default async function getClientDbMetadata(req, res, next) {

    const query = req.query

    let payment;

    if (query.type == "payment") {
        const paymentId = query["data.id"]
        
        payment = await mercadopago.payment.findById(paymentId)
        if (payment.body.status == "approved") {
            
            const clientDbByProyectName = payment.body.metadata.proyect_name

            req.proyectName = clientDbByProyectName

            console.log("desde getClientDbMetadata: ", clientDbByProyectName);
            
            next()
        }else{
            return res.sendStatus(204)
        }
    }else{
        return res.sendStatus(204)
    }
}