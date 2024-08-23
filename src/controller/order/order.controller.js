import { orderServiceFactory } from '../../service/order/order.factory.js'



// const getOrders = async (req, res) => {
//     try {
//         const orders = await orderService.getOrders();
//         res.status(200).json({status: "ok", data: orders});
//     } catch (error) {
//         res.status(500).json({status: "failed", data: error.msg})
//     }
// }

// const createPaymentMP = async (req, res) => {
//     try {
//         // console.log("EL BODY",req.body);
//         const payment = await orderService.createPaymentMP(req.body);
//         res.status(200).json({status: "ok", data: payment});
//     } catch (error) {
//         res.status(500).json({status: "failed", data: error.msg})
//     }
// }

const createPaymentMpStore = async (req, res) => {
    const dbname = req.subdomain
    try {
        const orderService = await orderServiceFactory(dbname)
        const payment = await orderService.createPaymentMpStore(req.body);
        res.status(200).json({status: "ok", data: payment});
    } catch (error) {
        res.status(500).json({status: "failed", data: error.msg})
    }
}

// const getStatusOrderById = async (req, res) => {
//     try {
//         const statusOrder = await orderService.getStatusOrderById(req.params.id)
//         console.log("statussssss", statusOrder);
//         res.status(200).json({status: "ok", data: statusOrder});
//     } catch (error) {
//         res.status(500).json({status: "failed", data: error.msg})
//     }
// }

// const getNotificationMP = async (req, res) => {
//     try {
//         // console.log("desde getNotificationMP");
//         const notification = await orderService.getNotificationMP(req)
//         // notification ? console.log("SI SE COMPLETO") : console.log("NO SE COMPLETO");
//         res.send()
//     } catch (error) {
//         res.status(500).json({status: "failed", data: error.msg})
//     }
// }

// const getSuccessController = async (req, res) => {
//     try {
//         res.send(`<h1>SUCCESS</h1>`)
//     } catch (error) {
//         console.log("error desde controller", error);
//     }
// }

// const getFailureController = async (req, res) => {
//     try {
//         res.send(`<h1>FAILURE</h1>`)
//     } catch (error) {
//         console.log("error desde controller", error);
//     }
// }

export {
    // createPaymentMP,
    // getNotificationMP,
    // getSuccessController,
    // getFailureController,
    // getOrders,
    // getStatusOrderById,
    createPaymentMpStore
}