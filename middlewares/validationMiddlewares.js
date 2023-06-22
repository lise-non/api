
function validationMiddlewares(schema){
    return(res, req, next) =>{
        const{ error, value} = schema.validate(req.body);
        if(error){
            res.status(422).json({ message: error.details[0].message});
        }else{
            req.body = value;
            next()
        }
    }
}

module.exports = validationMiddlewares

