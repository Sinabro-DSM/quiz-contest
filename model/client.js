const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
    Client_name: String,
    Code: Number,
});

Client.statics.create = (Client_name,Code)=>{
    const client = new this({
        Client_name,
        Code,
    });
    return client.save();
}

Client.statics.findName=(Client_name)=>{
    return this.findOne({
        Client_name
    }).exec();
}

module.exports = mongoose.model('Client',Client)