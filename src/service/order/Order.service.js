import config from '../../../config.js';
import mercadopago from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../../model/order/model/Order.model.js'
import { productServiceFactory } from '../product/product.factory.js';
import { calcPriceWithZip } from '../../utils/calculateCost/envios.js';
import fs from 'fs'
import { Product } from '../../model/product/model/Product.model.js';
import { shipmentLocalServiceFactory } from '../shipmentLocal/shipmentLocal.factory.js';

class OrderService {
    constructor(repository) {
        this.orderRepository = repository
    }

    async createPaymentMP(data) {
        try {
            const productsMP = await Promise.all(data.products.map(async (product) => {
                const findPorduct = await productService.getProductById(product.id)
                if (!findPorduct) { throw { msg: "No se encontro ese productoooooo" } }
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

            const productsMetaData = await Promise.all(data.products.map(async (product) => {
                const findProduct = await productService.getProductById(product.id)
                if (!findProduct) { throw { msg: "No se encontro ese producto" } }
                return {
                    id: findProduct.id,
                    size: product.size,
                    color: product.color,
                    quantity: product.quantity
                }
            }))

            let pesoTotalEnGramos = 0;
            const pesoProductos = await Promise.all(data.products.map(async (product) => {
                const findProduct = await productService.getProductById(product.id)
                if (!findProduct) { throw { msg: "No se encontro ese producto" } }
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
            return { init_point: body.init_point, costShipment: body.shipments.cost, idOrder: body.external_reference }
        } catch (error) {
            console.log("desde order service create payment MP", error);
            throw error
        }
    }

    async createPaymentMpStore(req, dbname) {

        const data = req.body
        // console.log("data desde createPaymentMpStore", data);
        try {
            if (data.shipment.shipmentType == "shipment_local") {
                console.log("shipment_local", data);

                // VERIFY SHIPMENT LOCAL
                const shipmentLocalService = await shipmentLocalServiceFactory(dbname)
                const findShipmentLocal = await shipmentLocalService.getShipmentLocalById(data.shipment.shipmentLocalId)
                console.log("findShipmentLocal", findShipmentLocal);

                // VERIFY PRODUCTS AND STOCK
                let productsMetadata = []
                const verifyProducts = await Promise.all(data.products.map(async prod => {
                    const productsService = await productServiceFactory(dbname)
                    const findProduct = await productsService.getProductById(prod.id)
                    productsMetadata.push({
                        // DATA PRODUCT
                        id: findProduct.id,
                        name: findProduct.name,
                        price: findProduct.price,
                        image: findProduct.image,
                        timestamp: findProduct.timestamp,
                        quantity: prod.quantity,

                        // SIZE SELECTED
                        selectedSizeId: prod.selectedSizeId,
                        selectedSizeName: prod.selectedSizeName,

                        // COLOR SELECTED
                        selectedColorId: prod.selectedColorId,
                        selectedColorName: prod.selectedColorName
                    })
                    return {
                        id: findProduct.id,
                        title: findProduct.name,
                        quantity: prod.quantity,
                        unit_price: findProduct.price,
                        currency_id: 'ARS',
                        picture_url: findProduct.image
                    }
                }))
                console.log("verifyProducts", verifyProducts);

                // INFO CLIENT
                const clientInfoContact = {
                    name: data.payer.name,
                    surname: data.payer.surname,
                    email: data.payer.email,
                    phone: {
                        areaCode: data.payer.areaCode,
                        number: parseInt(data.payer.numberPhone)
                    }
                }

                // SHIPMENT INFO METADATA
                // const shipmentInfoMetadata = {
                //     zip_code: findShipmentLocal.postalCode,
                //     state_name: findShipmentLocal.province,
                //     city_name: findShipmentLocal.locality,
                //     street_name: findShipmentLocal.streetName,
                //     street_number: parseInt(findShipmentLocal.streetNumber),
                // }

                // NUMBER BLOCK 1

                mercadopago.configure({
                    access_token: config.access_token_mp,
                })

                // console.log("nombre y id", data.shipments.receiver_address.state_name, data.shipments.receiver_address.state_id)
                let preference = {
                    items: verifyProducts,
                    payer: {
                        name: data.payer.name,
                        surname: data.payer.surname,
                        email: data.payer.email,
                        phone: {
                            area_code: data.payer.areaCode,
                            number: parseInt(data.payer.numberPhone)
                        },
                        address: {
                            // street_name: data.payer.address.street_name,
                            // street_number: parseInt(data.payer.address.street_number),
                            // zip_code: data.payer.address.zip_code
                            street_name: findShipmentLocal.streetName,
                            street_number: parseInt(findShipmentLocal.streetNumber),
                            zip_code: findShipmentLocal.postalCode
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
                        proyect_name: req.clientInfo.proyectName,
                        products: productsMetadata,
                        client_info_contact: clientInfoContact,
                        shipment_info: findShipmentLocal
                    },
                    shipments: {
                        receiver_address: {
                            zip_code: findShipmentLocal.postalCode,
                            state_name: findShipmentLocal.province,
                            city_name: findShipmentLocal.locality,
                            street_name: findShipmentLocal.streetName,
                            street_number: parseInt(findShipmentLocal.streetNumber),
                        },
                        // cost: calcPriceWithZip(pesoTotalEnGramos, data.shipments.receiver_address.state_id),
                        cost: findShipmentLocal.shipmentCost,
                        mode: "not_specified"
                    },
                    notification_url: config.notification_url_mp,
                    statement_descriptor: req.clientInfo.subdomain,
                    external_reference: uuidv4(),
                };
                // _______________________

                try {
                    const response = await mercadopago.preferences.create(preference)

                    console.log("____________________________________________________");
                    // console.log("respuesta de mercadopago.preferences.create(preference)", response.body);
                    console.log("____________________________________________________");
                    console.log("SHIPMENTS", response.body.shipments);
                    console.log("____________________________________________________");
                    console.log("PAYER", response.body.payer);

                    const body = response.body
                    const { zip_code, street_name, street_number, city_name, state_name, ...rest } = response.body.shipments.receiver_address
                    return {
                        init_point: body.init_point,
                        shipments: {
                            cost: body.shipments.cost,
                            zip_code,
                            street_name,
                            street_number,
                            city_name,
                            state_name
                        },
                        payer: {
                            name: response.body.payer.name,
                            surname: response.body.payer.surname,
                            email: response.body.payer.email,
                            area_code: response.body.payer.phone.area_code,
                            number_phone: response.body.payer.phone.number
                        },
                        externalReference: body.external_reference
                    }
                } catch (error) {
                    console.log("errrrrrr", error);


                    // console.log("error desde seg try catch ", error);
                    // console.log("get OWN ", Object.getOwnPropertyNames(error)); // Lista las propiedades del objeto de error
                    // console.log("ERR NAME ", error.name);
                    // console.log("ERR MESSA ", error.message);
                    // console.log("ERR CAUSE ", error.cause);
                    // console.log("ERR STATUS ", error.status);
                    // console.log("ERR IDEMPOTENCY ", error.idempotency);
                    // console.log("ERR STACK ", error.stack);
                    if (error.status == 400) {
                        throw { msg: "Error al crear la orden de pago", status: 400 }
                    }
                }

            }
            // const productsMP = await Promise.all(data.products.map(async (product) => {
            //     const findPorduct = await productService.getProductById(product.id)
            //     if (!findPorduct) { throw { msg: "No se encontro ese productoooooo" } }
            //     return {
            //         id: findPorduct.id,
            //         title: findPorduct.name,
            //         category_id: findPorduct.categories[0].categoria.name,
            //         description: findPorduct.description,
            //         quantity: product.quantity,
            //         unit_price: findPorduct.price,
            //         currency_id: 'ARS',
            //         // picture_url: findPorduct.image
            //     }
            // }))

            // console.log(productsMP);

            // _____________________________________________________________________________

            // const productsMetaData = await Promise.all(data.products.map(async (product) => {
            //     const findProduct = await productService.getProductById(product.id)
            //     if (!findProduct) { throw { msg: "No se encontro ese producto" } }
            //     return {
            //         id: findProduct.id,
            //         size: product.size,
            //         color: product.color,
            //         quantity: product.quantity
            //     }
            // }))

            // _____________________________________________________________________________

            // let pesoTotalEnGramos = 0;
            // const pesoProductos = await Promise.all(data.products.map(async (product) => {
            //     const findProduct = await productService.getProductById(product.id)
            //     if (!findProduct) { throw { msg: "No se encontro ese producto" } }
            //     pesoTotalEnGramos = pesoTotalEnGramos + (findProduct.pesoGramos * product.quantity)
            // }))
            // console.log("Peso total", pesoTotalEnGramos);

            // _____________________________________________________________________________

            // NUMBER BLOCK 1

        } catch (error) {
            console.log("desde order service create payment MP", error);
            throw error
        }
    }

    async getNotificationMpStore(req) {
        try {
            // console.log("req desde : getNotificationMpStore ", req);
            // const { query } = req
            // const topic = query.topic || query.type;

            const query = req.query

            let payment;
            // if (topic == "payment") {
            //     console.log("query: ", query);
            //     console.log("topic payment: ", topic);
            //     const paymentId = query.id || query["data.id"]
            //     payment = await mercadopago.payment.findById(paymentId)
            //     return true
            // } else if (topic == "merchant_order") {
            //     console.log("query: ", query);
            //     console.log("topic merchant_order: ", topic);
            //     return true
            // }

            if (query.type == "payment") {
                console.log("queryyyy ", query);
                const paymentId = query["data.id"]
                console.log("paymentId", paymentId);
                
                payment = await mercadopago.payment.findById(paymentId)
                // console.log("payment encontrado: ", payment);
                if (payment.body.status == "approved") {
                    console.log("aproved ");
                    // console.log("products metadata: ", payment.body.metadata);
                    console.log("payment.body: ", payment.body);

                    let fechaArgentina = new Date().toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
                    let horaArgentina = new Date().toLocaleTimeString('es-AR', {
                        timeZone: 'America/Argentina/Buenos_Aires',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'  // Para incluir segundos si lo deseas
                    });
                    const order = {
                        id: payment.body.external_reference,
                        payment_id: paymentId,
                        shipment_cost: payment.body.shipping_amount,
                        total_paid_amount: payment.body.transaction_details.total_paid_amount,
                        net_received_amount: payment.body.transaction_details.net_received_amount,
                        payment_type: payment.body.payment_method.type,
                        installments: payment.body.installments,
                        money_release_date: payment.body.money_release_date,
                        timestamp: `${fechaArgentina} ${horaArgentina}`,
                        order_status: 'pendiente',

                        products: payment.body.metadata.products,
                        client_info_contact: payment.body.metadata.client_info_contact,
                        shipment_info: payment.body.metadata.shipment_info,
                    }

                    const orderDto = new Order(order)
                    const createdOrder = await this.orderRepository.repoCreateOrder(orderDto.convertToDTO())
                    
                    console.log("CREATED ORDERRRR",createdOrder);
                    

                    console.log("orderrrr", order);
                    console.log("payment.body.fee_details", payment.body.fee_details);
                    console.log("payment.body.payment_method.type", payment.body.payment_method.type);
                    console.log("payment.body.payment_method_id", payment.body.payment_method_id);
                    console.log("payment.body.additional_info.payer", payment.body.additional_info.payer);
                    console.log("payment.body.additional_info.payer.address", payment.body.additional_info.payer.address);
                    console.log("payment.body.additional_info.payer.phone", payment.body.additional_info.payer.phone);
                    console.log("payment.body.metadata", payment.body.metadata);
                    console.log("-----------------------------------------------------------",);

                    return true


                }else{
                    return false
                }
                
            }else{
                return false
            }
            
        } catch (error) {
            console.log("desde order : getNotificationMpStore", error);
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

    async getStatusOrderById(id) {
        try {
            const order = await this.orderRepository.repoGetOrderById(id)
            if (!order) throw { msg: "No se encontro una orden con ese ID", status: 400 }
            return order.status
        } catch (error) {
            console.log("desde order service", error);
            throw error
        }
    }

    async deleteOrderById(id) {
        try {
            const orderNoDto = await this.orderRepository.repoGetOrderById(id)
            if(!orderNoDto) throw {msg: "No se encontro una orden con ese ID", status: 404}

            const deletedOrder = await this.orderRepository.repoDeleteOrderById(id)
            return deletedOrder
        } catch (error) {
            console.log("desde order service", error);
            throw error
        }
    }
}

export {
    OrderService
}