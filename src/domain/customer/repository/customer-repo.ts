import Product from "../../product/entity/product";
import Repository from "../../@shared/repository/repo-interface";

export default interface CustomerRepo extends Repository<Product> {
    
}