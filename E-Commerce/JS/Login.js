

document.getElementById('myForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevents the form from reloading the page

    await loginRequest();
});


async function loginRequest(){ 

    let Object = {
        username : document.getElementById("username").value,
        password: document.getElementById("password").value
    }
    console.log("before");
    try {
        const response = await fetch("http://localhost:8089/users/login", {
            method:"POST",
            body: JSON.stringify(Object),
            headers:{
                "Content-Type":"application/json",
            }
        })
        if(response.ok){

        }
        if (response.ok) {
            const data = await response.text(); // Read the response as plain text
            console.log(data);
            if (data!="Wrong Credentials Check Again"||data!="Server Error"){
                localStorage.setItem("userName",JSON.stringify(data));  
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
      document.getElementById("result").textContent = "An error occurred in server. Please try again.";
    }
}








