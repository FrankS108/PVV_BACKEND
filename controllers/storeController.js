import Store from "../models/Store.js";
import Product from "../models/Product.js";


const registerStore = async(req, res) => {
    const { name, enterprise } = req.body;
    const storeExist = await Store.findOne({ name }).where('enterprise').equals(enterprise);

    if(storeExist){
        return res.json({msg: "Ya esta registrado este almacen"});
    }

    const store = new Store(req.body);
    const storeSaved = await store.save();
    return res.json(storeSaved);
};

const getStore = async(req, res) => {
    const store = await Store.findById(req.params.id);
    const products = await Product.find().where('store').equals(req.params.id).populate("tags");
    return res.json({
        store,
        products
    });
};

export{
    registerStore,
    getStore
}