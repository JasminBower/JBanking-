const app = require("./app");

exports.errorHandler = (err, rec, res, next) => {
    if(err)
    return res.status(err.status).send({msg: err.msg})

    res.status(500).send({ msg: "SERVER ERROR" });
};
