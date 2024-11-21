"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var counterSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true }, // Collection à incrémenter
    seq: { type: Number, default: 0 }, // Dernière valeur utilisée
});
var Counter = (0, mongoose_1.model)('Counter', counterSchema);
exports.default = Counter;
