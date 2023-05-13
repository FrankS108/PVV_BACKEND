import Enterprise from "../models/Enterprise.js";
import Store from "../models/Store.js";
import User from "../models/User.js";

const getAllEnterprises = async(req, res) => {
    const allEnterprises = await Enterprise.find().where('creator').equals(req.user);
    return res.json(allEnterprises);
}

const getEnterprise = async(req, res) => {
    const enterprise = await Enterprise.findById(req.params.id).populate("collaborators");
    const stores = await Store.find().where('enterprise').equals(req.params.id);

    return res.json({
        enterprise,
        stores
    });
}

const addEnterprise = async(req, res) => {
    const { name } = req.body;
    const enterpriseExist = await Enterprise.findOne({name: name});

    if(enterpriseExist){
        const error = new Error('El nombre ya esta en uso');
        return res.status(400).json({msg: error.message});
    }

    try{
        const enterprise = new Enterprise(req.body);
        enterprise.creator = req.user._id;
        const enterpriseStored = await enterprise.save();
        return res.json({msg: "Empresa registrada correctamente", enterpriseStored});
    }catch(error){
        console.log(error);
    }
};

const deleteEnterprise = async(req, res) => {
    const { id } = req. body;
    await Enterprise.findByIdAndDelete(id);
    return res.json({msg: "Empresa eliminada correctamente"});
};

const editEnterprise = async(req, res) => {
    const { name, phoneNumber, adress, email } = req.body;
    await Enterprise.findByIdAndUpdate(req.params.id, {
        name, phoneNumber, adress, email
    })
    return res.json({msg: "Empresa actualizada correctamente"});
};

const addCollaborators = async(req, res) => {
    const { email } = req.body;
    const enterprise = await Enterprise.findById(req.params.id);

    console.log(enterprise)

     // Verificar que exista la empresa
     if(!enterprise){
        const error = new Error('Empresa no encontrada');
        return res.status(404).json({msg: error.message});
    }
    
    // Verificar si es creador
    if(enterprise.creator.toString() !== req.user._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(404).json({msg: error.message});
    }

    const user = await User.findOne({email}).select("-confirmed -createdAt -password -token -updateAt -__v");
    console.log(user);
    // Verificar que exista el usuario
    if(!user){
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({msg: error.message});
    }

    // Verificar que no sea el creador
    if(enterprise.creator.toString() === user._id.toString()){
        const error = new Error('El creador de la empresa no puede ser colaborador');
        return res.status(404).json({msg: error.message});
    }

    // Verificar que no este agregado
    if(enterprise.collaborators.includes(user._id)){
        const error = new Error('El usuario ya pertenece a la empresa');
        return res.status(400).json({msg: error.message});
    }

    enterprise.collaborators.push(user._id);
    await enterprise.save();
    res.json({msg: "Colaborador agregado"});
}

export{
    addEnterprise,
    deleteEnterprise,
    editEnterprise,
    getAllEnterprises,
    getEnterprise,
    addCollaborators
};