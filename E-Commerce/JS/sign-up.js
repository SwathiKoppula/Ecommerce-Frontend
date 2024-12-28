
document.getElementById('RegisterForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevents the form from reloading the page

    await openHomePage();
});

async function openHomePage(){
    if(document.getElementById("password").value===document.getElementById("checkPassword").value)
    {
        let Object = {
            username : document.getElementById("username").value,
            password: document.getElementById("password").value,
	        email:document.getElementById("email").value ,
	        Address: document.getElementById("Address").value,
	        mobileno:document.getElementById("mobileno").value
        } 
    console.log("before");
    try {
        const response = await fetch("http://localhost:8089/users/register", {
            method:"POST",
            body: JSON.stringify(Object),
            headers:{
                "Content-Type":"application/json",
            }
        })
        if(response.ok){
            localStorage.setItem("userName",JSON.stringify(Object.username));
            window.location.replace("../HTML/Home.html"); 
        }
    }
    catch{
        console.error("Error connecting to the backend:", error);
      document.getElementById("result").textContent = "An error occurred in server. Please try again.";
    }
}
  else{
    document.getElementById("result").textContent = "password and check password doesn't match check again";
  }
}