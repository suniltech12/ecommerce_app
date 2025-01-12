const routes = {
 userRegister:'/register',
 userLogin:'/login',

 getAllProduct:'/get/all',
 getProductOne:'/get-one/:id',
 createProduct:'/create',
 updateProduct: '/update/:id',
 deleteProduct:'/delete/:id',

 addCartItem:'/add',
 chekout:'/checkout',
 getCartItem:'/get',
 updateCart:'/update',
 removeCart: '/remove'
};

module.exports = routes;
