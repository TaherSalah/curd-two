/////// start var for crud ////////


let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let total = document.getElementById('total');
let btnSubmit = document.getElementById('submit');
let search = document.getElementById('search');
let btnSearchTitle = document.getElementById('searchTitle');
let btnSearchCategory = document.getElementById('searchCategory');
let tabelData = document.getElementById('tabelData');
let products;
let currentIndex;
let currentMoode = 'Create Product';
///////// Start var Rejex crud ///////////////////////
let alertTitle = document.getElementById('alertTitle');
let alertPrice = document.getElementById('alertPrice');
let alertCount = document.getElementById('alertCount');
let alertCategory = document.getElementById('alertCategory');
///////// End var Rejex crud ///////////////////////

// console.log(
//     price, taxes, ads, discount, count, category, btnSubmit, search, total, btnSearchTitle, btnSearchCategory, tabelData
// )

///// start Rejex crud /////

////title/////
title.onkeyup = function() {
        let titleRejex = /^[A-Z][a-z]{2,8}$/
        if (titleRejex.test(title.value)) {
            title.classList.add('is-valid');
            title.classList.remove('is-invalid');
            alertTitle.classList.add('d-none')


        } else {
            title.classList.add('is-invalid');
            alertTitle.classList.remove('d-none')
        }
    }
    ////Price/////
price.onkeyup = function() {
    let priceRejex = /^\d{0,8}(\.\d{1,4})?$/
    if (priceRejex.test(price.value)) {

        price.classList.add('is-valid');
        price.classList.remove('is-invalid');
        getTolal();

    } else {

        price.classList.add('is-invalid')

    }
}
taxes.onkeyup = function() {
    let taxesRejex = /^\d{0,8}(\.\d{1,4})?$/;
    if (taxesRejex.test(taxes.value)) {

        taxes.classList.add('is-valid');
        taxes.classList.remove('is-invalid');
    } else {

        taxes.classList.add('is-invalid');
        getTolal();

    }
}
ads.onkeyup = function() {
    let adsRejex = /^\d{0,8}(\.\d{1,4})?$/;;
    if (adsRejex.test(ads.value)) {

        ads.classList.add('is-valid');
        ads.classList.remove('is-invalid');
        getTolal()

    } else {

        ads.classList.add('is-invalid')
    }
}
discount.onkeyup = function() {
    let discountRejex = /^\d{0,8}(\.\d{1,4})?$/
    if (discountRejex.test(discount.value)) {

        discount.classList.add('is-valid');
        discount.classList.remove('is-invalid');
        getTolal()
    } else {

        discount.classList.add('is-invalid')
    }
}
count.onkeyup = function() {
    let countRejex = /^[0-9]{1,6}$/
    if (countRejex.test(count.value)) {

        count.classList.add('is-valid');
        count.classList.remove('is-invalid');
        alertCount.classList.add('d-none')
    } else {

        count.classList.add('is-invalid');
        alertCount.classList.remove('d-none')
    }
}
category.onkeyup = function() {
        let categoryRejex = /^[A-Z][a-z]{2,4}$/
        if (categoryRejex.test(category.value)) {

            category.classList.add('is-valid');
            category.classList.remove('is-invalid');
            alertCategory.classList.add('d-none')
        } else {

            category.classList.add('is-invalid');
            alertCategory.classList.remove('d-none')
        }
    }
    /////// start localstorage if condition //////
if (localStorage.productStorage != null) {
    products = JSON.parse(localStorage.productStorage);
    displayProducts()

} else {
    products = [];
}
/////// end localstorage if condition //////

///// start get Total fun ///////

function getTolal() {
    if (price.value != '' && taxes.value != '' && ads.value != '') {
        let resuals = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        total.innerHTML = resuals;
        total.style.background = '#030'
        total.style.color = '#ffff'

    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02'
        total.style.color = '#ffff'
    }
}
///// End get Total fun ///////

