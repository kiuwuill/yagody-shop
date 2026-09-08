// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновить счётчик в шапке
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.textContent = `Корзина (${count})`;
  }
}

// Добавить товар в корзину
function addToCart(id, name, price, image) {
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  // Анимация кнопки
  alert(`✅ ${name} добавлен в корзину!`);
}

// Показать корзину
function showCart() {
  if (cart.length === 0) {
    alert('Корзина пуста 🛒');
    return;
  }
  
  let total = 0;
  let itemsText = '🛒 Ваша корзина:\n\n';
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemsText += `${item.name} × ${item.quantity} = ${itemTotal} ₽\n`;
  });
  
  itemsText += `\n💰 Итого: ${total} ₽\n\n`;
  itemsText += 'Оформить заказ? (Пока просто покажем форму)';
  
  if (confirm(itemsText)) {
    showCheckoutForm(total);
  }
}

// Форма оформления заказа
function showCheckoutForm(total) {
  const name = prompt('Введите ваше имя:');
  if (!name) return;
  
  const phone = prompt('Введите телефон для связи:');
  if (!phone) return;
  
  const address = prompt('Адрес доставки:');
  
  // Здесь потом будет отправка в Telegram
  alert(`✅ Спасибо, ${name}! \nЗаказ на сумму ${total} ₽ принят.\nМы свяжемся с вами по телефону ${phone}.\n\n(Пока это демо - настоящая отправка будет через пару шагов)`);
  
  // Очистить корзину
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  
  // Навешиваем обработчики на кнопки "В корзину"
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.product-card');
      const id = card.querySelector('.product-name').textContent;
      const name = card.querySelector('.product-name').textContent;
      const price = parseInt(card.querySelector('.price').textContent);
      const image = card.querySelector('.product-img').src;
      
      addToCart(id, name, price, image);
    });
  });
  
  // Кнопка корзины в шапке
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showCart();
    });
  }
});
