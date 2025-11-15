document.addEventListener("DOMContentLoaded",()=>{
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderItems = document.getElementById("orderItems");
  let total = 0;

  cart.forEach(item=>{
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity} - ₹${(item.price*item.quantity).toLocaleString()}`;
    orderItems.appendChild(li);
    total += item.price*item.quantity;
  });

  document.getElementById("orderTotal").innerText = "Total: ₹" + total.toLocaleString();

  // Place order & generate invoice
  document.getElementById("placeOrder").addEventListener("click", ()=>{
    const payment = document.getElementById("paymentMethod").value;
    const now = new Date();
    const orderId = "SS"+now.getTime();
    const order = {id:orderId, cart, total, payment, date: now.toLocaleString()};

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cart");

    // Generate bill content
    let billContent = `🛒 ShopSmart Invoice\n\nInvoice No: ${orderId}\nDate: ${order.date}\n\nItems:\n`;
    cart.forEach(item=>{
      billContent += `${item.name} x ${item.quantity} - ₹${(item.price*item.quantity).toLocaleString()}\n`;
    });
    billContent += `\nTotal: ₹${total.toLocaleString()}\nPayment Method: ${payment}`;

    // Save invoice in localStorage for order-confirm page
    localStorage.setItem("lastInvoice", billContent);

    // Redirect to order confirmation
    window.location.href = "order-confirm.html";
  });
});
