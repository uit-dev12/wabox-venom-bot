exports.tokenMiddleware = (req, res, next) => { 
    // check token 
    const token  = req.headers.token 
    if(!token || token.length === 0)  { 
        return res.status(400).json({status: false, message: "Token not found"})
    }
    return next()

}