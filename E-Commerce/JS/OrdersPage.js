import AdminNavbar from "./Adminnavbar.js"

let Navbar = document.getElementById("navbar");
Navbar.innerHTML= AdminNavbar();

document.getElementById('logout').addEventListener('click', AdminLogOut);

let tableBody = document.getElementById("table-body");
let body = document.querySelector("body");

 async function fetchData(){
    try{
        let response = await fetch("http://localhost:8089/Admin/orders/all");
          let data = await response.json();
         if(data.length>=1){
            console.log(data);
            appendData(data);
         }
         else{
            showError("NO ORDERS PRESENT");
         }
    }
    catch{
        showError("Sorry! Server Is Not Responding");
    }
}

fetchData();

function showError(msg){
    let div = document.createElement("div");
    div.setAttribute('class',"error-display");
    let title = document.createElement("h3");
    title.innerText = msg;
    div.append(title);
    body.append(div);
}

function appendData(data){
    data.map((element,ind)=>{
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");
        let button = document.createElement("button");
        button.setAttribute('class',"admin-button");
        button.addEventListener("click", ()=>{deleteParticularOrder(element.orderId)});
        button.innerText = "DELETE";
        td1.innerText = element.orderId;
        td2.innerText = element.productName;
        td3.innerText = element.productId;
        td4.innerText = element.status;
        td5.innerText = element.deliveryDate;
        td6.innerText = element.orderedDate;
        if(element.status == "Shipped" || element.status == "Delivered"){
            td7.innerText = "";
        }
        else{
            td7.append(button);
        }
        tr.append(td1,td2,td3,td4,td5,td6,td7);
        tableBody.append(tr);
    })

}

async function deleteParticularOrder(id){
    let username = JSON.parse(localStorage.getItem("userName"));
    try{
        let response= await fetch(`http://localhost:8089/Admin/orders/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }

        })
        if(response.ok){
            location.reload();
        }
        else{
            window.alert("Not Deleted Try Again");
        }
    }
catch(error){
    showError(error);
    }
}

function AdminLogOut(){
    window.alert("SUCCESSFULLY LOGED OUT");
    window.location.replace("../HTML/AdminLogin.html");
}