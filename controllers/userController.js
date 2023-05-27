import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import { emailRegister, emailForgetPassword } from "../helpers/email.js"

const register = async(req, res) => {
    // Evitar registros duplicados
    const { email } = req.body;

    const userExist = await User.findOne({ email });

    if(userExist){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        await user.save();
        console.log(user.name)
        emailRegister({
            email: user.email,
            name: user.name,
            token: user.token
        });
        res.json({msg: "Usuario creado correctamente, revisa tu email para confirmar tu cuenta."});    
    } catch (error) {
        console.log(error);
    }
};

const authenticate = async(req, res) => {
    const { email, password} = req.body;

    // Comprar si el usuario existe
    const user = await User.findOne({ email });
    if(!user){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    // Comprobar si el usuario esta confirmado
    if(!user.confirmed){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(404).json({msg: error.message});
    }

    // Comprobar su password
    if(await user.verifyPassword(password)){
        res.json({
            _id: user._id,
            nombre: user.name,
            email: user.email,
            token: generateJWT(user._id),
        })
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(404).json({msg: error.message});
    }
};

const confirm = async(req, res) => {
    const { token } = req.params;
    const userConfirm = await User.findOne({token});

    if(!userConfirm){
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message});
    }

    try {
        userConfirm.confirmed = true;
        userConfirm.token = '';
        await userConfirm.save();
        res.json({ msg: "Usuario confirmado correctamente" })
    } catch (error) {
        console.log(error.message);
    }
};

const resetPassword = async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    try {
        user.token = generateId();
        await user.save();
        emailForgetPassword({
            email: user.email,
            name: user.name,
            token: user.token
        });
        res.json({ msg: "Hemos enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error.message);
    }
};

const verifyToken = async(req, res) => {
    const { token } = req.params;
    const validToken = await User.findOne({ token });

    if(validToken){
        res.json({ msg: 'Token válido y el usuario existe'});
    }else{
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message});
    }
};

const newPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token });
    if(user){
        user.password = password;
        user.token = '';
        try {            
            await user.save();
            res.json({ msg: 'Password modificado correctamente' })
        } catch (error) {
            console.log(error.message);
        }
    }else{
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message});
    }
};

const profile = async(req, res) => {
    const { user } = req;

    res.json(user);
};

export{
    register,
    authenticate,
    confirm,
    resetPassword,
    verifyToken,
    newPassword,
    profile
};