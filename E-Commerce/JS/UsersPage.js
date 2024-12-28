import AdminNavbar from "./Adminnavbar.js"

let Navbar = document.getElementById("navbar");
Navbar.innerHTML= AdminNavbar();

document.getElementById('logout').addEventListener('click', AdminLogOut);

let tableBody = document.getElementById("table-body");
let body = document.querySelector("body");

 async function fetchData(){
    try{
        let response = await fetch("http://localhost:8089/Admin/users/all");
          let data = await response.json();
         if(data.length>=1){
            appendData(data);
         }
         else{
            showError("NO USERS PRESENT");
         }
    }
    catch{
        showError("Sorry! Server Is Not Responding");
    }
}

fetchData();

function showError(msg){
    tableBody.innerHTML = "";
    let div = document.createElement("div");
    div.setAttribute('class',"error-display");
    let title = document.createElement("h3");
    title.innerText = msg;
    div.append(title);
    body.append(div);
}

function appendData(data){
    tableBody.innerHTML = "";
    data.map((element,ind)=>{
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let buttton = document.createElement("button");
        buttton.setAttribute('class',"admin-button");
        buttton.innerText = "DELETE";
        buttton.addEventListener("click",()=>{deleteUser(element.id)})
        td1.innerText = element.username;
        td2.innerText = element.email;
        td3.innerText = element.mobileNo;
        td4.innerText = element.address;
        td5 = buttton;
        tr.append(td1,td2,td3,td4,td5);
        tableBody.append(tr);
    })

}

async function deleteUser(id){
    try{
        let response= await fetch(`http://localhost:8089/Admin/users/${id}`,{
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
    showError("Sorry! Server Is Not Responding");
    }
}

function AdminLogOut(){
    window.alert("SUCCESSFULLY LOGED OUT");
    window.location.replace("../HTML/AdminLogin.html");
}