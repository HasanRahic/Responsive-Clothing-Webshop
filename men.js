let cart = document.querySelectorAll('.shop-item-button')

let products = [
    {
        title: 'Brown Coat',
        tag: 'pexels-photo-1183266',
        price: 249.99,
        inCart: 0
    },
    {
        title: 'Red Shirt with Long Sleeves',
        tag: 'pexels-photo-2095582',
        price: 59.99,
        inCart: 0
    },
    {
        title: 'White Hoodie',
        tag: 'pexels-photo-1671399.webp',
        price: 79.99,
        inCart: 0
    },
    {
        title: 'Denim Jacket',
        tag: 'pexels-photo-2774163',
        price: 129.99,
        inCart: 0
    },
    {
        title: 'Red Zip Up Sweatshirt',
        tag: 'pexels-photo-1706912',
        price: 59.99,
        inCart: 0
    },
    {
        title: 'Gray Hoodie',
        tag: 'pexels-photo-6311719',
        price: 79.99,
        inCart: 0
    },
    {
        title: 'Black Hoodie',
        tag: 'pexels-photo-6311560',
        price: 79.99,
        inCart: 0
    },
    {
        title: 'Dark Blue Jeans',
        tag: 'pexels-photo-7228516',
        price: 119.99,
        inCart: 0
    },
    {
        title: 'Yellow Shorts',
        tag: 'pexels-photo-7228462',
        price: 69.99,
        inCart: 0
    },
    {
        title: 'Bleu de Chanel Eau de Parfeum',
        tag: 'pexels-photo-9202894',
        price: 169.99,
        inCart: 0
    },
    {
        title: 'Tom Ford Ombré Leather',
        tag: 'pexels-photo-7487834',
        price: 200.00,
        inCart: 0
    },
    {
        title: 'Fogg Discover',
        tag: 'pexels-photo-11265021',
        price: 120.00,
        inCart: 0
    }
];


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
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cart-items");
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(el =>{
            productContainer.innerHTML +=`
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="photos/${el.tag}.jpeg" width="100" height="100">
                <span class="cart-item-title">${el.title}</span>
            </div>
            <span class="cart-price cart-column">${el.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
            `
        });
    }
}
displayCart();



