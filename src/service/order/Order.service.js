import config from '../../../config.js';
import mercadopago from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../../model/order/model/Order.model.js'
import { productServiceFactory } from '../product/product.factory.js';
import { calcPriceWithZip } from '../../utils/calculateCost/envios.js';
import fs from 'fs'
import { Product } from '../../model/product/model/Product.model.js';

class OrderService {
    constructor(repository) {
        this.orderRepository = repository
    }

    async createPaymentMP(data) {
        try {
            const productsMP = await Promise.all(data.products.map(async (product) => {
                const findPorduct = await productService.getProductById(product.id)
                if(!findPorduct){throw {msg: "No se encontro ese productoooooo"}}
                return {
                    id: findPorduct.id,
                    title: findPorduct.name,
                    category_id: findPorduct.categories[0].categoria.name,
                    description: findPorduct.description,
                    quantity: product.quantity,
                    unit_price: findPorduct.price,
                    currency_id: 'ARS',
                    // picture_url: findPorduct.image
                }
            }))

            const productsMetaData = await Promise.all(data.products.map(async (product)=>{
                const findProduct = await productService.getProductById(product.id)
                if(!findProduct){throw {msg: "No se encontro ese producto"}}
                return{
                    id: findProduct.id,
                    size: product.size,
                    color: product.color,
                    quantity: product.quantity
                }
            }))

            let pesoTotalEnGramos = 0;
            const pesoProductos = await Promise.all(data.products.map(async (product)=>{
                const findProduct = await productService.getProductById(product.id)
                if(!findProduct){throw {msg: "No se encontro ese producto"}}
                pesoTotalEnGramos = pesoTotalEnGramos + (findProduct.pesoGramos * product.quantity)
            }))
            console.log("Peso total", pesoTotalEnGramos);

            mercadopago.configure({
                access_token: config.access_token_mp,
            })

            console.log("nombre y id", data.shipments.receiver_address.state_name, data.shipments.receiver_address.state_id)
            let preference = {
                items: productsMP,
                payer: {
                    name: data.payer.name,
                    surname: data.payer.surname,
                    email: data.payer.email,
                    phone: {
                        area_code: data.payer.phone.area_code,
                        number: parseInt(data.payer.phone.number)
                    },
                    address: {
                        street_name: data.payer.address.street_name,
                        street_number: parseInt(data.payer.address.street_number),
                        zip_code: data.payer.address.zip_code
                    }
                },
                back_urls: {
                    success: config.success_url_mp,
                    failure: config.failure_url_mp,
                },
                payment_methods: {
                    excluded_payment_types: [
                        {
                            id: "ticket"
                        }
                    ],
                    installments: 12
                },
                metadata: {
                    ...data.metadata,
                    products: productsMetaData
                },
                shipments: {
                    receiver_address: {
                        zip_code: data.shipments.receiver_address.zip_code,
                        state_name: data.shipments.receiver_address.state_name,
                        city_name: data.shipments.receiver_address.city_name,
                        street_name: data.shipments.receiver_address.street_name,
                        street_number: parseInt(data.shipments.receiver_address.street_number)
                    },
                    // cost: calcPriceWithZip(pesoTotalEnGramos, data.shipments.receiver_address.state_name),
                    cost: calcPriceWithZip(pesoTotalEnGramos, data.shipments.receiver_address.state_id),
                    mode: "not_specified"
                },
                notification_url: config.notification_url_mp,
                statement_descriptor: "Jarry Indumentaria",
                external_reference: uuidv4(),
            };

            const response = await mercadopago.preferences.create(preference)
            console.log("ELRESMP", response.body);
            const body = response.body
            return {init_point: body.init_point, costShipment: body.shipments.cost, idOrder: body.external_reference}
        } catch (error) {
            console.log("desde order service create payment MP", error);
            throw error
        }
    }

