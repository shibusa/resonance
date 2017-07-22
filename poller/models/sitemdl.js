var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new mongoose.Schema(
    {
        location: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        ip: {
            type: String,
            unique: true,
            required: true
        },
        lat: {
            type: Number
        },
        lng: {
            type: Number
        },
        status: {
            type: String
        },
        interval: {
            type: Number,
            required: true
        }
    },
    {timestamps: true}
)
mongoose.model('Site', SiteSchema);
