// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log('🛒 Корзина загружена:', cart);

// Обновить счётчик в шапке
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.textContent = `Корзина (${count})`;
    console.log('✅ Счётчик обновлён:', count);
  } else {
    console.error('❌ Не найдена кнопка корзины .cart-btn');
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
  
  alert(`✅ ${name} добавлен в корзину!`);
}

// Показать корзину
function showCart() {
  console.log(' Открываем корзину...', cart);
  
  if (cart.length === 0) {
    alert('🛒 Корзина пуста\n\nДобавьте товары из каталога!');
    return;
  }
  
  let total = 0;
  let itemsText = '🛒 ВАША КОРЗИНА:\n\n';
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemsText += `${index + 1}. ${item.name}\n   ${item.quantity} шт. × ${item.price} ₽ = ${itemTotal} ₽\n\n`;
  });
  
  itemsText += `━━━━━━━━━━━━━━\n`;
  itemsText += `💰 ИТОГО: ${total} ₽\n\n`;
  itemsText += `Оформить заказ?`;
  
  if (confirm(itemsText)) {
    showCheckoutForm(total);
  }
}

// Форма оформления заказа
function showCheckoutForm(total) {
  const name = prompt('Введите ваше имя:');
  if (!name) {
    alert('❌ Заказ отменён');
    return;
  }
  
  const phone = prompt('Введите телефон для связи:');
  if (!phone) {
    alert('❌ Заказ отменён');
    return;
  }
  
  const address = prompt('Адрес доставки:', '') || 'Не указан';
  
  // Формируем текст заказа
  let orderText = `🛒 НОВЫЙ ЗАКАЗ!\n\n`;
  orderText += ` Имя: ${name}\n`;
  orderText += `📱 Телефон: ${phone}\n`;
  orderText += `📍 Адрес: ${address}\n\n`;
  orderText += `📦 Товары:\n`;
  
  cart.forEach(item => {
    orderText += `- ${item.name} × ${item.quantity} = ${item.price * item.quantity} ₽\n`;
  });
  
  orderText += `\n💰 Итого: ${total} ₽`;
  
  alert(`✅ СПАСИБО ЗА ЗАКАЗ!\n\n${orderText}\n\n(Скоро заказы будут приходить в Telegram)`);
  
  // Очищаем корзину
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  alert('🎉 Заказ оформлен! Мы свяжемся с вами soon!');
}

// Делаем функции глобальными (доступными из HTML)
window.addToCart = addToCart;
window.showCart = showCart;

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 Страница загружена');
  updateCartCount();
  
  // Ищем кнопку корзины
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    console.log('✅ Кнопка корзины найдена');
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('🖱️ Клик по корзине');
      showCart();
    });
  } else {
    console.error('❌ Кнопка корзины не найдена!');
  }
  
  // Навешиваем обработчики на кнопки "В корзину"
  const addButtons = document.querySelectorAll('.add-btn');
  console.log(`🔘 Найдено кнопок "В корзину": ${addButtons.length}`);
  
  addButtons.forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
      console.log(`🖱️ Клик по кнопке ${index + 1}`);
      
      const card = this.closest('.product-card');
      if (!card) {
        console.error('❌ Не найден .product-card');
        return;
      }
      
      const nameElement = card.querySelector('.product-name');
      const priceElement = card.querySelector('.price');
      const imageElement = card.querySelector('.product-img');
      
      if (!nameElement || !priceElement) {
        console.error(' Не найдены элементы товара');
        return;
      }
      
      const id = nameElement.textContent;
      const name = nameElement.textContent;
      const priceText = priceElement.textContent;
      const price = parseInt(priceText.replace(/\D/g, '')); // Удаляем всё кроме цифр
      const image = imageElement ? imageElement.src : '';
      
      console.log(`🍓 Товар: ${name}, Цена: ${price} ₽`);
      addToCart(id, name, price, image);
    });
  });
});
