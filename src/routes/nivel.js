const express = require("express");
const userSchema = require("../models/empresas");
const router = express.Router();
const { Nivel, Empresa } = require('../models/empresas')

//crear nivel
router.post('/nivel', async (req, res) => {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { nivel, empresa, imagen } = req.body;

        // Verificar si se proporcionó el nombre de la empresa
        if (!empresa) {
            return res.status(400).json({ message: 'Se requiere el nombre de la empresa en el cuerpo de la solicitud.' });
        }

        // Buscar la empresa por nombre para obtener su _id
        const empresaEncontrada = await Empresa.findOne({ nombre: empresa });

        // Verificar si la empresa existe
        if (!empresaEncontrada) {
            return res.status(404).json({ message: 'No se encontró la empresa con el nombre proporcionado.' });
        }

        // Crear un nuevo nivel con el _id de la empresa y la imagen
        const nuevoNivel = new Nivel({
            nivel: nivel,
            empresa: empresaEncontrada._id,
            imagen: imagen
        });

        // Guardar el nuevo nivel en la base de datos
        const nivelGuardado = await nuevoNivel.save();

        res.json(nivelGuardado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





//obtener nivel 
router.get('/nivel', async (req, res) => {
    try {
        // Obtener el _id de la empresa desde los parámetros de consulta
        const empresaId = req.query.empresaId;

        // Verificar si se proporcionó un ID de empresa en los parámetros de consulta
        if (empresaId) {
            // Verificar si la empresa existe
            const empresaExistente = await Empresa.findById(empresaId);
            if (!empresaExistente) {
                return res.status(404).json({ message: 'No se encontró la empresa con el ID proporcionado.' });
            }

            // Filtrar niveles por el ID de la empresa
            const niveles = await Nivel.find({ empresa: empresaId }).populate('empresa', ['_id', 'nombre']);
            return res.json(niveles);
        }

        // Si no se proporciona un empresaId, obtener todos los niveles
        const niveles = await Nivel.find().populate('empresa', ['_id', 'nombre']);
        res.json(niveles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});






//obtener 1 nivel 
router.get('/nivel/:id',async (req, res) => {
    const { id } = req.params;
    Nivel
        .findById(id)
        .populate('empresa', ['_id', 'nombre'])
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

  
  
//actualizar 
router.put('/nivel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nivel, empresa, imagen } = req.body;

        // Verificar si se proporciona el nombre de la empresa
        if (empresa) {
            // Buscar la empresa por nombre para obtener su _id
            const empresaEncontrada = await Empresa.findOne({ nombre: empresa });

            // Verificar si la empresa existe
            if (!empresaEncontrada) {
                return res.status(404).json({ message: 'No se encontró la empresa con el nombre proporcionado.' });
            }

            // Objeto con los campos a actualizar
            const updateFields = {
                nivel: nivel,
                empresa: empresaEncontrada._id,
                imagen: imagen // Agregar la actualización de la imagen
            };

            // Actualizar el nivel con el nuevo nombre, empresa e imagen
            const nivelActualizado = await Nivel.findByIdAndUpdate(id, updateFields, { new: true });

            return res.json(nivelActualizado);
        }

        // Si no se proporciona el nombre de la empresa, solo actualizar el nombre del nivel y la imagen
        const nivelActualizado = await Nivel.findByIdAndUpdate(id, { nivel: nivel, imagen: imagen }, { new: true });

        res.json(nivelActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//eliminar
router.delete('/nivel/:id',async (req, res) => {
    const { id } = req.params;
    Nivel
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

module.exports = router