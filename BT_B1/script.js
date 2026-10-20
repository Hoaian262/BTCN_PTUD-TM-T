/* Demo interaction only: stores chosen size per product and updates a demo bag count.
   Production cart/checkout must connect to the site's actual cart or backend. */
(() => {
  const cartCount = document.querySelector('#cart-count');
  let count = 0;

  document.querySelectorAll('.product-card').forEach((card) => {
    const sizeButtons = [...card.querySelectorAll('.size-option')];
    const addButton = card.querySelector('.add-to-cart');
    const feedback = card.querySelector('.card-feedback');
    let selectedSize = '';

    sizeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        selectedSize = button.textContent.trim();
        sizeButtons.forEach((sizeButton) => {
          sizeButton.setAttribute('aria-pressed', String(sizeButton === button));
        });
        feedback.textContent = `Đã chọn size ${selectedSize}.`;
      });
    });

    addButton.addEventListener('click', () => {
      if (!selectedSize) {
        feedback.textContent = 'Vui lòng chọn size trước khi thêm vào giỏ.';
        feedback.style.color = '#9b3d2d';
        sizeButtons[0]?.focus();
        return;
      }
      count += 1;
      cartCount.textContent = String(count);
      feedback.style.color = '#286344';
      feedback.textContent = `${card.dataset.product} · size ${selectedSize} đã được thêm (demo).`;
    });
  });

  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menuToggle.textContent = expanded ? '☰' : '✕';
    // Demo: no full navigation drawer is implemented.
    menuToggle.setAttribute('aria-label', expanded ? 'Mở menu' : 'Đóng menu');
  });
})();
