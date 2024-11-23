
import { connect, disconnect} from 'mongoose'
import Product from './src/entities/Product'
const products = [
    { "name" : "AC1 Phone1", "type" : "phone", "price" : 200.05, "rating" : 3.8,"warranty_years" : 1, "available" : true },
    { "name" : "AC2 Phone2", "type" : "phone", "price" : 147.21, "rating" : 1,"warranty_years" : 3, "available" : false },
    { "name" : "AC3 Phone3", "type" : "phone", "price" : 150, "rating" : 2,"warranty_years" : 1, "available" : true },
    { "name" : "AC4 Phone4", "type" : "phone", "price" : 50.20, "rating" : 3,"warranty_years" : 2, "available" : true }
  ]
 async function seedProducts() {
 
      const count = await Product.countDocuments();
      console.log(' doc :', count)
      if (count > 0) {
          console.log('Products already seeded. Skipping...');
      } else {
          // Insérer les produits
          for( const product of products) {
             await (new Product(product)).save()
          }
          console.log('Products seeded successfully');
      }
   
}

export default seedProducts;