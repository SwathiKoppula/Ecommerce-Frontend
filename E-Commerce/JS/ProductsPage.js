import AdminNavbar from "./Adminnavbar.js"

let Navbar = document.getElementById("navbar");
Navbar.innerHTML= AdminNavbar();

document.getElementById('logout').addEventListener('click', AdminLogOut);

let tableBody = document.getElementById("table-body");
let body = document.querySelector("body");

 async function fetchData(){
    try{
        let response = await fetch("http://localhost:8089/Admin/products/all");
        let data = await response.json();
        if(data.length>=1){
            appendData(data);
          }
          else{
            // appendSingleData(data);
            //  arr.push(data);
            //  appendData(arr);
            showError("no products present");
          }
    }
    catch(e){
        showError("Sorry! Server Is Not Responding");
        console.log(e);
    }
}

fetchData();

function appendData(data){
    data.map((element,ind)=>{
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");
        let button = document.createElement("button");
        button.setAttribute('class',"admin-button");
        button.innerText = "DELETE";
        button.addEventListener("click",()=>{deleteProduct(element.id)})
        let editButton = document.createElement("button");
        editButton.innerText = "EDIT";
        editButton.setAttribute('class',"admin-button");
        editButton.addEventListener("click",()=>{editProduct(element.id)})
        td1.innerText = element.title;
        td2.innerText = element.imageUrl;
        td3.innerText = element.category.categoryName;
        td4.innerText = element.price;
        td6.append(button);
        td7.append(editButton);
        tr.append(td1,td2,td3,td4,td6,td7);
        tableBody.append(tr);
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

async function deleteProduct(id){
    try{
        let response= await fetch(`http://localhost:8089/Admin/product/${id}`,{
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

function editProduct(id){
     localStorage.setItem("ProductToBeUpdated",JSON.stringify(id));
      window.open("../HTML/ProductEditForm.html","_self");
}

function AdminLogOut(){
    window.alert("SUCCESSFULLY LOGED OUT");
    window.location.replace("../HTML/AdminLogin.html");
}