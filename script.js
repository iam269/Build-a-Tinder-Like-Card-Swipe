const cards = document.querySelectorAll('.card');
let isDragging = false;
let startX, startY, currentX, currentY;
let card = cards[0]; // Top card

if (card) {
    card.addEventListener('mousedown', startDrag);
    card.addEventListener('touchstart', startDrag, { passive: false });
}

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
    startY = e.clientY || e.touches[0].clientY;
    card.style.transition = 'none';
    e.preventDefault();
}

function drag(e) {
    if (!isDragging) return;
    currentX = e.clientX || e.touches[0].clientX;
    currentY = e.clientY || e.touches[0].clientY;
    let deltaX = currentX - startX;
    let deltaY = currentY - startY;
    let rotate = deltaX * 0.1;
    card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotate}deg)`;
    e.preventDefault();
}

function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    let deltaX = currentX - startX;
    if (deltaX > 100) {
        // Like
        card.classList.add('like');
        setTimeout(() => {
            card.remove();
            updateCards();
        }, 300);
    } else if (deltaX < -100) {
        // Dislike
        card.classList.add('dislike');
        setTimeout(() => {
            card.remove();
            updateCards();
        }, 300);
    } else {
        // Reset
        card.style.transform = '';
    }
}

function updateCards() {
    const newCards = document.querySelectorAll('.card');
    if (newCards.length > 0) {
        card = newCards[0];
        card.addEventListener('mousedown', startDrag);
        card.addEventListener('touchstart', startDrag, { passive: false });
    }
}