
let pay = document.querySelector("#order-hyper-tag");

let username = JSON.parse(localStorage.getItem("userName"));

function getdata(){
    let id = JSON.parse(localStorage.getItem("orderId"));
    let userName = JSON.parse(localStorage.getItem("userName"));
    placeOrder(id,userName);
    localStorage.removeItem("orderId");
}

async function placeOrder(id, userName){
 try{
    let response= await fetch(`http://localhost:8089/users/placeOrder/${userName}/${id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        }

    })

    if(response.ok){
    window.location.replace("../HTML/SuccessfulPayment.html");
    }
    else{
        window.alert("Payment Unsuccessful");
    }

}
catch(error){
    showAlert("SOrry, Order Failed Try Again Later");
}
}

function showAlert(message){
    window.alert(message);
    window.open("_self");
}


function userLogOut(){
    localStorage.removeItem("userName");
    window.alert("Loged Out SUccessfully");
    window.location.replace("../HTML/Login.html");
}