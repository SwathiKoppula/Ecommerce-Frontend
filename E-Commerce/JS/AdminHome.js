import AdminNavbar from "./Adminnavbar.js"

let Navbar = document.getElementById("navbar");
Navbar.innerHTML= AdminNavbar();

document.getElementById('logout').addEventListener('click', AdminLogOut);

function AdminLogOut(){
    window.alert("SUCCESSFULLY LOGED OUT");
    window.location.replace("../HTML/AdminLogin.html");
}