const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const authenticate = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({
            status:'error',
            code: 401,
            message: 'No se proporcionó un token'
        })
    }

    jwt.verify(token, JWT_SECRET, (err,user)=>{
        if(err){
            return res.status(403).json({
                status:'error',
                code: 403,
                message: 'Token no valido'
            })
        }

        req.user = user
        next()
    })
}

module.exports = authenticate