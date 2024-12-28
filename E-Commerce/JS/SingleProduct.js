import navbar from "./Navbar.js";
import footer from "./Footer.js";

let Navbar = document.getElementById("navbar");
Navbar.innerHTML= navbar();

document.getElementById('logout').addEventListener('click', userLogOut);
document.getElementById('cartCheckLogin').addEventListener('click', checkLogin);

let foot = document.getElementById("footer");
foot.innerHTML= footer();

let body = document.querySelector("body");

let product = document.getElementById("single-productlist");

let username = JSON.parse(localStorage.getItem("userName"));


function showSingleProduct(){
    let id = JSON.parse(localStorage.getItem("productId"));
    localStorage.removeItem("productId");
    getProductData(id);
}

showSingleProduct();

 async function getProductData(id){

    try{
        let response = await fetch(`https://fakestoreapi.com/products/${id}`);
          let data = await response.json();
            appendData(data);
    }
    catch(e){
        showError("SERVER NOT RESPONDING");
    }
}

 function showError(msg){
    let div = document.createElement("div");
    div.setAttribute('class',"error-display");
    let title = document.createElement("h3");
    title.innerText = msg;
    div.append(title);
    body.append(div);
}

function appendData(data){
    
    let div1 = document.createElement("div");
    div1.setAttribute('class',"single-product");
    let div2 = document.createElement("div");
    div2.setAttribute('class',"img-container");
    let div3 = document.createElement("div");
    div3.setAttribute('class',"product-button-container");
    let div4 = document.createElement("div");
    div4.setAttribute('class',"product-body");
    let image = document.createElement("img");
    image.setAttribute('class',"single-product-image");
    image.setAttribute('alt',"image");
    let title = document.createElement("h3");
    title.setAttribute('class',"product-title");
    let description = document.createElement("p");
    description.setAttribute('class',"product-info");
    let cost = document.createElement("p");
    cost.setAttribute('class',"product-cost")
    let rating = document.createElement("p");
    rating.setAttribute('class',"product-rating")
    let button1 = document.createElement("button");
    button1.setAttribute('class',"product-button");
    button1.innerText = "ADD TO CART";
    button1.addEventListener("click",()=>{checkLogin(data.id)});
    let button2 = document.createElement("button");
    button2.setAttribute('class',"product-button");
    let a = document.createElement("a");
    a.href = "../HTML/Home.html";
    a.innerText = "BACK";
    button2.append(a);
    image.src = data.image;
    title.innerText = data.title;
    description.innerText = data.description;
    cost.innerText = "price:  $".concat(data.price);
    rating.innerText = "rating: ".concat(data.rating.rate);
    div2.append(image);
    div3.append(button1,button2);
    div4.append(title,description,cost,rating,div3);
    div1.append(div2,div4);
    product.append(div1);
}

function checkLogin(productId){
    let name = JSON.parse(localStorage.getItem("userName"));
    if(!JSON.parse(localStorage.getItem("userName"))){
        window.open("../HTML/Login.html","_self");
    }
    else{
        addProductToCart(productId);
    }
}

 async function addProductToCart(productId){
    let username = JSON.parse(localStorage.getItem("userName"));
        try{
            let response= await fetch(`http://localhost:8089/users/cart/${username}/${productId}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.ok){
            window.alert("Product Added to cart");
            }
            else{
                window.alert("product already exists in cart");
            }
        }
        catch(error){
            console.log(error);
            window.alert("error, try again");
        }
    }

function userLogOut(){
    localStorage.removeItem("userName");
    window.alert("Loged Out SUccessfully");
    window.location.replace("../HTML/Login.html");
}