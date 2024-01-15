

var title = document.getElementsByClassName('shop-item-title').value;
document.getElementsByClassName('shop-item-title')[0].innerText = title;
var price = document.getElementsByClassName('price').value;
document.getElementsByClassName('price')[0].innerText = price;

document.getElementsByClassName('shop-item-button').addEventListener('click', function(){
    localStorage.setItem("title", title)
    localStorage.setItem("price", price);
})
