/**
 * Created by michael on 17.11.15.
 */
var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    equipped: Boolean,
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    }
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = {
    Item: Item
}