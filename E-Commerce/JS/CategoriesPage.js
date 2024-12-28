import AdminNavbar from "./Adminnavbar.js"

let Navbar = document.getElementById("navbar");
Navbar.innerHTML= AdminNavbar();

document.getElementById('logout').addEventListener('click', AdminLogOut);

let tableBody = document.getElementById("table-body");
let body = document.querySelector("body");

 async function fetchData(){
    try{
        let response = await fetch("http://localhost:8089/Admin/categories");
          let data = await response.json();
         if(data.length>=1){
            appendData(data);
         }
         else{
            showError("NO CATEGORIES PRESENT");
         }
    }
    catch{
        showError("Sorry! Server Is Not Responding");
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
    data.map((element,ind)=>{
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let buttton = document.createElement("button");
        buttton.setAttribute('class',"admin-button");
        buttton.innerText = "DELETE";
        buttton.addEventListener("click",()=>{deleteCategory(element.id)})
        td1.innerText = element.categoryName;
        td2.append(buttton);
        tr.append(td1,td2);
        tableBody.append(tr);
    })

}

async function deleteCategory(categoryId){
    try{
        let response= await fetch(`http://localhost:8089/Admin/category/delete/${categoryId}`,{
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

function AdminLogOut(){
    window.alert("SUCCESSFULLY LOGED OUT");
    window.location.replace("../HTML/AdminLogin.html");
}

fetchData();