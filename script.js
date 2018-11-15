var add = document.querySelector(".js-add-cat");
var t = document.querySelector("#template-cat");
var cont = document.querySelector(".container");
var bask = document.querySelector(".basket");
var b = document.querySelector("#basket-cat");
var bought = document.querySelector(".basket__num");
var i = 0;
var n = 1;
var count = 0;

getCats();

//полуение котов по АПИ постранично

function getCats() {

    console.log('n:', n);
    var request = new XMLHttpRequest();
    request.open('GET', 'https://ma-cats-api.herokuapp.com/api/cats?page=' + n, true); //`${n++}`
    request.send();
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            arr = data.cats;
            // var arr = [];
            // arr.concat(data);
            // arr.push(data.cats);
        } else {
            // We reached our target server, but it returned an error
        }
    };
    request.upload.onprogress = function(event) {
        add.innerHTML = 'Загружаю...';
        add.disabled = true;
    }
    request.onerror = function() {
        alert("error"); // There was a connection error of some sort
    };
    //n++;
}

//кнопка, которая при клике вызывает ф-цию получения котов постранично
add.addEventListener('click', addCats);

function addCats() {
    getCats();
    for (let i = 0; i < arr.length; i++) {
        var card = document.importNode(t.content, true);
        var cprice = card.querySelector(".cat-price");
        var cimg = card.querySelector(".cat-img");
        var buy = card.querySelector(".buy");
        cont.appendChild(card);
        cprice.innerHTML = arr[i].price;
        cimg.src = arr[i].img_url;
        let catid = arr[i].id;
        bought.innerHTML = count;
        buy.addEventListener("click", function() {
            addToBasket(catid);

            //addToBasket(catid, i);
            //console.log(catid, i);
        });

        //console.log(arr[i]);
        // console.log(arr[i].id);
    }
    n++;
}

// то же при доскроливании до последнео эл-та

window.onscroll = function() {

    if (window.pageYOffset > arr[arr.length - 1].scrollTop || document.documentElement.scrollTop > arr[arr.length - 1].scrollTop) {
        for (var i = 0; i < arr.length; i++) {
            var card = document.importNode(t.content, true);
            var cprice = card.querySelector(".cat-price");
            var cimg = card.querySelector(".cat-img");
            cont.appendChild(card);
            cprice.innerHTML = arr[i].price;
            cimg.src = arr[i].img_url;
            //console.log(arr[i]);
        }
        n++;
        getCats();
    }

    // var y = arr[0];
    // console.log(y);
    // console.log(y.scrollTop);
    // console.log(window.pageYOffset);


    // window.onscroll = function() {
    //     var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    //     console.log(window.pageYOffset);
    // }
    // function getCoords(elem) { // кроме IE8-
    //     var box = elem.getBoundingClientRect();
    //     return {
    //       top: box.top + pageYOffset,
    //        };
    //   }
}


var basket = []; // korzina
//добавить в корзину
function addToBasket(apiid) {

    arr.forEach(function(item, i, arr) {
        if (arr[i].id == apiid) {
            basket.push(arr[i]);
            count++;
            // console.log(basket);
        }
    });

    //перевод эл-та в строку и запись в LocalStorage
    localStorage.setItem("cat", JSON.stringify(basket));

    //isempty
    loadbasket();

}
//localStorage
// localStorage.setItem('cat', 'green');
// if (localStorage.getItem('cat') !== null) {
//     var color = localStorage.getItem('cat');
//     document.getElementsByTagName("body")[0].style.background = color;
// }
//




//читает из корзины 
// надо сделать это при wondow.onload!!
function loadbasket() {
    //проверяет есть запись  в localStorage
    if (localStorage.getItem('cat')) {
        //расшифровка и запись в переменную-
        basket = JSON.parse(localStorage.getItem('cat'));
        //console.log(basket);
        showbasket();
    } else {
        a.innerHTML = "nothing here";
    }
}



//выводит котов в корзину
function showbasket() {

    for (let i = 0; i < basket.length; i++) {
        let bcard = document.importNode(b.content, true);
        let bname = bcard.querySelector(".basket-name");
        let bprice = bcard.querySelector(".basket-price");
        let bimg = bcard.querySelector(".basket-img");
        bask.appendChild(bcard);
        bname.innerHTML = basket[i].name;
        bprice.innerHTML = basket[i].price;
        bimg.src = basket[i].img_url;
        bought.innerHTML = count;
        console.log(basket[i]);
    }

}



function delet() {
    var id = this.id;
    delete cat[id];
    showcards();
}