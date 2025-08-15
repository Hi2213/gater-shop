document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const cartBtn = document.querySelector('.cart');
    const paymentBtn = document.getElementById('payment-btn');
    const disputeBtn = document.getElementById('dispute-btn');
    
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const cartModal = document.getElementById('cart-modal');
    const paymentModal = document.getElementById('payment-modal');
    const disputeModal = document.getElementById('dispute-modal');
    
    const closeButtons = document.querySelectorAll('.close');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const checkoutForm = document.getElementById('checkout-form');
    const paymentForm = document.getElementById('payment-form');
    const disputeForm = document.getElementById('dispute-form');
    
    const usernameDisplay = document.getElementById('username-display');
    const balanceDisplay = document.getElementById('balance');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const accountsGrid = document.getElementById('accounts-grid');
    const scriptsGrid = document.getElementById('scripts-grid');
    
    // Состояние приложения
    let currentUser = null;
    let cart = [];
    let accounts = [];
    let scripts = [];
    
    // Инициализация данных
    function initData() {
        // Пример данных аккаунтов
        accounts = [
            {
                id: 1,
                title: "Аккаунт с 5кк",
                server: "Arizona RP 1",
                money: 5000000,
                price: 10,
                description: "Аккаунт с 5 миллионами игровой валюты",
                image: "img/account1.jpg"
            },
            {
                id: 2,
                title: "Аккаунт с 10кк",
                server: "Arizona RP 2",
                money: 10000000,
                price: 20,
                description: "Аккаунт с 10 миллионами игровой валюты",
                image: "img/account2.jpg"
            },
            // Добавьте больше аккаунтов по аналогии
        ];
        
        // Пример данных скриптов
        scripts = [
            {
                id: 101,
                title: "Скрипт для фарма",
                category: "Фарм",
                price: 15,
                description: "Автоматический фарм денег",
                image: "img/script1.jpg"
            },
            {
                id: 102,
                title: "Скрипт автодрифта",
                category: "Вождение",
                price: 20,
                description: "Идеальный дрифт на любом транспорте",
                image: "img/script2.jpg"
            },
            // Добавьте больше скриптов по аналогии
        ];
        
        renderAccounts();
        renderScripts();
    }
    
    // Рендер аккаунтов
    function renderAccounts() {
        accountsGrid.innerHTML = '';
        accounts.forEach(account => {
            const accountElement = document.createElement('div');
            accountElement.className = 'product-card';
            accountElement.innerHTML = `
                <div class="product-image" style="background-image: url(${account.image})"></div>
                <div class="product-info">
                    <h3>${account.title}</h3>
                    <div class="product-meta">
                        <span>Сервер: ${account.server}</span>
                        <span>${account.money.toLocaleString()} $</span>
                    </div>
                    <p>${account.description}</p>
                    <div class="product-price">${account.price} руб</div>
                    <button class="add-to-cart" data-id="${account.id}" data-type="account">Добавить в корзину</button>
                </div>
            `;
            accountsGrid.appendChild(accountElement);
        });
        
        // Добавляем обработчики для кнопок "Добавить в корзину"
        document.querySelectorAll('.add-to-cart[data-type="account"]').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
    
    // Рендер скриптов
    function renderScripts() {
        scriptsGrid.innerHTML = '';
        scripts.forEach(script => {
            const scriptElement = document.createElement('div');
            scriptElement.className = 'product-card';
            scriptElement.innerHTML = `
                <div class="product-image" style="background-image: url(${script.image})"></div>
                <div class="product-info">
                    <h3>${script.title}</h3>
                    <div class="product-meta">
                        <span>Категория: ${script.category}</span>
                    </div>
                    <p>${script.description}</p>
                    <div class="product-price">${script.price} руб</div>
                    <button class="add-to-cart" data-id="${script.id}" data-type="script">Добавить в корзину</button>
                </div>
            `;
            scriptsGrid.appendChild(scriptElement);
        });
        
        // Добавляем обработчики для кнопок "Добавить в корзину"
        document.querySelectorAll('.add-to-cart[data-type="script"]').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
    
    // Добавление в корзину
    function addToCart(e) {
        const id = parseInt(e.target.dataset.id);
        const type = e.target.dataset.type;
        
        let item;
        if (type === 'account') {
            item = accounts.find(acc => acc.id === id);
        } else {
            item = scripts.find(scr => scr.id === id);
        }
        
        if (item) {
            cart.push({
                ...item,
                type: type
            });
            updateCart();
            alert('Товар добавлен в корзину');
        }
    }
    
    // Обновление корзины
    function updateCart() {
        cartCount.textContent = cart.length;
        
        // Обновляем содержимое корзины в модальном окне
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    ${item.type === 'account' ? `<p>Сервер: ${item.server}</p>` : ''}
                </div>
                <div class="cart-item-price">${item.price} руб</div>
                <span class="cart-item-remove" data-index="${index}">&times;</span>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        cartTotalPrice.textContent = `${total} руб`;
        
        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }
    
    // Удаление из корзины
    function removeFromCart(e) {
        const index = parseInt(e.target.dataset.index);
        cart.splice(index, 1);
        updateCart();
    }
    
    // Логин пользователя
    function loginUser(username) {
        currentUser = {
            username: username,
            balance: 100 // Начальный баланс для примера
        };
        
        // Обновляем UI
        document.querySelectorAll('.auth a').forEach(el => el.classList.add('hidden'));
        document.querySelector('.user-profile').classList.remove('hidden');
        usernameDisplay.textContent = currentUser.username;
        balanceDisplay.textContent = `${currentUser.balance} руб`;
        
        // Закрываем модальное окно
        loginModal.style.display = 'none';
    }
    
    // Выход пользователя
    function logoutUser() {
        currentUser = null;
        cart = [];
        updateCart();
        
        // Обновляем UI
        document.querySelectorAll('.auth a').forEach(el => el.classList.remove('hidden'));
        document.querySelector('.user-profile').classList.add('hidden');
    }
    
    // Пополнение баланса
    function addBalance(amount) {
        if (currentUser) {
            currentUser.balance += amount;
            balanceDisplay.textContent = `${currentUser.balance} руб`;
            paymentModal.style.display = 'none';
            alert(`Баланс успешно пополнен на ${amount} руб`);
        }
    }
    
    // Оформление заказа
    function checkoutOrder(nickname, server) {
        if (!currentUser) {
            alert('Для оформления заказа необходимо войти в систему');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        
        if (currentUser.balance < total) {
            alert('Недостаточно средств на балансе');
            return;
        }
        
        // Списание средств
        currentUser.balance -= total;
        balanceDisplay.textContent = `${currentUser.balance} руб`;
        
        // Очистка корзины
        cart = [];
        updateCart();
        
        // Закрытие модального окна
        cartModal.style.display = 'none';
        
        // Сообщение об успешном заказе
        alert(`Заказ оформлен! Игровой ник: ${nickname}, Сервер: ${server}. Данные для входа будут отправлены вам на почту.`);
    }
    
    // Открытие спора
    function openDispute(orderId, description) {
        alert(`Спор #${orderId} открыт. Мы рассмотрим вашу проблему в ближайшее время.`);
        disputeModal.style.display = 'none';
    }
    
    // Обработчики событий
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
    
    registerBtn.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });
    
    logoutBtn.addEventListener('click', logoutUser);
    
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        loginUser(username);
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        loginUser(username);
    });
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nickname = this.querySelector('#game-nickname').value;
        const server = this.querySelector('#game-server').value;
        checkoutOrder(nickname, server);
    });
    
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const amount = parseInt(this.querySelector('input[type="number"]').value);
        addBalance(amount);
    });
    
    disputeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const orderId = this.querySelector('input[type="text"]').value;
        const description = this.querySelector('textarea').value;
        openDispute(orderId, description);
    });
    
    // Инициализация приложения
    initData();
});