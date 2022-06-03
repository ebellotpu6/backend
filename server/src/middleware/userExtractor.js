const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    const authorization = request.get('authorization');
    if(!authorization) return response.status(401).json({ error: 'Authorization is required.'});
    if(authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) return response.status(401).json({ error: 'Token missing or invalid.'});

    const {id: user_id } = decodedToken;
    request.user_id = user_id;
    next();
}