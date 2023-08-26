import OrderItemModel from "./order-item.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Product from "../../../../domain/product/entity/product";
import Repository from "../../../../domain/@shared/repository/repo-interface";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";

export default class OrderRepository implements Repository<Order> {
    async create(entity: Order): Promise<void> {
       await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              product_id: item.productId,
              quantity: item.quantity,
          })),
       },
       {
          include: [{model: OrderItemModel}]
       }
      );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        }, { where: { id: entity.id } });
    }

    async find(id: string): Promise<Order> {
        let orderModel;

        try {
            orderModel = await OrderModel.findOne({ where: { id: id }, rejectOnEmpty: true });
        } catch (error) {
            throw new Error(`Order not found`);
        }

        const product = new Product("123", "Product 1", 100);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );
        const order = new Order(orderModel.id, orderModel.customer_id, [orderItem]);
        
        return order;
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll();

        const orders: Order[] = await Promise.all(orderModels.map(async orderModel => {
            const orderItems = await orderModel.$get('items') as OrderItemModel[];
            const orderItemsData = orderItems.map(item => new OrderItem(
                item.id,
                item.name,
                item.price,
                "1",
                item.quantity
            ));

            const order = new Order(
                orderModel.id,
                orderModel.customer_id,
                orderItemsData
            );

            return order;
        }));

        return orders;
    }
}