    async createPaymentMpStore(data){
        console.log("data desde createPaymentMpStore", data);
        
        try {
            const productsMP = await Promise.all(data.products.map(async (product) => {
                const findPorduct = await productService.getProductById(product.id)
                if(!findPorduct){throw {msg: "No se encontro ese productoooooo"}}
                return {
                    id: findPorduct.id,
                    title: findPorduct.name,
                    category_id: findPorduct.categories[0].categoria.name,
                    description: findPorduct.description,
                    quantity: product.quantity,
                    unit_price: findPorduct.price,
                    currency_id: 'ARS',
                    // picture_url: findPorduct.image
                }
            }))

            const productsMetaData = await Promise.all(data.products.map(async (product)=>{
                const findProduct = await productService.getProductById(product.id)
                if(!findProduct){throw {msg: "No se encontro ese producto"}}
                return{
                    id: findProduct.id,
                    size: product.size,
                    color: product.color,
                    quantity: product.quantity
                }
            }))

            let pesoTotalEnGramos = 0;
            const pesoProductos = await Promise.all(data.products.map(async (product)=>{
                const findProduct = await productService.getProductById(product.id)
                if(!findProduct){throw {msg: "No se encontro ese producto"}}
                pesoTotalEnGramos = pesoTotalEnGramos + (findProduct.pesoGramos * product.quantity)
            }))
            console.log("Peso total", pesoTotalEnGramos);

            mercadopago.configure({
                access_token: config.access_token_mp,
            })

            console.log("nombre y id", data.shipments.receiver_address.state_name, data.shipments.receiver_address.state_id)
            let preference = {
                items: productsMP,
                payer: {
                    name: data.payer.name,
                    surname: data.payer.surname,
                    email: data.payer.email,
                    phone: {
                        area_code: data.payer.phone.area_code,
                        number: parseInt(data.payer.phone.number)
                    },
                    address: {
                        street_name: data.payer.address.street_name,
                        street_number: parseInt(data.payer.address.street_number),
                        zip_code: data.payer.address.zip_code
                    }
                },
                back_urls: {
                    success: config.success_url_mp,
                    failure: config.failure_url_mp,
                },
                payment_methods: {
                    excluded_payment_types: [
                        {
                            id: "ticket"
                        }
                    ],
                    installments: 12
                },
                metadata: {
                    ...data.metadata,
                    products: productsMetaData
                },
                shipments: {
                    receiver_address: {
                        zip_code: data.shipments.receiver_address.zip_code,
                        state_name: data.shipments.receiver_address.state_name,
                        city_name: data.shipments.receiver_address.city_name,
                        street_name: data.shipments.receiver_address.street_name,
                        street_number: parseInt(data.shipments.receiver_address.street_number)
                    },
                    // cost: calcPriceWithZip(pesoTotalEnGramos, data.shipments.receiver_address.state_name),
                    cost: calcPriceWithZip(pesoTotalEnGramos, data.shipments.receiver_address.state_id),
                    mode: "not_specified"
                },
                notification_url: config.notification_url_mp,
                statement_descriptor: "Jarry Indumentaria",
                external_reference: uuidv4(),
            };

            // const response = await mercadopago.preferences.create(preference)
            // console.log("ELRESMP", response.body);
            // const body = response.body
            // return {init_point: body.init_point, costShipment: body.shipments.cost, idOrder: body.external_reference}
        } catch (error) {
            console.log("desde order service create payment MP", error);
            throw error
        }
    }