///// start  creat Product fun ///////

btnSubmit.onclick = function() {
    if (title.value != '' && price.value != '' && category.value != '' && count.value != '') {
        createProduct()
        clearProducts()
        displayProducts()
    } else {}
}


function createProduct() {
    let addProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
        total: total.innerHTML
    }

    if (currentMoode === 'Create Product') {
        if (addProduct.count > 1) {
            for (let i = 0; i < addProduct.count; i++) {
                products.push(addProduct)
            }
        } else {
            products.push(addProduct)
        }
    } else {
        products[currentIndex] = addProduct; //////// creat var for golbal index updat
        currentMoode = 'Create Product';
        btnSubmit.innerHTML = 'Create Product'
        count.style.display = 'block';
    }
    localStorage.setItem('productStorage', JSON.stringify(products))
    console.log(products)
}
///// End creat Product fun ///////


///// Start clear Product fun ///////
function clearProducts() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}
///// End clear Product fun ///////

///// Start Read Product fun ///////

function displayProducts() {
    getTolal();
    let productTable = ``;
    for (let i = 0; i < products.length; i++) {
        productTable += `<tr>
                <td>${[i+1]}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update" class="btn btBody  btn-outline-warning">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete " class="btn btBody btn-outline-danger ">Delete</button></td>
        </tr>`
    }
    document.getElementById('tbodyData').innerHTML = productTable;
    let deletePro = document.getElementById('deleteAll');
    if (products.length > 0) {
        deletePro.innerHTML = `<button onclick="deleteAll()" id="deleteAll" class="btn btn-outline-danger">Delete All ( ${products.length} )</button>`
    } else {
        deletePro.innerHTML = ''
    }

}

///// End Read Product fun ///////


///// Start Delete Product fun ///////
function deleteProduct(indexDelete) {
    products.splice(indexDelete, 1)
    localStorage.productStorage = JSON.stringify(products)
    displayProducts()
}
///// End Delete Product fun ///////



///// Start Delete All Product fun ///////

function deleteAll() {
    localStorage.clear();
    products.splice(0)
    displayProducts()
}

///// End Delete All Product fun ///////

///// Start Update Product fun ///////
function updateProduct(index) {
    title.value = products[index].title;
    price.value = products[index].price;
    taxes.value = products[index].taxes;
    ads.value = products[index].ads;
    discount.value = products[index].discount;
    count.style.display = "none";
    category.value = products[index].category;
    getTolal();
    btnSubmit.innerHTML = 'Update Product';
    currentIndex = index;
    currentMoode = 'Update Product'
    scroll({ /////////for scroll up smooth 
        top: 0,
        behavior: 'smooth'
    })
}
///// End Update Product fun ///////

///// Start Search Product fun ///////
function searchMood(id) {
    let search = document.getElementById('search')
    let searchMood = 'title'
    if (id == 'searchTitle') {
        searchMood = 'title'
    } else {
        searchMood = 'category'
    }
    console.log(id)
    search.focus()
    search.placeholder = 'search By' + " " + searchMood;
    search.value = ''; ///////for emplet  search input ///////
    displayProducts();
}



function productSearch(value) {
    let productTable = ''
    for (let i = 0; i < products.length; i++) {
        if (products[i].category.toLowerCase().includes(value.toLowerCase())) {
            productTable += `<tr>
            <td>${[i+1]}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update" class="btn btBody  btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete " class="btn btBody btn-outline-danger ">Delete</button></td>
    </tr>`
        } else {
            if (products[i].title.toLowerCase().includes(value.toLowerCase())) {
                productTable += `<tr>
                    <td>${[i+1]}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update" class="btn btBody  btn-outline-warning">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete " class="btn btBody btn-outline-danger ">Delete</button></td>
            </tr>`
            }
        }
    }
    document.getElementById('tbodyData').innerHTML = productTable;
}



///// End Search Product fun ///////
///// End Search Product fun ///////