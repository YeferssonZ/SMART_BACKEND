const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Admin } = require('../models/empresas')

const jwt = require('jsonwebtoken')
//crear parking

router.post('/registerAdmin', (req, res) => {
    const user = Admin(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.post('/loginAdmin', async (req, res) => {
    try {
      const users = await Admin.findOne({ username: req.body.username });
  
      if (!users) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }
  
      const eq = bcrypt.compareSync(req.body.password, users.password);
  
      if (!eq) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
  
      res.json({ success: 'Login correcto', token: createToken(users) });
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
//obtener parking 
router.get('/Admin', (req, res) => {
    Admin
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});




function createToken(user) {
    const payload = {
        user_id: user._id,
        user_empresa: user.empresa
    }
    console.log(payload.user_id)
    console.log(payload.user_empresa)
    return jwt.sign(payload, 'en un lugar de la mancha ')
}

module.exports = router