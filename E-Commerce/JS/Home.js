import navbar from "./Navbar.js";
import footer from "./Footer.js";

let Navbar = document.getElementById("navbar");
Navbar.innerHTML= navbar();

document.getElementById('logout').addEventListener('click', userLogOut);
document.getElementById('cartCheckLogin').addEventListener('click', checkLogin);

let foot = document.getElementById("footer");
foot.innerHTML= footer();

let productList = document.getElementById("productslist");
let body = document.querySelector("body");

let username = JSON.parse(localStorage.getItem("userName"));

let storeData;


function sliderShow(){

    const arr = [
        "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      ];

      let div= document.getElementById("carousel");
    //   div.setAttribute('class',"c-slidShow")
      let img= document.createElement("img");
      img.setAttribute('class',"c-image");

      img.src=arr[0];
      div.append(img);

      let i=0
      setInterval(function(){
        if(i===3){
            i=0;
        }
        img.src= arr[i];
        i=i+1

      },3000)

  }
  sliderShow();


async function getProducts(){
    try{
        let response = await fetch("https://fakestoreapi.com/products");
          let data = await response.json();
          storeData=data;
         if(data.length>=1){
            appendingData(data);
         }
    }
    catch{
        showError("Sorry! Server Is Not Responding");
    }
}

function appendingData(data){
   data.map((item,ind)=>{
    let div = document.createElement("div");
    div.setAttribute('class',"product");
    div.addEventListener("click", ()=>{showProduct(item.id)});
    let image = document.createElement("img");
    image.setAttribute('class',"product-image")
    let title = document.createElement("h4");
    title.setAttribute('class',"product-title");
    let info = document.createElement("p");
    info.setAttribute('class',"product-description");
    let cost = document.createElement("p");
    cost.setAttribute('class',"product-cost");
    let rating = document.createElement("p");
     image.src = item.image;
     title.innerText = item.title;
     info.innerText = item.category;
     cost.innerText = "price:  $".concat(item.price);
     rating.innerText = "rating: ".concat(item.rating.rate);
     div.append(image, title, info, cost, rating);
     productList.append(div);
   })
}

function showError(msg){
    let div = document.createElement("div");
    div.setAttribute('class',"error-display");
    let title = document.createElement("h3");
    title.innerText = msg;
    div.append(title);
    body.append(div);
}

function showProduct(id){
    localStorage.setItem("productId", JSON.stringify(id));
    window.open("../HTML/SingleProduct.html","_self");
}

function LowToHigh() {
    let sortedData= storeData.sort(function(a,b){
     return(
         a.price- b.price
     )
     })
     // console.log(sortedData);
     appendingData(sortedData);
}

function HighToLow() {
    let sortedData= storeData.sort(function(a,b){
     return(
             b.price- a.price
     )
     })
     // console.log(sortedData);
     appendingData(sortedData);
}

function filterFunction(){
    let inputValue= document.querySelector("#filterinputValue").value;
   

    let filteredData= storeData.filter(function(element){
        return element.title.toLowerCase().includes(inputValue.toLowerCase());
    });
    
    appendingData(filteredData);
}

getProducts();
 
function userLogOut(){
    localStorage.removeItem("userName");
    window.alert("Loged Out SUccessfully");
    window.location.replace("../HTML/Login.html");
}
 

function checkLogin(){
    let name = JSON.parse(localStorage.getItem("userName"));
    if(!JSON.parse(localStorage.getItem("userName"))){
        window.open("../HTML/Login.html","_self");
    }
    else{
        window.open("../HTML/Cart.html");
    }
}

// let container= document.querySelector("#container");

// async  function fetchingData(){
// try{
// let response= await fetch("https://fakestoreapi.com/products");

// let data= await response.json() //json-->object
// // console.log(data);
// appendData(data);
// }
// catch(e){
// console.log("error:",e);
// }
    
// }

// fetchingData();


// function appendData(data){

// data.forEach(function(element, index){
//     // let posterName= element.title;
//     // let posterImage= element.image;
//     // let posterPrice= element.price;

// //de-structing
// let {title,image, price} = element;

 
//         let parent= document.createElement("div");
//         let img= document.createElement("img");
//         img.src=image;

//         let posterName= document.createElement("p");
//         posterName.innerText=title;

//         let posterPrice= document.createElement("p");
//         posterPrice.innerText=price;

//         parent.append(img,posterName,posterPrice);
//         container.append(parent);

// })

// }
