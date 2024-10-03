import { Schema } from "mongoose";

const colorsSchema = new Schema({
    primaryColorStore: {
        type: String,
        required: [true, "required: primaryColorStore : mongoose squema"]
    },
    secondaryColorStore: {
        type: String,
        required: [true, "required: secondaryColorStore : mongoose squema"]
    },
    tertiaryColorStore: {
        type: String,
        required: [true, "required: tertiaryColorStore : mongoose squema"]
    },
})

const footerConfigSquema = new Schema({
    colors: {
        primaryColorFooter: {
            type: String,
            required: [true, "required: primaryColorFooter-colors-footerConfigSquema : mongoose squema"],
            default: '#000000'
        }
    },
    social: {
        instagram: {
            type: String,
            required: [true, "required: instagram-social-footerConfigSquema: mongoose squema"],
            default: 'undefined'
        },
        facebook: {
            type: String,
            required: [true, "required: facebook-social-footerConfigSquema: mongoose squema"],
            default: 'undefined'
        },
        gmail: {
            type: String,
            required: [true, "required: gmail-social-footerConfigSquema: mongoose squema"],
            default: 'undefined'
        },
        whatsapp: {
            type: String,
            required: [true, "required: whatsapp-social-footerConfigSquema: mongoose squema"],
            default: 'undefined'
        },
        storeAddress: {
          type: String,
          required: [true, "required: storeAddress-social-footerConfigSquema: mongoose squema"],
          default: 'undefined'
        }
    }
})

const storeConfigurationSchema = new Schema({
    id: {
        type: String,
        required: [true, "required: id product: mongoose squema"]
    },
    storeConfigName: {
        type: String, 
        required: [true, "required: storeConfigName : mongoose squema"]
    },
    colors: {
        type: colorsSchema, 
        required: [true, "required: colors : mongoose squema"],
        _id: false,
    },
    footerConfig: {
        type: footerConfigSquema,
        required: [true, "required: footerConfig : mongoose squema"],
        _id: false
    }
})

export {
    storeConfigurationSchema
}