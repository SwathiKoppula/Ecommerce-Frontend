import navbar from "./Navbar.js";
import Footer from "./Footer.js";

let Navbar = document.getElementById("cartNavbar");
Navbar.innerHTML=navbar();

document.getElementById('logout').addEventListener('click', userLogOut);

let cart = document.getElementById("cart-items");

let foot = document.getElementById("cartFooter");
foot.innerHTML= Footer();

let username = JSON.parse(localStorage.getItem("userName"));


async function getCartData(){
    try{
        let array = [];
        let response = await fetch(`http://localhost:8089/users/cart/${username}`);
          let data = await response.json();
          if(data.length>0){
            appendingData(data);
          }
          else{
            // appendSingleData(data);
            cart.innerHTML = "";
            cart.innerHTML = "<p>No items in your cart.</p>";
          }
    }
    catch(e){
        showError(e);
    }
}


function appendingData(data){
    let array = Object.keys(data).map((key)=>data[key]);
    console.log(array);
    cart.innerHTML="";
    array.map((item,ind)=>{
    let div = document.createElement("div");
    div.setAttribute('class',"cart-product");
    let div1 = document.createElement("div");
    div1.setAttribute('class',"image-container");
    let div2 = document.createElement("div");
    div2.setAttribute('class',"product-body");
    let div3 = document.createElement("div");
    div3.setAttribute('class',"product-button-container");
    let image = document.createElement("img");
    image.setAttribute('class',"product-image")
    let title = document.createElement("h4");
    title.setAttribute('class',"product-title");
    let cost = document.createElement("p");
    cost.setAttribute('class',"product-cost");
    let rating = document.createElement("p");
    rating.setAttribute('class',"product-cost");
    let button1 = document.createElement("button");
    button1.addEventListener('click',()=>{placeOrder(item.productId)});
    button1.setAttribute('class',"product-button");
    button1.innerText = "BUY";
    let button2 = document.createElement("button");
    button2.setAttribute('class',"product-button");
    button2.innerText = "DELETE"
    button2.addEventListener('click',()=>{deleteItem(item.cartId)})
    image.src = item.imageUrl;
    title.innerText = item.title;
    cost.innerText = "price:  $".concat(item.price);
    rating.innerText = "reviews: ".concat(item.reviews);
    //items.description;
    div3.append(button1,button2);
    div2.append(title,cost,rating,div3);
    div1.append(image);
    div.append(div1,div2);
    cart.append(div);
    })
}

function showError(message){
    cart.innerHTML="";
    let div = document.createElement("div");
    div.setAttribute('class',"error-display");
    let title = document.createElement("h3");
    title.innerText = message;
    div.append(title);
    cart.append(div);
}

function placeOrder(id){
    localStorage.setItem("orderId", JSON.stringify(id));
    window.open("../HTML/Checkout.html","_self");
}


 async function deleteItem(cartId){
    try{
        let response= await fetch(`http://localhost:8089/users/cart/delete/${cartId}`,{
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


getCartData();

function userLogOut(){
    localStorage.removeItem("userName");
    window.alert("Loged Out SUccessfully");
    window.location.replace("../HTML/Login.html");
}
