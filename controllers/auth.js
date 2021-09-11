const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req,res=response)=>{

    const {name,email,password } = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if( usuario ){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario ya existe con este correo'
            })
        }
        usuario = new Usuario(req.body);
        //Encrytar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        await usuario.save();
        
        //Generar JWT
        const token = await generarJWT(usuario.id,usuario.name);

    
        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        })
    }
}

const loginUsuario = async(req,res=response)=>{
    const { email,password } = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        if( !usuario ){
            return res.status(400).json({
                ok:false,
                msg:'Usuarioy/o contraseña incorrectos'
            })
        }

        // confirm passwors
        const validPassword = bcrypt.compareSync(password,usuario.password);
        if( !validPassword){
            return res.status(400).json({
                ok:false,
                msg:'password invalido'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id,usuario.name);

        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        })
    }

    
}

const revalidarToken = async(req,res=response)=>{
    const {uid,name } = req;
    
    //genera un nuevo token
    const token = await generarJWT(uid,name);
    res.json({
        ok:true,
        token,
        uid,
        name
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}