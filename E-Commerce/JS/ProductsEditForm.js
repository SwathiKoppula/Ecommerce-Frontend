
document.getElementById('categoryForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 
    await updateProduct();
});


  async function updateProduct(){
       let product_id= JSON.parse(localStorage.getItem("ProductToBeUpdated"));

       let updatedProduct={
           description: document.getElementById("description").value,
           price: document.getElementById("price").value,
           rating: document.getElementById("rating").value
    }
    try{
        let response= await fetch(`http://localhost:8089/Admin/products/update/${product_id}`,{
            method:"PATCH",
            body: JSON.stringify(updatedProduct),
            headers:{
                "Content-Type":"application/json"
            }

        })

        if(response.ok){
            window.alert("product updated");
            location.reload();
        }

    }
catch(error){
        console.log(error);
        window.alert("server error");
    }

    
}