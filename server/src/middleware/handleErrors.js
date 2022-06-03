const notFound = (request, response, next) => {
    const error = new Error(`Not Found - ${request.originalUrl}`);
    response.status(404);
    next(error);
}

const ERROR_HANDLERS = {
    CastError: response => response.status(400).send({ error: 'ID used is malformed.' }),
    ValidationError: (response, { message }) => response.status(409).send({ error: message }),
    JsonWebTokenError: response => response.status(401).send({ error: 'Token missing or invalid.' }),
    TokenExpirerError: response => response.status(401).send({ error: 'Token expired.' }),
    defaultError: response => response.status(500).end(),
}

const handleError = (error, request, response, next) => {
    console.log(error.name);
    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
    handler(response, error);
}

module.exports = {
    notFound,
    handleError,
}