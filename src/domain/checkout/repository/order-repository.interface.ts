import { Order } from "sequelize";
import Repository from "../../@shared/repository/repo-interface";

export default interface OrderRepositoryInterface extends Repository<Order> {}