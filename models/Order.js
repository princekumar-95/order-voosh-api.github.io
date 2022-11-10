const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user_id:{
        type:Number,
        required:true
    },
      sub_total :{
        type:Number,
        required:true,
    }, 
    phone_number :{
        type:Number,
        unique:true
    },
},{timestamp: true}
)
module.exports = mongoose.model('Order', OrderSchema);