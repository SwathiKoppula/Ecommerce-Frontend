document.getElementById('addProductForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevents the form from reloading the page

    await addProduct();
});

async function addProduct(){

    let object = {
        title : document.getElementById("title").value,
        price : document.getElementById("price").value,
        reviews : document.getElementById("reviews").value,
        description : document.getElementById("description").value,
        imageUrl : document.getElementById("imageUrl").value,
        category : document.getElementById("category").value
    }
    try {
        const response = await fetch("http://localhost:8089/Admin/product/add", {
            method:"POST",
            body: JSON.stringify(object),
            headers:{
                "Content-Type":"application/json",
            }
        })
        if(response.ok){
            window.alert("product add");
        }
        else{
            window.alert("product alredy exists");
        }
    }
    catch(error){
          console.log(error);
          window.alert("error");
    }
}

