import Tag from '../models/Tag.js';
import Product from '../models/Product.js';

const getTags = async(req, res) => {
    const tags = await Tag.find().where('creator').equals(req.user._id);
    console.log(tags);
    return res.json(tags);
};


const registerTag = async(req, res) => {
    const { name } = req.body;

    const tagExist = await Tag.findOne({ name: name });

    if(tagExist){
        return res.json({ msg: 'El tag ya existe'});
    }

    try {
        const tag = new Tag(req.body)
        tag.creator = req.user._id;
        const tagStored = await tag.save();
        return res.json(tagStored)
    } catch (error) {
        console.log(error);
    }
};

const deleteTag = async(req, res) => {
    //Eliminar tag de los productos
    const products = await Product.find().where('tags').equals(req.params.id);
    
    if(products){
        const productsUpdate = []
        products.forEach( (element) => {
            const tags = element.tags.filter(tag => tag != req.params.id);
            element.tags = tags;
            productsUpdate.push(element);
        });

        productsUpdate.forEach(async(element) => {
            await element.save();
        })
    }

    await Tag.findByIdAndDelete(req.params.id)

    res.json({msg: "Tag eliminado correctamente"});
};

export {
    getTags,
    registerTag,
    deleteTag
}