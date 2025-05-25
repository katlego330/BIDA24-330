// Header Full Curtain Navigation Finction (Activation & Deactivations)
function activateNav() {
  // document.getElementById("nav").style.height = "100%";
  document.getElementById("nav").style.display = "block";
}

function deactivateNav() {
  // document.getElementById("nav").style.height = "0%";
  document.getElementById("nav").style.display = "none";
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    deactivateNav();
    // Let the browser follow the link normally
  });
});

// Menu with Search Functionalities
const cart = [];

function addToCart(cartName, price) {
  const existing = cart.find((i) => i.cartName === cartName);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ cartName, price, qty: 1 });
  }
  renderCart();
}

function changeQty(cartName, delta) {
  const item = cart.find((i) => i.cartName === cartName);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
  renderCart();
}

function renderCart() {
  const cartEl = document.getElementById("cart");
  const totalEl = document.getElementById("total");
  cartEl.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.cartName} - P${(item.price * item.qty).toFixed(2)}
      <div class="price-controller">
      <span class="btn" onclick="changeQty('${item.cartName}', -1)">−</span>
      <span>${item.qty}</span>
      <span class="btn" onclick="changeQty('${item.cartName}', 1)">+</span>
      </div>
    `;
    cartEl.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

function sendCheckoutToWhatsApp() {
  if (cart.length === 0) return alert("Cart is empty.");
  const order = cart
    .map(
      (item) =>
        `${item.cartName} x${item.qty} - P${(item.price * item.qty).toFixed(2)}`
    )
    .join("\n");
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);
  const message = `📦 *Order Details:*\n${order}\n\n💰 *Total:* P${total}`;
  const phone = "26777653879";
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
}

// Search Bar Functionality
function fuzzyMatch(query, text) {
  query = query.toLowerCase();
  text = text.toLowerCase();
  let queryIndex = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === query[queryIndex]) {
      queryIndex++;
    }
    if (queryIndex === query.length) return true;
  }
  return false;
}

function filterMenuItems() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const items = document.querySelectorAll(".menu-item");
  const details = document.querySelectorAll("details");
  const suggestions = document.getElementById("suggestions");

  suggestions.innerHTML = ""; // Clear suggestions

  let matchFound = false;

  details.forEach((detail) => {
    const menuItems = detail.querySelectorAll(".menu-item");
    let sectionHasMatch = false;

    menuItems.forEach((item) => {
      const name = item.dataset.name.toLowerCase();
      const match = fuzzyMatch(query, name);

      item.style.display = match || query === "" ? "block" : "none";

      if (match && query !== "") {
        sectionHasMatch = true;
        matchFound = true;

        // Create suggestion dropdown
        const li = document.createElement("li");
        li.textContent = item.dataset.name;
        li.onclick = () => {
          document.getElementById("search-bar").value = item.dataset.name;
          suggestions.innerHTML = "";
          filterMenuItems(); // Rerun to update UI
        };
        suggestions.appendChild(li);
      }
    });

    // Expand matching section, collapse others
    detail.open = sectionHasMatch || query === "";
  });
}

// Close suggestions on outside click
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-search")) {
    document.getElementById("suggestions").innerHTML = "";
  }
});

// Form Forwarding for Reservation
function sendReservationToWhatsApp() {
  let reservationName = document.getElementById("name").value;
  let email = document.getElementById("mail").value;
  let tel = document.getElementById("tel").value;
  let guests = document.getElementById("guests").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let msg = document.getElementById("msg-box").value;

  let message = `📦 *New Reservation!*
  👤 *Name:* ${reservationName}
  📧 *Email:* ${email}
  📞 *Phone:* ${tel}
  👥 *Guests:* ${guests}
  📅 *Date:* ${date}, ${time}
  📝 *Special Requests:* ${msg}`;

  let whatsappNumber = "26774463513";
  let whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappURL, "_blank");
}

// Form Forwarding for Contacts
function sendContactsToWhatsApp() {
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let mail = document.getElementById("contactEmail").value;
  let tele = document.getElementById("telephone").value;
  let contactMsg = document.getElementById("contactMsg-box").value;

  let message = `📦 *New Reservation!*
  👤 *Name:* ${fname} ${lname}
  📧 *Email:* ${mail}
  📞 *Phone:* ${tele}
  📝 *Special Requests:* ${contactMsg}`;

  let whatsappNumber = "26774463513";
  let whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappURL, "_blank");
}
