const validateRequestParams = (schema) =>{
    return (req,res,next)=>{
        const { error } = schema.validate(req.params)
        if(error){
            return res.status(400).json({
                status:'error',
                code: 400,
                message:error.details[0].message
            })
        }
        next()
    }
}

module.exports = validateRequestParams