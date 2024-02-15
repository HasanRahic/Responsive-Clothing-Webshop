let cart2 = document.querySelectorAll('.shop-item-button')
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}
function ready(){}
let productsBuy= [
    {
        title: 'Black and White Chevron Maxi Dress',
        tag: 'pexels-photo-859205',
        price: 89.99,
        inCart: 0
    },
    {
        title: 'Black and White Striped Long-sleeved Dress',
        tag: 'pexels-photo-1000373',
        price: 109.99,
        inCart: 0
    },
    {
        title: 'Denim Jacket',
        tag: 'pexels-photo-6542596',
        price: 129.99,
        inCart: 0
    },
    {
        title: 'Brown Zip Up Jacket',
        tag: 'pexels-photo-4061199',
        price: 149.99,
        inCart: 0
    },
    {
        title: 'Black Leather Jacket',
        tag: 'pexels-photo-4069208',
        price: 199.99,
        inCart: 0
    },
    {
        title: 'Black Zip-up Hoodie',
        tag: 'pexels-photo-1808397',
        price: 139.99,
        inCart: 0
    },
    {
        title: 'Black Sweatshirt',
        tag: 'pexels-photo-2952815',
        price: 49.99,
        inCart: 0
    },
    {
        title: 'Stripe Dress',
        tag: 'pexels-photo-1007010',
        price: 79.99,
        inCart: 0
    },
    {
        title: 'White Dress',
        tag: 'pexels-photo-7244586',
        price: 99.99,
        inCart: 0
    },
    {
        title: 'Flowerbomb Viktor Rolf',
        tag: 'pexels-photo-4110339',
        price: 89.99,
        inCart: 0
    },
    {
        title: 'Dolce and Gabbana The One',
        tag: 'pexels-photo-1961795',
        price: 189.99,
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
        title: 'Givenchy Dahlia Divini',
        tag: 'pexels-photo-9323886',
        price: 220.00,
        inCart: 0
    },
    {
        title: 'Fogg Discover',
        tag: 'pexels-photo-11265021',
        price: 120.00,
        inCart: 0
    }
]

let cartItemsInCartBuy = localStorage.getItem("productsInCart");
if(cartItemsInCartBuy){
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



for (let i = 0; i < cart2.length; i++){
    cart2[i].addEventListener('click', ()=>{
        cartNumbers(productsBuy[i]);
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