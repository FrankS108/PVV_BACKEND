import Product from "../models/Product.js";

const getProducts = async(req, res) => {
    
};

const registerProduct = async(req, res) => {
    const { name, store } = req.body;

    const productExist = await Product.findOne({name: name, store: store});

    if(productExist){
        return res.json({msg: 'Ya existe este producto', productExist});
    }

    try {
        const product = new Product(req.body);
        const productSaved = await product.save();
        return res.json(productSaved);    
    } catch (error) {
        console.log(error);
    }
    
};

const editProduct = async(req, res) => {
    //Editar el producto solo para el almacen actual
};

const deleteProduct = async(req, res) => {
    //Eliminar el producto que se encuentr en el almacen actual
};


export{
    getProducts,
    registerProduct,
    editProduct,
    deleteProduct
}

