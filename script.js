document.addEventListener('DOMContentLoaded',()=>{
    // we need to create products here only
    const products = [
        {id: 1,name: "Product 1",price: 29.99},
        {id: 1,name: "Product 1",price: 19.99},
        {id: 1,name: "Product 1",price: 59.99},
    ];
    const cart = [] // we will keep pushing these objects in our cart array
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    // now we need to render these products in our dom
    products.forEach(product=>{
        // now we will create a product div and inject text content into it
       const productDiv = document.createElement('div');
       productDiv.classList.add('product')
       productDiv.innerHTML=`
       <span>${product.name} - $${product.price.toFixed(2)}</span> 
       <button data-id="${product.id}">Add to Cart</button>
       `
       // now we will append this productDiv in productList 
       productList.appendChild(productDiv);
    });

       // now we will add event listener to this product list means if a user click on add to cart of any product in this product list 
       productList.addEventListener('click',(e)=>{
        // we dont want that if user clicked on anything but we want that function should be performed when clicked on button
        if(e.target.tagName === 'BUTTON'){
            // where event is triggering i will get its attribute
           const productId = parseInt(e.target.getAttribute('data-id')) // we need to make it an integer becuase it is string currently
           // now we will find that element 
           const product = products.find(p=>p.id===productId) // means this is the only element i need to return
           // now we need to do add to cart to that product
           addToCart(product) // now we need to create this method
        }
       });
       function addToCart(product){
        cart.push(product)
        renderCart(cart)
       }
       // now we need to render this on the cart page
       function renderCart(){
        cartItems.innerHTML = "" // now if i click on any item that empty message will go away
        let totalPrice = 0;
        if(cart.length>0){
            emptyCartMessage.classList.add("hidden")
            cartTotalMessage.classList.remove("hidden")
            cart.forEach((item,index)=>{
                totalPrice+=item.price
               const cartItem = document.createElement('div') // for displaying items on cart page
               cartItem.innerHTML = `
               ${item.name} - $${item.price.toFixed(2)}
               `
               // now we will append in cartItems
               cartItems.appendChild(cartItem)
               // now also want to display totalPrice
               totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`
            })
        } else{
            emptyCartMessage.classList.remove("hidden")
            totalPriceDisplay.textContent = `$0.00`
        }
       }
       // now we need to mainpulate checkOut btn
       checkOutBtn.addEventListener('click',()=>{
        cart.length = 0;
        alert("Checked Out Successfully")
        renderCart()
       })
});