const { Order } = require('../../models')

const DBService = require('../../services/DBService')

const OrderService = new DBService(Order)

const createOrder = async (_, args, context) =>
    await OrderService.createInstance(args, context)

const updateOrder = async (_, args, context) =>
    await OrderService.updateInstance(args, context)

const deactivateOrder = async (_, args, context) =>
    await OrderService.deactivateInstance(args, context)

module.exports = {
    createOrder,
    updateOrder,
    deactivateOrder
}
