let cart3 = document.querySelectorAll('.shop-item-button')
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}
function ready(){}

let productsSales = [
    {
        title: 'Black Notched Suit',
        tag: 'pexels-photo-2955375',
        price: 599.99,
        inCart: 0
    },
    {
        title: 'Green Suit',
        tag: 'pexels-photo-3600142',
        price: 949.99,
        inCart: 0
    },
    {
        title: 'Men`s Black Coat',
        tag: 'fashion-men-s-individuality-black-and-white-157675',
        price: 249.99,
        inCart: 0
    },
    {
        title: 'Yellow Leather Boots',
        tag: 'pexels-godisable-jacob-977908',
        price: 349.99,
        inCart: 0
    },
    {
        title: 'Floral Elegance Dress',
        tag: 'pexels-photo-4352249 (1)',
        price: 49.99,
        inCart: 0
    },
    {
        title: 'Blue dress',
        tag: 'pexels-photo-4355702',
        price: 199.99,
        inCart: 0
    }
];

let cartItemsInCartSales = localStorage.getItem("productsInCart");
if(cartItemsInCartSales){
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
    alert('Thank you for your purchase')
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



for (let i = 0; i < cart3.length; i++){
    cart3[i].addEventListener('click', ()=>{
        cartNumbers(productsSales[i]);
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