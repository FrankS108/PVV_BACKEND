import Store from "../models/Store.js";
import Product from "../models/Product.js";


const registerStore = async(req, res) => {
    const { name, enterprise } = req.body;
    const storeExist = await Store.findOne({ name }).where('enterprise').equals(enterprise);

    if(storeExist){
        return res.status(400).json({msg: "Ya esta registrado este almacen"});
    }

    const store = new Store(req.body);
    const storeSaved = await store.save();
    return res.status(200).json({msg: "Sucursal creada correctamente"});
};

const getStore = async(req, res) => {
    const store = await Store.findById(req.params.id).catch((err) => {
        console.log(err)
    });

    //Si no existe la tienda
    if(!store){
        const error = new Error('No existe la tienda');
        return res.status(404).json({msg: error.message});
    }

    const products = await Product.find().where('store').equals(req.params.id).populate("tags");
    
    return res.status(200).json({
        store,
        products
    });
};


export{
    registerStore,
    getStore
}