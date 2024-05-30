exports.handle400s = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({ msg: '400: Bad Request' });
    } else {
        next(err); 
    }
};
exports.handle401s = (err, req, res, next) => {
    if (err.status === 401) {
        res.status(401).send({ msg: '401: Unauthorized' });
    } else {
        next(err); 
    }
};
exports.handle404s = (err, req, res, next) => { 
    if (err.status === 404) {
        res.status(404).send({ msg: '404: Not Found' }); 
        } else {
            next(err)
        }
 };

exports.handle500s = (err, req, res, next) => {
    res.status(500).send({ msg: '500: Internal Server Error' });
};