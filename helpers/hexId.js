export const checkHexId = (req, res, next) => {
    var hex = /[0-9A-Fa-f]{6}/g;

    //Si existe
    if(hex.test(req.params.id)){
        next();
    }else{
        res.status(404).json({msg: 'La ruta especificada no existe'});
    }
};

export const checkHexToken = async(req, res, next) => {
    var hex = /[0-9A-Fa-f]{24}/g;
    const { token } = req.params;

    //Si no existe
    if(!token){
        next();
    }

    //Si existe
    if(hex.test(token)){
        next();
    }else{
        res.status(404).json({msg: 'La ruta especificada no existe'});
    }
};

