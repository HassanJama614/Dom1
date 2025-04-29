document.addEventListener('DOMContentLoaded', () => {
    const totalPriceElement = document.querySelector('.total');
    const listProductsElement = document.querySelector('.list-products');
    const productCards = document.querySelectorAll('.card');
  
    let total = 0;
    const cart = {}; 
  
    
    productCards.forEach(card => {
      const productName = card.querySelector('.card-title').textContent;
      const unitPrice = parseFloat(card.querySelector('.unit-price').textContent.replace('$', '').trim());
      const quantityElement = card.querySelector('.quantity');
      const initialQuantity = parseInt(quantityElement.textContent);
  
      if (initialQuantity > 0) {
        cart[productName] = { price: unitPrice, quantity: initialQuantity };
        total += unitPrice * initialQuantity;
      }
    });
    updateTotalPrice();
  
    function updateTotalPrice() {
      totalPriceElement.textContent = `${total.toFixed(2)} $`;
    }
  
    function updateProductDisplay(productCard, quantity) {
      const quantitySpan = productCard.querySelector('.quantity');
      quantitySpan.textContent = quantity;
    }
  
    listProductsElement.addEventListener('click', (event) => {
      const target = event.target;
      const productCard = target.closest('.card');
  
      if (productCard) {
        const productName = productCard.querySelector('.card-title').textContent;
        const unitPrice = parseFloat(productCard.querySelector('.unit-price').textContent.replace('$', '').trim());
  
        if (target.classList.contains('fa-plus-circle')) {
          cart[productName] = cart[productName] || { price: unitPrice, quantity: 0 };
          cart[productName].quantity++;
          total += unitPrice;
          updateTotalPrice();
          updateProductDisplay(productCard, cart[productName].quantity);
        } else if (target.classList.contains('fa-minus-circle')) {
          if (cart[productName] && cart[productName].quantity > 0) {
            cart[productName].quantity--;
            total -= unitPrice;
            updateTotalPrice();
            updateProductDisplay(productCard, cart[productName].quantity);
            if (cart[productName].quantity === 0) {
              delete cart[productName];
            }
          }
        } else if (target.classList.contains('fa-trash-alt')) {
          const quantityToRemove = cart[productName] ? cart[productName].quantity : 0;
          total -= quantityToRemove * unitPrice;
          delete cart[productName];
          updateTotalPrice();
          productCard.remove();
        } else if (target.classList.contains('fa-heart')) {
          target.classList.toggle('fas');
          target.classList.toggle('far');
          target.classList.toggle('fa-heart');
          
        }
      }
    });
  });