import Enterprise from "../models/Enterprise.js";
import Store from "../models/Store.js";
import User from "../models/User.js";

const getAllEnterprises = async(req, res) => {
    try {
        const allEnterprises = await Enterprise.find({
            '$or':[
                {'collaborators': { $in: req.user}},
                {'creator': { $in: req.user}},
            ]
        })
        res.status(200).json(allEnterprises);
    } catch (error) {
        console.log(error)
        res.status(404).json({msg: "Empresas no encontradas."})
    }
}

const getEnterprise = async(req, res) => {
    const { id } = req.params;
    
    /*
    if(!id || id === null || typeof(id) === 'undefined'){
        const error = new Error('Empresa no encontrada');
        return res.status(404).json({msg: error.message});
    }
    */
    try {
        const enterprise = await Enterprise.findById(req.params.id).populate("collaborators").catch((err) => {
            console.log(err)
        });
        if(!enterprise){
            const error = new Error('Empresa no encontrada');
            console.log(error)
            return res.status(404).json({msg: error.message});
        }
        const stores = await Store.find().where('enterprise').equals(id);

        return res.status(200).json({
            enterprise,
            stores
        });
    } catch (error) {
        console.log(error);
    }

    
}

const addEnterprise = async(req, res) => {
    const { name } = req.body;
    const enterpriseExist = await Enterprise.findOne({name: name}).where('creator').equals(req.user._id);

    if(enterpriseExist){
        const error = new Error('El nombre ya esta en uso');
        return res.status(400).json({msg: error.message});
    }

    try{
        const enterprise = new Enterprise(req.body);
        enterprise.creator = req.user._id;
        const enterpriseStored = await enterprise.save();
        return res.status(200).json({msg: "Empresa registrada correctamente", enterpriseStored});
    }catch(error){
        console.log(error);
    }
};

const deleteEnterprise = async(req, res) => {
    const { id } = req. body;
    try {
        await Enterprise.findByIdAndDelete(id).catch((err) => {
            console.log(err)
        });
        return res.status(200).json({msg: "Empresa eliminada correctamente"});
    } catch (error) {
        console.log(error)
    }
};

const editEnterprise = async(req, res) => {
    const { name, phoneNumber, adress, email } = req.body;
    try {
        await Enterprise.findByIdAndUpdate(req.params.id, {
            name, phoneNumber, adress, email
        }).catch((err) => {
            console.log(err)
        });

        return res.status(200).json({msg: "Empresa actualizada correctamente"});
    } catch (error) {
        console.log(error)
    }
};

const addCollaborators = async(req, res) => {
    const { email } = req.body;
    const enterprise = await Enterprise.findById(req.params.id).catch((err) => {
            console.log(err)
    });

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

const deleteCollaborator = async(req, res) => {
    //Obtenemos el id
    const { id } = req.body;

    //Obtenemos la empresa
    const enterprise = await Enterprise.findById(req.params.id);

    //Si no existe
    if(!enterprise){
        const error = new Error('Empresa no encontrada');
        return res.status(404).json({msg: error.message});
    }

    //Si no es el creador
    if(enterprise.creator.toString() !== req.user._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(404).json({msg: error.message});
    }

    // Verificar si es creador de la empresa
    if(enterprise.creator.toString() !== req.user._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(404).json({msg: error.message});
    }

    try {
        enterprise.collaborators.pull(id);
        await enterprise.save();
        res.status(200).json({msg: "Eliminado correctamente"});
    } catch (error) {
        res.status(400).json({msg: "No se ha podido eliminar"});
    }
}

const deleteStore = async(req, res) => {
    //Obtenemos el id
    const { id } = req.body;

    //Obtenemos la empresa
    const enterprise = await Enterprise.findById(req.params.id);

    //Si no existe la empresa
    if(!enterprise){
        const error = new Error('Empresa no encontrada');
        return res.status(404).json({msg: error.message});
    }

    //Si no es el creador
    if(enterprise.creator.toString() !== req.user._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(404).json({msg: error.message});
    }

    //Obtenemos las sucursales
    await Store.findByIdAndDelete(id);
    res.status(200).json({msg: "Eliminado correctamente"});
}

export{
    addEnterprise,
    deleteEnterprise,
    editEnterprise,
    getAllEnterprises,
    getEnterprise,
    addCollaborators,
    deleteCollaborator,
    deleteStore
};