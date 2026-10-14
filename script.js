// ==========================================
// CONFIGURAÇÃO DO VENDEDOR WHATSAPP (ANGOLA)
// ==========================================
const VENDEDOR_WHATSAPP = "244923000000"; 

// ==========================================
// CATÁLOGO DE PRODUTOS DESPORTIVOS
// ==========================================
const products = [
    {
        id: 1,
        title: "T-Shirt Desportiva Dry-Fit ST",
        category: "vestuario",
        price: 14500,
        desc: "Tecido ultraleve e respirável que repele o suor durante o treino.",
        icon: "fa-shirt", // <--- Adicionada a vírgula aqui
        image: "" // <--- Adicionado o caminho da imagem aqui
    },
    
    {
        id: 2,
        title: "Toalha Desportiva Seca Tudo (M)",
        category: "toalhas",
        price: 7500,
        desc: "Toalha de microfibra de alta absorção e secagem ultrarrápida para ginásio.",
        icon: "fa-mattress-pillow"
    },
    {
        id: 3,
        title: "Calções de Treino Pro Performance",
        category: "vestuario",
        price: 12000,
        desc: "Corte ergonómico com bolsos com fecho e máxima mobilidade.",
        icon: "fa-child-reaching"
    },
    {
        id: 4,
        title: "Toalha XL Seca Tudo Performance",
        category: "toalhas",
        price: 12500,
        desc: "Ideal para natação e treinos intensos ao ar livre. Absorve 5x o seu peso.",
        icon: "fa-rug"
    },
    {
        id: 5,
        title: "Saco de Desporto ST Pro 35L",
        category: "acessorios",
        price: 28000,
        desc: "Saco resistente à água com compartimento isolado para sapatilhas.",
        icon: "fa-bag-shopping"
    },
    {
        id: 6,
        title: "Garrafa Térmica Desportiva 1L",
        category: "acessorios",
        price: 9500,
        desc: "Aço inoxidável de parede dupla. Mantém a água gelada até 24 horas.",
        icon: "fa-bottle-water"
    }
];

let cart = [];

// ==========================================
// ELEMENTOS DO DOM
// ==========================================
const productGrid = document.getElementById('productGrid');
const cartToggle = document.getElementById('cartToggle');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutForm = document.getElementById('checkoutForm');
const filterBtns = document.querySelectorAll('.cat-btn');

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
});

// ==========================================
// FUNÇÕES DE PRODUTOS
// ==========================================
function renderProducts(productList) {
    productGrid.innerHTML = '';
    
    productList.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${prod.image}" alt="${prod.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${prod.title}</h3>
                <p class="product-desc">${prod.desc}</p>
                <div class="product-price">${prod.price.toLocaleString('pt-AO')} Kz</div>
                <button class="btn-add-cart" onclick="addToCart(${prod.id})">
                    <i class="fa-solid fa-plus"></i> Adicionar ao Carrinho
                </button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.dataset.filter;
        if (filter === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === filter);
            renderProducts(filtered);
        }
    });
});

// ==========================================
// FUNÇÕES DO CARRINHO DE COMPRAS
// ==========================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    openCart();
}

function updateQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCount.textContent = totalCount;

    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">O teu carrinho desportivo está vazio.</p>';
    } else {
        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-details">
                    <h5>${item.title}</h5>
                    <p>${item.price.toLocaleString('pt-AO')} Kz x ${item.qty}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="updateQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQty(${item.id}, 1)">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    const grandTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartTotal.textContent = `${grandTotal.toLocaleString('pt-AO')} Kz`;
}

function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
}

function setupEventListeners() {
    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Adiciona pelo menos um artigo desportivo antes de finalizar!');
            return;
        }

        const name = document.getElementById('custName').value;
        const phone = document.getElementById('custPhone').value;
        const province = document.getElementById('custProvince').value;
        const address = document.getElementById('custAddress').value;
        const payment = document.getElementById('custPayment').value;

        // Formatação da Mensagem de Encomenda para o WhatsApp
        let message = `*ENCOMENDA DESPORTIVA - SECA TUDO*\n`;
        message += `-----------------------------------\n`;
        message += `*Atleta/Cliente:* ${name}\n`;
        message += `*Telefone:* ${phone}\n`;
        message += `*Endereço:* ${address} (${province})\n`;
        message += `*Forma de Pagamento:* ${payment}\n`;
        message += `-----------------------------------\n`;
        message += `*ARTIGOS SELECIONADOS:*\n`;

        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            message += `• ${item.title} (x${item.qty}) - ${itemTotal.toLocaleString('pt-AO')} Kz\n`;
        });

        message += `-----------------------------------\n`;
        message += `*TOTAL DA ENCOMENDA:* ${total.toLocaleString('pt-AO')} Kz\n\n`;
        message += `Gostaria de confirmar o pedido do meu equipamento desportivo.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${VENDEDOR_WHATSAPP}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    });
}