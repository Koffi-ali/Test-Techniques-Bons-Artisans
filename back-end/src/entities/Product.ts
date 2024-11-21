import mongoose, {Schema, model} from 'mongoose';
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
      if (!doc.isNew) return next(); // Si ce n'est pas un nouveau document, on passe
  
      const counter = await Counter.findOneAndUpdate(
        { id: 'products' }, // Identifier la collection
        { $inc: { seq: 1 } }, // Incrémenter le compteur
        { new: true, upsert: true } // Créer le compteur s'il n'existe pas encore
      ).lean();
  
      doc._id = counter.seq; // Assigner le nouveau _id incrémenté
      next();
    } catch (error) {
      next();
    }
  });
// const AutoIncrement = mongooseSequence(mongoose);
// ProductSchema.plugin(mongooseSequence(mongoose), { inc_field: '_id' }); 
const Product = model<IProduct>('Product', ProductSchema)

export default Product