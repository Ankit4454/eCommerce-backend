
module.exports.signup = function(req, res){
    return res.send({users: "User signup"});
}

module.exports.signin = function(req, res){
    return res.send({users: "User signin"});
}

module.exports.update = function(req, res){
    return res.send({users: "User update"});
}