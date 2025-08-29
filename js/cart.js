async function loadCart() {
  const res = await fetch('products.json');
  const products = await res.json();

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(id => {
    const product = products.find(p => p.id === id);
    if (product) {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      `;
      container.appendChild(div);
    }
  });
}

loadCart();
