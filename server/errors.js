exports.handle400s = (err, req, res, next) => {
    res.status(400).send({ msg: '400: Bad Request' })
}

exports.handle404s = (req, res) => {
    res.status(404).send({ msg: '404: Not Found' })
}

exports.handle500s = (err, req, res, next) => {
    res.status(500).send({ msg: '500: Internal Server Error' })
}