
module.exports.products = function(req, res){
    return res.send({products: "All products"});
}

module.exports.create = function(req, res){
    return res.send({products: "Create product"});
}

module.exports.update = function(req, res){
    return res.send({products: "Update product"});
}

module.exports.delete = function(req, res){
    return res.send({products: "Delete product"});
}

module.exports.getProductDtls = function(req, res){
    console.log(req.params.id);
    return res.send({products: "Particular product"});
}