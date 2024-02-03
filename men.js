if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}
let cart = document.querySelectorAll('.shop-item-button')

let products = [
    {
        title : 'Brown Coat',
        tag: 'browncoat',
        price : 249.99,
        inCart: 0
    },
    {
        title : 'Red Shirt with Long Sleeves',
        tag: 'redshirtlongsleeves',
        price : 59.99,
        inCart: 0
    },
    {
        title : 'White Hoodie',
        tag: 'whitehoodie',
        price : 79.99,
        inCart: 0
    },
    {
        title : 'Denim Jacket',
        tag: 'denimjacket',
        price : 129.99,
        inCart: 0
    },
    {
        title : 'Red Zip Up Sweatshirt',
        tag: 'redsweatshirt',
        price : 59.99,
        inCart: 0
    },
    {
        title : 'Gray Hoodie',
        tag: 'greyhoodie',
        price : 79.99,
        inCart: 0
    },
    {
        title : 'Black Hoodie',
        tag: 'blackhoodie',
        price : 79.99,
        inCart: 0
    },
    {
        title : 'Dark Blue Jeans',
        tag: 'darkbluejeans',
        price : 119.99,
        inCart: 0
    },
    {
        title : 'Yellow Shorts',
        tag: 'yellowshorts',
        price : 69.99,
        inCart: 0
    },
    {
        title : 'Bleu de Chanel Eau de Parfeum',
        tag: 'bleuchanelparfeum',
        price : 169.99,
        inCart: 0
    },
    {
        title : 'Tom Ford Ombré Leather',
        tag: 'tomfordparfeum',
        price : 200.00,
        inCart: 0
    },
    {
        title : 'Fogg Discover',
        tag: 'foggdiscover',
        price : 120.00,
        inCart: 0
    }
]


for (let i = 0; i < cart.length; i++){
    cart[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
    })
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
    }else{
        localStorage.setItem('cartNumbers', 1)
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.tag]:product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function ready(){

}


