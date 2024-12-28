import navbar from "./Navbar.js";
import Footer from "./Footer.js";

let Navbar = document.getElementById("cartNavbar");
Navbar.innerHTML=navbar();

let foot = document.getElementById("cartFooter");
foot.innerHTML= Footer();

let orders = document.getElementById("orders-body");



 async function getOrders(){
    try{
        let result = await fetch(`http://localhost:8089/users/orders/${username}`);
        let data = await result.json();
        if(data.length>=1){
           appendingOrders(data);
        }
        else{
            showError("YOU'R CART IS EMPTY"); 
        }
   }
   catch(e){
       showError(e);
   }
}

getOrders();

function appendingOrders(data){
   data.forEach((product,ind)=>{
    let parent = document.createElement("div");
    parent.setAttribute('class',"order-product");
    let div1 = document.createElement("div");
    div1.setAttribute('class',"product-body");
    let title = createElement("h5");
    title.setAttribute('class',"product-title");
    let quantity = document.createElement("p");
    quantity.setAttribute('class',"product-info");
    let bookedDate = document.createElement("data");
    data.setAttribute('class',"product-info");
    let price = document.createElement("p");
    price.setAttribute('class',"product-info");
    let delivereData = document.createElement("p");
    delivereData.setAttribute('class',"product-info");
    let deliveryStatus = document.createElement("article");
    deliveryStatus.setAttribute('class',"product-info");
    let delButton = document.createElement("button");
    delButton.setAttribute('class',"product-button");
    delButton.addEventListener("click", ()=>{deleteOrder(product.orderId)});
    delButton.innerText = "DELETE";
    if(product.status==="Shipped"){
        delButton.setAttribute('hidden');
    }
    title.innertext = product.productName;
    //quantity.innerText = "Quantity : ".concat(product.quantity);
    bookedDate.innerText = "BookedOn : ".concat(product.orderedDate);
    //price.innerText = "price:  $".concat(product.price);
    delivereData.innerText = "DeliveryOn : ".concat(product.deliveryDate);
    deliveryStatus.innerText = "Status : ".concat(product.status);
    div1.append(title,bookedDate,delivereData,deliveryStatus);
    parent.append(div1,delButton);
    orders.append(parent);
    })
}

async function deleteOrder(id){
    let username = JSON.parse(localStorage.getItem("userName"));
    try{
        let response= await fetch(`http://localhost:8089/users/orders/${username}/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }

        })
        if(response.ok){
            location.reload();
            window.alert("Deleted");
        }
        else{
            window.alert("Not Deleted Try Again");
        }
    }
catch(error){
    showError(error);
    }
}

function showError(message){
    orders.innerHTML="";
    let div = document.createElement("div");
    div.setAttribute('class',"error-display");
    let title = document.createElement("h3");
    title.innerText = message;
    div.append(title);
    orders.append(div);
}


function userLogOut(){
    localStorage.removeItem("userName");
    window.alert("Loged Out SUccessfully");
    window.location.replace("../HTML/Login.html");
}