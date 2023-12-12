const express = require("express");
const router = express.Router();
const { Empresa, Nivel } = require('../models/empresas');
const { subirImagen } = require("../models/Storage");
//crear empresa
router.post('/empresa',subirImagen.single('imagen'), async (req,res) =>{
    const { nombre, email,telefono, imagen } = req.body;
    const imagenUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const empresa = Empresa({ nombre, email, telefono, imagen: imagenUrl });
    empresa
    .save()
    .then((data) => res.json(data))
    .catch((error)=>res.json({message:error}));
});

//obtener empresas 
router.get('/empresa',async (req,res) =>{
    Empresa
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
    
});
//obtener 1 empresa 
router.get('/empresa/:id', async (req,res) =>{
    const { id } = req.params;
    Empresa
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
    
});
//actualizar }
router.put('/empresa/:id', subirImagen.single('imagen'), async (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    const imagenUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;

    Empresa.updateOne(
        { _id: id },
        { $set: { nombre, email, telefono, imagen: imagenUrl } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//eliminar
router.delete('/empresa/:id',async (req,res) =>{
    const { id } = req.params;
    Empresa
    .deleteOne({_id:id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
    
});

module.exports = router