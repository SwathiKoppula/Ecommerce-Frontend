

document.getElementById('myForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevents the form from reloading the page

    await login();
});

async function login(){
    let Object = {
        username : document.getElementById("username").value,
        password: document.getElementById("password").value
    }

    try {
        const response = await fetch("http://localhost:8089/Admin/login", {
            method:"POST",
            body: JSON.stringify(Object), // Automatically handles encoding for POST
            headers:{
                "Content-Type":"application/json"
            }
        })
        if (response.ok) {
            const data = await response.text(); // Read the response as plain text
            console.log(data);
            if (data==="Athunticate"){
                window.open("../HTMl/AdminHome.html","_self"); 
            }
            else{
                document.getElementById("result").textContent = "Wrong Credentials Check Again. Please try again"
              } 
        } else {
            console.error('Error:', response.statusText);
        }
    }
     catch (error) {
      console.error("Error connecting to the backend:", error);
      document.getElementById("result").textContent = "An error occurred. Please try again.";
    }
}