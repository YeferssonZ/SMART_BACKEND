const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const adminSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required: true
        },
    }
)

adminSchema.pre('save', async function (next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

adminSchema.post('save', async function (next){
    try{
        console.log("Called after saving a user")
    }catch(error){
        next(error)
    }
})



//TABLA EMPRESAS
const userSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telefono: {
            type: Number,
            required: true
        },
        imagen: {
            type: String,
            required : true
        }
    }

);

//TABLA LOGIN DE EMPRESAS
const loginSchema = mongoose.Schema(
    {
        usuario:{
            type:String,
            required: true
        },
        empresa:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required: true
        },
        
    }
)

loginSchema.pre('save', async function (next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

loginSchema.post('save', async function (next){
    try{
        console.log("Called after saving a user")
    }catch(error){
        next(error)
    }
})



//TABLA NIVELES DE ESTACIONAMIENTO
const nivelSchema = mongoose.Schema(
    {
        nivel:{
            type: String,
            required:true
        },
        imagen:{
            type: String,
            require:true

        },
        empresa:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Empresa'
        }

    }
);

//TABLA ESPACIOS DE ESTACIONAMIENTO
const parkingSchema = mongoose.Schema(
    {
        lugar:{
            type:String,
        },
        nivel:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Nivel'
        },
        estado:{
            type:Boolean,
        }
    }
)

const Admin = mongoose.model('Admin', adminSchema);
const Empresa = mongoose.model('Empresa',userSchema);
const Nivel = mongoose.model('Nivel',nivelSchema);
const Parking = mongoose.model('Parking', parkingSchema); 
const Users = mongoose.model('User', loginSchema);
module.exports = {Empresa,Nivel, Parking, Users, Admin};
