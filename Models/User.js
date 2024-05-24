const mongoose = require('mongoose');
const moment = require('moment');
const OtpSchema = mongoose.Schema({
    magnitude: {
        type: String,
        required: true,
        index: true
    },
    created: {
        type: Date,
        default: function () {
            return moment().utc();
        }
    },
    type: {
        type: String,
        enum: ['registration', 'password_reset', 'login']
    }
}, {
    _id: false,
    versionKey: false
});
const userSchema = mongoose.Schema({
    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "society"
    },
    flatNo: {
        type: String,
    },
    carNo: {
        type: String,
    },
    carModel: {
        type: String,
    },
    parkingNo: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    location: {
        type: String
    },
    vechicle: {
        type: String,
    },
    phone_number: {
        type: Number,
    },
    mobile: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[+]?[0-9]{10,13}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    orderAcceptance: {
        type: Boolean,
        default: false
    },
    country_code: {
        type: String,
        default: "+91",
    },
    order: {
        type: String
    },
    signup_process_complete: {
        type: Boolean,
        default: false
    },
    otp: {
        type: OtpSchema,
        select: false,
    },
    otpSecret: {
        type: String,
        require: true
    },
    profile: {
        type: String,
        required: null
    },
    start: {
        Shours: {
            type: String,
        },
        Smin: {
            type: String
        },
        SSec: {
            type: String
        }
    },
    endtime: {
        Ehours: {
            type: String
        },
        Emin: {
            type: String
        },
        Esec: {
            type: String
        }
    },
    refferalCode: { type: String, },
    refferalCodeUsed: { type: Boolean, default: false, },
    refferUserId: { type: mongoose.Types.ObjectId, ref: "user" },
    joinUser: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    servies: [],
    location: {
        address: {
            type: String
        },
        long: {
            type: Number,
            default: 0,
        },
        late: {
            type: Number,
            default: 0
        },
        Radius: {
            type: Number,
            default: 0
        }
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg"
    },
    userType: {
        type: String,
        enum: ['user', 'admin', 'seller', 'insteller']
    }
}, { timestamps: true, toJSON: { versionKey: false }, toObject: { versionKey: false }, })

module.exports = mongoose.model('user', userSchema)
