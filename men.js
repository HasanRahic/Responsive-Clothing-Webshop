function passvalues(){
    var title = document.getElementsByClassName('shop-item-title')[0].innerText;
    var price = document.getElementsByClassName('price')[0].innerText;

    localStorage.setItem("TITLE", title);
    localStorage.setItem("PRICE", price);

    return;
}