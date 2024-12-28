import navbar from "./Navbar.js";
import Footer from "./Footer.js";

let Navbar = document.getElementById("navbar");
Navbar.innerHTML=navbar();

document.getElementById('logout').addEventListener('click', userLogOut);

let username = JSON.parse(localStorage.getItem("userName"));

let foot = document.getElementById("footer");
foot.innerHTML= Footer();

// function checkLogin(){
//     let name = JSON.parse(localStorage.getItem("userName"));
//     if(name!=null||name!=""){
//         window.open("../HTML/Login.html","_self");
//     }
//     else{
//         window.location.assign("../HTML/Cart.html");
//     }
// }

function userLogOut(){
    localStorage.removeItem("userName");
    window.alert("Loged Out SUccessfully");
    window.location.replace("../HTML/Login.html");
}
