import { omitUndefined } from 'mongoose'
import Product from '../../entities/Product'

interface IProduct {
    _id? : number,
    name: string,
    type : string,
    price: number,
    rating: number,
    warranty_years: number
}
export class ProductDao {
    // fetch all products
    public static async getProducts(params: {limit :number}) {
        const products = await Product.find({}).limit(params.limit).exec()
        return products
    }

    // add new product

    public static async create(product : IProduct) {
        const ExistingProduct = await Product.findOne({'name' : product.name, 'type' : product.type}).exec()
        if(ExistingProduct) {
            throw new Error('ProductAlreadyExists')
        }
        return await (new Product({... product, available: true})).save()
    }
    
    // update product
    public static async update(id :number, newProduct : IProduct) {
        const existingProduct = await Product.findOne({name : newProduct.name, type: newProduct.type}).exec()
        if(existingProduct)  throw new Error('ProductAlreadyExists')
        return await Product.updateOne({_id : id}, newProduct).exec()
    }

    // delete product
    public static async delete(id :number) {
        return await Product.deleteOne({_id : id}).exec()
    } 

    // restore or withdraw product
    public static async restoreOrWithDraw(id : number) {
        const existingProduct = await Product.findById(id).exec()
        const available = !!existingProduct?.available || false
        return await Product.updateOne({_id : id}, {'available' : !available}).exec()
    }
}