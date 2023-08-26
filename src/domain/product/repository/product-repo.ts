import Product from "../entity/product";
import Repository from "../../@shared/repository/repo-interface";

export default interface ProductRepo extends Repository<Product> {
    
}