const backendDomain = "https://evc-marketplace-backend.vercel.app";


const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : "get"
    },
    allUser : {
        url : `${backendDomain}/api/all-users`,
     method : 'get'
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : "post"
    }, 
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct : {
            url : `${backendDomain}/api/category-product`,
            method : "post"
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomain}/api/viewCartProduct`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : "get"
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : 'post'
    },
    payment : {
        url : `${backendDomain}/api/checkout`,
        method : 'post'
    },
    order : {
        url : `${backendDomain}/api/order-list`,
        method : 'get'
    },
    likedProduct : {
        url : `${backendDomain}/api/liked-product`,
        method : 'post'
    },
    likedProductCount : {
        url : `${backendDomain}/api/countLikedProduct`,
        method : 'get'
    },
    forgotPassword: {
        url: `${backendDomain}/api/forgot-password`,
        method: 'post',
    },
    resetPassword: {
        url: `${backendDomain}/api/reset/:token`, // Note: Replace :token with actual token when making the request
        method: 'post',
    },
    createDocument: {
        url: `${backendDomain}/api/documents`,
        method: 'post',
    },
    viewLikedProduct : {
        url : `${backendDomain}/api/viewLikedProduct`,
        method : 'get'
    },
    getUserDocuments: {
        url: `${backendDomain}/api/user/documents`,
        method: 'get',
    }
}
 
export default SummaryApi