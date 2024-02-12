module.exports.home = function (req, res) {
    const apis = [
        { verb: 'POST', token: 'N', endpoint: '/api/users/signup', action: 'To sign up a new user account' },
        { verb: 'POST', token: 'N', endpoint: '/api/users/signin', action: 'To sign in an existing user account' },
        { verb: 'POST', token: 'Y', endpoint: '/api/users/update', action: 'To update an existing user accountt' },
        { verb: 'POST', token: 'N', endpoint: '/api/users/sendResetPasswordLink', action: 'To send reset password link on mail' },
        { verb: 'POST', token: 'N', endpoint: '/api/users/resetPassword', action: 'To reset password of an existing user account' },
        { verb: 'GET', token: 'Y', endpoint: '/api/addresses/getAddressList/:userId', action: 'To get all addresses of particular user' },
        { verb: 'GET', token: 'Y', endpoint: '/api/addresses/getAddress/:addressId', action: 'To get details particular address' },
        { verb: 'POST', token: 'Y', endpoint: '/api/addresses/create', action: 'To create a new address' },
        { verb: 'POST', token: 'Y', endpoint: '/api/addresses/update', action: 'To update an existing address' },
        { verb: 'GET', token: 'Y', endpoint: '/api/addresses/delete/:id', action: 'To delete an existing address' },
        { verb: 'GET', token: 'N', endpoint: '/api/products/all', action: 'To get all products' },
        { verb: 'POST', token: 'Y', endpoint: '/api/products/create', action: 'To create a new product' },
        { verb: 'POST', token: 'Y', endpoint: '/api/products/update', action: 'To update an existing product' },
        { verb: 'GET', token: 'Y', endpoint: '/api/products/delete/:id', action: 'To delete an existing product' },
        { verb: 'GET', token: 'N', endpoint: '/api/products/getProduct/:id', action: 'To get details of particular product' },
        { verb: 'GET', token: 'Y', endpoint: '/api/products/getUserProduct/:userId', action: 'To get all products created by a user' },
        { verb: 'GET', token: 'N', endpoint: '/api/products/search/:string', action: 'To search products' },
        { verb: 'GET', token: 'N', endpoint: '/api/products/category/:string', action: 'To filter products according to category' },
        { verb: 'GET', token: 'Y', endpoint: '/api/orders?user=userId', action: 'To get all orders of particular user' },
        { verb: 'GET', token: 'Y', endpoint: '/api/orders/:id', action: 'To get details of a order' },
        { verb: 'POST', token: 'Y', endpoint: '/api/orders/create', action: 'To create a new order' },
        { verb: 'POST', token: 'Y', endpoint: '/api/orders/update', action: 'To update an existing order' },
        { verb: 'GET', token: 'Y', endpoint: '/api/orders/delete/:id', action: 'To delete an existing order' },
        { verb: 'POST', token: 'Y', endpoint: '/api/ratings/create', action: 'To create a new rating' },
        { verb: 'POST', token: 'Y', endpoint: '/api/ratings/update', action: 'To update an existing rating' },
        { verb: 'GET', token: 'Y', endpoint: '/api/ratings/delete/:id', action: 'To delete an existing rating' },
    ];
    
    res.render("home", {
        apis: apis
    });
}