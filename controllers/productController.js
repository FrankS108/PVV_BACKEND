import Product from "../models/Product.js";

const getProducts = async(req, res) => {
    
};

const registerProduct = async(req, res) => {
    console.log(req.body);
    const { name, store } = req.body;
    console.log(req.body)
    const productExist = await Product.findOne({name: name, store: store});

    if(productExist){
        return res.status(400).json({msg: 'Ya existe este producto'});
    }

    const product = new Product(req.body);
    await product.save();
    return res.status(200).json({msg: "Producto creado correctamente"});   
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

