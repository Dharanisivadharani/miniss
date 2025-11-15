// General JS for ShopSmart

// Add to Cart for all products
function addToCart(product){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(item => item.name === product.name);
  if(existing){
    existing.quantity += 1;
  } else {
    cart.push({...product, quantity:1});
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(product.name + " added to cart!");
}

// Update Navbar cart count
function updateCartCount(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartIcon = document.querySelectorAll(".user-icon.cart span");
  cartIcon.forEach(span => span.innerText = count);
}

// Profile button nav
function goProfile(){
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if(user){
    window.location.href = "profile.html";
  } else {
    window.location.href = "login.html";
  }
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
