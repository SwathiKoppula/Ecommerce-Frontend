

document.getElementById('categoryForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevents the form from reloading the page

    await addCategory();
});

async function addCategory(){
    console.log("function called");
    let categoryName = document.getElementById("category").value;
    console.log(categoryName);
    try{
        let response= await fetch("http://localhost:8089/Admin/categories/add",{
            method:"POST",
            body: categoryName, 
            headers:{
                "Content-Type":"application/json"
            }
        })

        if(response.ok){
        window.alert("category added");
        }
    }
    catch(error){
        console.log(error);
    }
}