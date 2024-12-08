let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let totalPrice = document.getElementById('totalPrice')
let count = document.getElementById('count')
let category = document.getElementById('category')
let creatBtn = document.getElementById('creatBtn')
let search = document.getElementById('search')
let searchTitleBtn = document.getElementById('searchTitleBtn')
let searchCategoryBtn = document.getElementById('searchCategoryBtn')
let showResult = document.getElementById('showResult')
let deleteAll = document.getElementById('deleteAll')

let allProduct;

// Create Product
if (localStorage.product != null) {
    allProduct = JSON.parse(localStorage.product)
}else {
    allProduct = []
}

creatBtn.onclick = function () {
    let newProduct = {
        id : Math.random(),
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        totalPrice : totalPrice.innerHTML,
        count : count.value,
        category : category.value,
    }
    // console.log(newProduct.id);
        
    // Counter
    if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
            allProduct.push(newProduct)            
        }
    } else {
        allProduct.push(newProduct)            
    }

    localStorage.setItem('product', JSON.stringify(allProduct))

    clearInputs()
    showAllProduct()
}

// Total Price
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        totalPrice.innerHTML = result;
        totalPrice.style.background = '#17a2b8'
    }else {
        totalPrice.innerHTML = 'result';
        totalPrice.style.background = 'red'
    }
}

// Clear Inputs
function clearInputs() {
    id = ''
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    totalPrice.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Show All Products
function showAllProduct() {
    
    showResult.innerHTML = ''

    for (let i = 0; i < allProduct.length; i++) {
        showResult.innerHTML += `<tr>
                        <td>${i}</td>
                        <td>${allProduct[i].id}</td>
                        <td>${allProduct[i].title}</td>
                        <td>${allProduct[i].price}</td>
                        <td>${allProduct[i].taxes}</td>
                        <td>${allProduct[i].ads}</td>
                        <td>${allProduct[i].discount}</td>
                        <td>${allProduct[i].category}</td>
                        <td>${allProduct[i].totalPrice}</td>
                        <td>
                            <button onclick="updateProduct(${i})">update</button>
                        </td>
                        <td>
                            <button onclick="deleteItem(${i})" >delete</button>
                        </td>
                    </tr>`
    }
    // console.log(allProduct);
    
    if (allProduct.length > 0) {
        deleteAll.innerHTML = `
        <button onclick="deleteAllItem()" >delete ${allProduct.length}</button>
        `
    }
}


// Delete
function deleteItem(i) {
    allProduct.splice(i , 1)
    localStorage.product = JSON.stringify(allProduct)
    // alert('hh')
    showResult.innerHTML = ''
    showAllProduct()
}
showAllProduct()

// Update
function updateProduct(i) {
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    let modalInputs = document.getElementById('modalInputs');
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
    for (let x = 0; x < allProduct.length; x++) {
    //    console.log(x);
       if (i == x) {
        console.log(allProduct[i].title);
        
        modalInputs.innerHTML = `
            <input type="text" placeholder="Title" id="title" value="${allProduct[i].title}">
            <div class="price">
                <input type="number" onkeyup="getTotal()" placeholder="Price" id="price" value="${allProduct[i].price}">
                <input type="number" onkeyup="getTotal()" placeholder="Taxes" id="taxes" value="${allProduct[i].taxes}">
                <input type="number" onkeyup="getTotal()" placeholder="Ads" id="ads"  value="${allProduct[i].ads}">
                <input type="number" onkeyup="getTotal()" placeholder="Discount" id="discount" value="${allProduct[i].discount}">
                <div class="total-price" id="totalPrice"  value="${allProduct[i].totalPrice}"></div>
            </div>
            <input type="text" placeholder="Category" id="category" value="${allProduct[i].category}">
            <button onclick ="saveUpdate(i)" id="creatBtn">Save Update</button>
        `
  
        }

    }
    // title.value = allProduct[i].title;
    // price.value = allProduct[i].price;
    // taxes.value = allProduct[i].taxes;
    // ads.value = allProduct[i].ads;
    // discount.value = allProduct[i].discount;
    // totalPrice.innerHTML = allProduct[i].totalPrice.innerHTML;
    // getTotal()
    // category.value = allProduct[i].category;

    // count.style.display = 'none'
    // creatBtn.innerHTML = 'Update' 
    // window.scrollTo({top: 0, behavior:"smooth"});
}

function saveUpdate(i) {
    console.log(i);
    
}


// Delete All
function deleteAllItem() {    
    localStorage.clear()
    allProduct.splice(0)
    showAllProduct()
}

