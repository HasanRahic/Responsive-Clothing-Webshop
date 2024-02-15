let cart = document.querySelectorAll('.shop-item-button')
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}
function ready(){}

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
        tag: 'pexels-photo-8217419',
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
        tag: 'pexels-photo-6311603',
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

let cartItemsInCart = localStorage.getItem("productsInCart");
if(cartItemsInCart){
    displayCart();
    updateCartTotal();
}
var removeCartItemButtons = document.getElementsByClassName('btn-danger')
console.log(removeCartItemButtons)
for(var i = 0; i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)


function purchaseClicked(){
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    localStorage.removeItem("cartNumbers");
    localStorage.removeItem("productsInCart");
    updateCartTotal();

}




function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value < 1){
        input.value = 1
    }
    updateCartTotal()
}



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
    updateCartTotal();
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
    updateCartTotal();
}
function displayCart(){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cart-items");
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(el =>{
            productContainer.innerHTML +=`
            <div class="cartitems">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="photos/${el.tag}.jpeg" width="100" height="100">
                    <span class="cart-item-title">${el.title}</span>
                </div>
                <span class="cart-price">$${el.price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>
            `
        });
    }
}



function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cartitems')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}