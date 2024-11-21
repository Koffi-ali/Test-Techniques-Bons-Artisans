import {Schema, model} from 'mongoose'

const counterSchema = new Schema({
  id: { type: String, required: true, unique: true }, // Collection à incrémenter
  seq: { type: Number, default: 0 }, // Dernière valeur utilisée
});

const Counter = model('Counter', counterSchema);

export default Counter;