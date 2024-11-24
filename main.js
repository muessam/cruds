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
                            <button>update</button>
                        </td>
                        <td>
                            <button onclick="deleteItem(${i})" >delete</button>
                        </td>
                    </tr>`
    }
    // console.log(allProduct);
    
    if (allProduct.length > 0) {
        deleteAll.innerHTML = `
        <button onclick="deleteAllItem()" >delete</button>
        `
    }
}


// Delete
function deleteItem(i) {
    allProduct.splice(i , 1 )
    localStorage.product = JSON.stringify(allProduct)
    // alert('hh')
    showResult.innerHTML = ''
    showAllProduct()
}
showAllProduct()

// Delete All
function deleteAllItem() {
    console.log('hhh');
    
    localStorage.clear()
    allProduct.splice(0)
    showAllProduct()
}