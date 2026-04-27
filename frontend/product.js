async function openproduct() {
  document.getElementById("productforms").style.display = "flex";
}

async function closeproduct() {
  document.getElementById("productforms").style.display = "none";
}
//image preview
const proimg = document.getElementById("proimg");

const propreview = document.getElementById("propreview");
proimg.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    propreview.style.display = "block";
    propreview.src = URL.createObjectURL(file);
  }
});

// add variant
async function proreset() {
  document.getElementById("proimg").value = "";
  document.getElementById("proname").value = "";
  document.getElementById("proslug").value = "";
  document.getElementById("prodescrition").value = "";
  document.getElementById("proshort").value = "";
  document.getElementById("probrand").value = "";
  document.getElementById("promrp").value = "";
  document.getElementById("prodiscount").value = "";
  document.getElementById("proprice").value = "";
  document.getElementById("prostock").value = "";
  document.getElementById("status").value = "";
}
function addVariant() {
  const div = document.createElement("div");
  div.classList.add("variant-box");

  div.innerHTML = `
  <label>Image</label>
<input type="file" class="img">
    <input type="text" placeholder="Size" class="size" id='size'>
    <input type="text" placeholder="Color" class="color">
    <input type="number" placeholder="MRP" class="mrp" min="0">
    <input type="number" placeholder="Discount %" class="discount" min="0">
    <input type="number" placeholder="Price" class="price" readonly>
    <input type="number" placeholder="Stock" class="stock" min="0">
    <input type="text" placeholder="SKU" class="sku" readonly>
    <button type="button" onclick="this.parentElement.remove()">Remove</button>
  `;

  document.getElementById("variantContainer").appendChild(div);
}
// auto SLUg
document.getElementById("proname").addEventListener("input", function () {
  const slug = this.value
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  document.getElementById("proslug").value = slug;
});
// cancel product
function procCancel() {
  document.getElementById("productforms").style.display = "none";
  alert("Button clicked!");
  proreset();
  document.getElementById("variantContainer").innerHTML = "";
}
// total  price

document.addEventListener("DOMContentLoaded", function () {
  function calculatePrice() {
    const mrp = parseFloat(document.getElementById("promrp").value) || 0;
    const discount =
      parseFloat(document.getElementById("prodiscount").value) || 0;

    const price = mrp - (mrp * discount) / 100;

    document.getElementById("proprice").value = price.toFixed(2);
  }

  document.getElementById("promrp").addEventListener("input", calculatePrice);

  document
    .getElementById("prodiscount")
    .addEventListener("input", calculatePrice);

  // optional (best practice)
  document.getElementById("proprice").readOnly = true;
});
// auto total price or sku
function generateSKU(name, color, size) {
  const clean = (str) => str.toUpperCase().replace(/\s+/g, "").slice(0, 3);

  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${clean(name)}-${clean(color)}-${clean(size)}-${random}`;
}
// auto total price or sku
document.addEventListener("input", function (e) {
  const box = e.target.closest(".variant-box");
  if (!box) return;

  const mrp = parseFloat(box.querySelector(".mrp").value) || 0;
  const discount = parseFloat(box.querySelector(".discount").value) || 0;

  const price = mrp - (mrp * discount) / 100;
  box.querySelector(".price").value = price.toFixed(2);

  const name = document.getElementById("proname").value || "PROD";
  const color = box.querySelector(".color").value || "CLR";
  const size = box.querySelector(".size").value || "SZ";

  if (color && size) {
    box.querySelector(".sku").value = generateSKU(name, color, size);
  }
});
