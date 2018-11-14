var add = document.querySelector(".js-add-cat");
var t = document.querySelector("#template-cat");
var cont = document.querySelector(".container");

var i = 0;
var n = 1;


getCats();

//полуение котов по АПИ постранично

function getCats() {
    console.log('n:', n);
    var request = new XMLHttpRequest();
    request.open('GET', 'https://ma-cats-api.herokuapp.com/api/cats?page=' + n, true);
    request.send();
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            arr = data.cats;
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
}

//кнопка, которая при клике вызывает ф-цию получения котов постранично
add.addEventListener('click', addCats);

function addCats() {

    for (let i = 0; i < arr.length; i++) {
        var card = document.importNode(t.content, true);
        var cprice = card.querySelector(".cat-price");
        var cimg = card.querySelector(".cat-img");
        var buy = card.querySelector(".buy");
        cont.appendChild(card);
        cprice.innerHTML = arr[i].price;
        cimg.src = arr[i].img_url;
        let catid = arr[i].id;
        buy.addEventListener("click", function() {
            // addToBasket(catid);
            addToBasket(catid, i);
            //console.log(catid, i);
        });
        // console.log(arr[i]);
        // console.log(arr[i].id);
    }
    n++;
    getCats();
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
function addToBasket(apiid, num) {

    basket.push(arr[num]);


    console.log(basket);

    //перевод эл-та в строку и запись в LocalStorage
    localStorage.setItem("cat", JSON.stringify(apiid));

    //isempty
    //loadbasket();
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
        console.log(basket);
        showbasket();
    } else {
        a.innerHTML = "nothing here"
    }
}

var bask = document.querySelector(".basket");

//выводит котов в корзину
function showbasket() {
    for (key in basket) {
        var card = document.importNode(t.content, true);
        //var cprice = card.querySelector(".cat-price");
        //var cimg = card.querySelector(".cat-img");
        bask.appendChild(card);
        cprice.innerHTML = basket.price;
        cimg.src = basket.img_url;
        //console.log(arr[i]);
        //console.log(arr[i].id);

    }
}


function delet() {
    var id = this.id;
    delete cat[id];
    showcards();
}