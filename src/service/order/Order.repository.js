class OrderRepository{
    constructor(dao){
        this.dao = dao
    }

    async repoGetOrders(){
        try {
            const orders = await this.dao.getOrders()
            return orders
        } catch (error) {
            console.log("desde order repository", error);
            throw error
        }
    }

    async repoCreateOrder(orderDto){
        try {
            const createdOrderNoDto = await this.dao.createOrder(orderDto)
            return createdOrderNoDto
        } catch (error) {
            console.log("desde order repository", error);
            throw error
        }
    }

    async repoGetOrderById(orderId){
        try {
            const order = await this.dao.getOrderById(orderId)
            return order
        } catch (error) {
            console.log("desde order repository", error);
            throw error
        }
    }

    async repoDeleteOrderById(id){
        try {
            const deletedOrder = await this.dao.deleteOrderById(id)
            return deletedOrder
        } catch (error) {
            console.log("desde order repository", error);
            throw error
        }
    }

    async repoPutOrderStatusById(id, newOrder){
        try {
            const updatedOrder = await this.dao.putOrderStatusById(id, newOrder)
            return updatedOrder
        } catch (error) {
            console.log("desde order repository", error);
            throw error
        }
    }

    async repoGetOrderStatusById(orderId){
        try {
            const orderStatusById = await this.dao.getOrderStatusById(orderId)
            return orderStatusById
        } catch (error) {
            console.log("desde order repository", error);
            throw error
        }
    }
}

export {
    OrderRepository
}