    async getNotificationMP(req) {
        // try {
        //     let objSave = {}
        //     const {query } = req;
        //     const topic = query.topic || query.type;
        //     let merchantOrder;
        //     let payment
        //     switch (topic) {
        //         case 'payment':
        //             const paymentId = query.id || query['data.id'];
        //             payment = await mercadopago.payment.findById(paymentId);
        //             merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id)

        //             break;

        //         case 'merchant_order':
        //             const orderID = query.id 
        //             merchantOrder = await mercadopago.merchant_orders.findById(orderID)
        //             let paymentId1;

        //             merchantOrder.body.payments.forEach(payment => {
        //                 if (payment.status === 'approved') {
        //                     paymentId1 = payment.id
        //                 }
        //             })

        //             payment = await mercadopago.payment.findById(paymentId1);
        //             break;
        //     }

        //     let paidAmount = 0;
        //     let paymentId;
        //     merchantOrder.body.payments.forEach(payment => {
        //         if (payment.status === 'approved') {
        //             paymentId = payment.id
        //             paidAmount += payment.transaction_amount;

        //         }
        //     })

        //     if (paidAmount >= merchantOrder.body.total_amount) {
        //         let newOrder;
        //         let alternativeText = "No se pudo obtener esta información"
        //         let fecha = new Date().toLocaleDateString()
        //         let hora = new Date().toTimeString()
        //         let hora2 = hora.slice(0, -(hora.length - 8))

        //         if (payment?.body.payment_method.type === 'credit_card') {
        //             const orderExist = await this.orderRepository.repoGetOrderById(payment.body.external_reference)
        //             if(!orderExist){
        //                 objSave.id = payment.body.external_reference
        //                 objSave.paymentId = paymentId
        //                 objSave.tipoDePago = 'Tarjeta de crédito' || alternativeText
        //                 objSave.costoEnvio = payment.body.shipping_amount || 0
        //                 objSave.totalDeCompra = (merchantOrder.body.total_amount + payment.body.shipping_amount) || 0
        //                 objSave.netoRecibido = payment.body.transaction_details.net_received_amount || 0
        //                 objSave.comisionMp = payment.body.fee_details.find(el => el.fee_payer === 'collector').amount
        //                 objSave.tipoDePago = payment.body.payment_type_id
        //                 objSave.metodoDePago = payment.body.payment_method_id
        //                 objSave.cuotas = payment.body.installments
        //                 objSave.fechaDeLiberacion = payment.body.money_release_date || alternativeText
        //                 objSave.timestamp = `${fecha} ${hora2}` || alternativeText
        //                 objSave.direccionEnvio = payment.body.additional_info.shipments
        //                 objSave.payer = {
        //                     ...payment.body.additional_info.payer,
        //                     email: payment.body.metadata.email
        //                 }
        //                 objSave.products = payment.body.metadata.products


        //                 const order = new Order(objSave)
        //                 const orderDto = order.convertToDTO()
        //                 newOrder = await this.orderRepository.repoCreateOrder(orderDto)

        //             }else{
        //                 return
        //             }
        //         } else if (payment.body.payment_method.type === 'account_money') { 
        //             const orderExist = await this.orderRepository.repoGetOrderById(payment.body.external_reference)

        //             if(!orderExist){
        //                 objSave.id = payment.body.external_reference
        //                 objSave.paymentId = paymentId
        //                 objSave.tipoDePago = 'Dinero de Mercado Pago'
        //                 objSave.costoEnvio = payment.body.shipping_amount || 0
        //                 objSave.totalDeCompra = (merchantOrder.body.total_amount + payment.body.shipping_amount) || 0
        //                 objSave.netoRecibido = payment.body.transaction_details.net_received_amount || 0
        //                 objSave.comisionMp = payment.body.fee_details.find(el => el.fee_payer === 'collector').amount
        //                 objSave.tipoDeTarjeta = "No usó tarjeta"
        //                 objSave.cuotas = payment.body.installments || 0
        //                 objSave.fechaDeLiberacion = payment.body.money_release_date || alternativeText
        //                 objSave.timestamp = `${fecha} ${hora2}` || alternativeText
        //                 objSave.direccionEnvio = payment.body.additional_info.shipments
        //                 objSave.payer = {
        //                     ...payment.body.additional_info.payer,
        //                     email: payment.body.metadata.email
        //                 }
        //                 objSave.products = payment.body.metadata.products

        //                 const order = new Order(objSave)
        //                 const orderDto = order.convertToDTO()
        //                 newOrder = await this.orderRepository.repoCreateOrder(orderDto)
        //             }
        //         }

        //         return true
        //     } else {
        //         return false
        //     }
        // } catch (error) {
        //     console.log("desde order service", error);
        //     throw error
        // }

        try {
            const query = req.query
            if (query.type === "payment") {
                const data = await mercadopago.payment.findById(query["data.id"])
                if (data.body.status === "approved") {
                    // console.log("RESPONSE BODY",data.body.additional_info.items);
                    const orderExist = await this.orderRepository.repoGetOrderById(data.body.id)
                    if (!orderExist) {
                        let fecha = new Date().toLocaleDateString()
                        let hora = new Date().toTimeString()
                        let hora2 = hora.slice(0, -(hora.length - 8))
                        const objSave = {}
                        objSave.id = data.body.external_reference
                        objSave.paymentId = data.body.id
                        // objSave.tipoDePago = data.body.payment_method.type
                        objSave.totalDeCompra = data.body.transaction_amount
                        objSave.costoEnvio = data.body.shipping_amount
                        objSave.totalConEnvio = data.body.transaction_amount + data.body.shipping_amount
                        objSave.netoRecibido = data.body.transaction_details.net_received_amount
                        objSave.comisionMp = data.body.fee_details.find(el => el.fee_payer === 'collector').amount
                        objSave.tipoDePago = data.body.payment_type_id
                        objSave.metodoDePago = data.body.payment_method_id
                        objSave.cuotas = data.body.installments
                        objSave.fechaDeLiberacion = data.body.money_release_date
                        objSave.timestamp = `${fecha} ${hora2}`
                        objSave.direccionEnvio = data.body.additional_info.shipments
                        objSave.payer = {
                            ...data.body.additional_info.payer,
                            email: data.body.metadata.email
                        }
                        console.log("PRODUCTOS COMPRADOS DESDE MP", data.body.additional_info.items);
                        objSave.products = await Promise.all(data.body.metadata.products.map(async (prod) => {
                            const product = await productService.getProductById(prod.id);
                            console.log("enccccc", prod);
                            if (product) {
                                return {
                                    ...prod,
                                    name: product.name,
                                    categories: product.categories,
                                    image: product.image,
                                    price: product.price
                                }
                            }
                        }));
                        objSave.status = 'pendiente'


                        const order = new Order(objSave)
                        const orderDto = order.convertToDTO()
                        const newOrder = await this.orderRepository.repoCreateOrder(orderDto)
                        const promises = data.body.metadata.products.map(async (element) => {
                            const findProduct = await productService.getProductById(element.id);
                            const { stock, ...rest } = findProduct
                            const newProduct = new Product({
                                stock: findProduct.stock - element.quantity,
                                ...rest
                            })
                            // console.log("ESQQQ", newProduct.convertToDTO());
                            const updatedProduct = await productService.updateProductById(findProduct.id, newProduct.convertToDTO())
                        });

                        const products = await Promise.all(promises);
                    }
                }

            }

        } catch (error) {
            console.log("error en webhook");
            console.log(error);
        }
    }

    async getOrders() {
        try {
            const orders = await this.orderRepository.repoGetOrders()
            return orders
        } catch (error) {
            console.log("desde order service", error);
            throw error
        }
    }

    async getStatusOrderById(id){
        try {
            const order = await this.orderRepository.repoGetOrderById(id)
            if(!order) throw {msg: "No se encontro una orden con ese ID", status: 400}
            return order.status
        } catch (error) {
            console.log("desde order service", error);
            throw error
        }
    }
}

export {
    OrderService
}