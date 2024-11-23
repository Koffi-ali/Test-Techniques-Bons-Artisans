import {Schema, model} from 'mongoose';
import Counter from './Counter'

interface IProduct {
    _id : number,
    name: string,
    type : string,
    price: number,
    rating: number,
    warranty_years: number,
    available: boolean
}

const ProductSchema = new Schema({
   _id : {type: Number} ,
   name : {type: String, required: true} ,
   type : {type: String, required: true} ,
   price: {type: Number, required: true} ,
   rating : {type: Number, required: true} ,
   warranty_years : {type: Number, required: true} ,
   available : {type: Boolean, required: true}
})
    ProductSchema.pre('save', async function (next) {
    const doc = this;
    try {
      if (!doc.isNew) return next(); 
  
      const counter = await Counter.findOneAndUpdate(
        { id: 'products' }, 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true } 
      ).lean();
  
      doc._id = counter.seq; 
      next();
    } catch (error) {
      next();
    }
  });

const Product = model<IProduct>('Product', ProductSchema)

export default Product