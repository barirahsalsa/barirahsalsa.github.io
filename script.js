
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Load price from local storage
    loadPrice();

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate burger button (simple rotation/cross)
            const spans = mobileBtn.querySelectorAll('span');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });
});

// Multiple Image Preview Function


// Function to handle Custom Order via WhatsApp
function orderCustom() {
    const budget = document.getElementById('custom-budget').value;
    const items = document.getElementById('custom-item').value;
    const cello = document.getElementById('custom-cello').value;
    const flower = document.getElementById('custom-flower').value;
    const msg = document.getElementById('custom-msg').value;

    let text = `Halo Lafiore Bouquet, saya ingin memesan Buket Custom.%0A%0A`;
    text += `Detail Pesanan:%0A`;
    text += `• Budget: ${budget || '-'} %0A`;
    text += `• Isian Barang: ${items || '-'} %0A`;
    text += `• Warna Cellophane: ${cello || '-'} %0A`;
    text += `• Warna Bunga: ${flower || '-'} %0A`;
    text += `• Ucapan: ${msg || '-'} %0A`;

    // WhatsApp Number
    const smartphone = "6283853069226";

    const url = `https://wa.me/${smartphone}?text=${text}`;

    window.open(url, '_blank');
}



// Function to handle Doll Order via WhatsApp
function orderDoll() {
    const type = document.getElementById('doll-type').value;
    const cello = document.getElementById('doll-cello').value;
    const flower = document.getElementById('doll-flower').value;
    const msg = document.getElementById('doll-msg').value;

    // Get selected radio button value
    const colorOptions = document.getElementsByName('doll-color');
    let color = 'Pink'; // Default
    for (let i = 0; i < colorOptions.length; i++) {
        if (colorOptions[i].checked) {
            color = colorOptions[i].value;
            break;
        }
    }

    let text = `Halo Lafiore Bouquet, saya ingin memesan Buket Boneka.%0A%0A`;
    text += `Detail Pesanan:%0A`;
    text += `• Jenis Boneka: ${type}%0A`;
    text += `• Warna Boneka: ${color}%0A`;
    text += `• Warna Cellophane: ${cello || '-'} %0A`;
    text += `• Warna Bunga: ${flower || '-'} %0A`;
    text += `• Ucapan: ${msg || '-'} %0A`;

    const smartphone = "6283853069226";
    const url = `https://wa.me/${smartphone}?text=${text}`;

    window.open(url, '_blank');
}

function orderFlower() {
    const cello = document.getElementById('flower-cello').value;
    const flower = document.getElementById('flower-color').value;
    const msg = document.getElementById('flower-msg').value;

    let text = `Halo Lafiore Bouquet, saya ingin memesan Buket Bunga.%0A%0A`;
    text += `Detail Pesanan:%0A`;
    text += `• Warna Cellophane: ${cello || '-'} %0A`;
    text += `• Warna Bunga: ${flower || '-'} %0A`;
    text += `• Ucapan: ${msg || '-'} %0A`;

    const smartphone = "6283853069226";
    const url = `https://wa.me/${smartphone}?text=${text}`;
    window.open(url, '_blank');
}

// Helper to toggle flower color input for Money Bouquet
function toggleMoneyFlower(show) {
    const input = document.getElementById('money-flower-color-group');
    if (show) {
        input.style.display = 'block';
    } else {
        input.style.display = 'none';
        document.getElementById('money-flower').value = '';
    }
}

function orderMoney() {
    const cello = document.getElementById('money-cello').value;
    const amount = document.getElementById('money-amount').value;
    const msg = document.getElementById('money-msg').value;

    // Get Flower Option
    const flowerOpt = document.querySelector('input[name="money-flower-opt"]:checked').value;
    const flowerColor = document.getElementById('money-flower').value;

    let text = `Halo Lafiore Bouquet, saya ingin memesan Buket Uang.%0A%0A`;
    text += `Detail Pesanan:%0A`;
    text += `• Warna Cellophane: ${cello || '-'} %0A`;
    text += `• Tambahan Bunga: ${flowerOpt} %0A`;
    if (flowerOpt === 'Ya') {
        text += `• Warna Bunga: ${flowerColor || '-'} %0A`;
    }
    text += `• Jumlah Lembaran: ${amount || '-'} %0A`;
    text += `• Ucapan: ${msg || '-'} %0A`;
    text += `(Mohon informasikan nominal uang via chat)%0A`;

    const smartphone = "6283853069226";
    const url = `https://wa.me/${smartphone}?text=${text}`;
    window.open(url, '_blank');
}

function orderSnack() {
    const cello = document.getElementById('snack-cello').value;
    const flower = document.getElementById('snack-flower').value;
    const msg = document.getElementById('snack-msg').value;

    let text = `Halo Lafiore Bouquet, saya ingin memesan Buket Jajan.%0A%0A`;
    text += `Detail Pesanan:%0A`;
    text += `• Warna Cellophane: ${cello || '-'} %0A`;
    text += `• Warna Bunga: ${flower || '-'} %0A`;
    text += `• Ucapan: ${msg || '-'} %0A`;

    const smartphone = "6283853069226";
    const url = `https://wa.me/${smartphone}?text=${text}`;
    window.open(url, '_blank');
}
