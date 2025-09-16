// Utility created to avoid use of try catch block repeatedly

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch((error) => next(error));
    }
}

export { asyncHandler }