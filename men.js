

var title = document.getElementsByClassName('shop-item-title')[0].innerText
var price = document.getElementsByClassName('price')[0].innerText
var img = document.getElementsByClassName('shop-item-img')[0].src

document.addEventListener("click", () =>{
    localStorage.setItem("title", title)
    localStorage.setItem("price", price)
    localStorage.setItem("image", img)
})
