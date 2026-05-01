let brandEditId = null;
let brandPage = 1;
const brandLimit = 5;
let brandSearch = "";
let brandStatusFilter = "";

const BRAND_API = "http://localhost:5000/api/brand";

async function loadBrands() {
  try {
    const url = `${BRAND_API}?page=${brandPage}&limit=${brandLimit}&search=${brandSearch}&status=${brandStatusFilter}`;
    const res = await fetch(url);
    const data = await res.json();
    renderBrandTable(data.data);
    renderBrandPagination(data.totalPages);
    loadBrandStats();
  } catch (e) {
    document.getElementById("brandTable").innerHTML = `<tr><td colspan="3">Server connect nahi ho raha</td></tr>`;
  }
}

async function loadBrandStats() {
  const res = await fetch(`${BRAND_API}?page=1&limit=1000`);
  const data = await res.json();
  const all = data.data || [];
  document.getElementById("brandStatTotal").innerText = data.totalItems || all.length;
  document.getElementById("brandStatActive").innerText = all.filter(b => b.status === "active").length;
  document.getElementById("brandStatInactive").innerText = all.filter(b => b.status === "inactive").length;
}

function renderBrandTable(list) {
  const tbody = document.getElementById("brandTable");
  if (!list || list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:2rem;color:gray">No brands found</td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(b => {
    const brandArr = Array.isArray(b.Brands) ? b.Brands.join(", ") : (b.Brands || "-");
    return `
      <tr>
        <td>${brandArr}</td>
        <td><span class="${b.status === "active" ? "active" : "inactive"}">${b.status}</span></td>
        <td>
          <button onclick="editBrandItem('${b._id}')">✏️</button>
          <button onclick="deleteBrand('${b._id}')">🗑️</button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderBrandPagination(totalPages) {
  const el = document.getElementById("brandPagination");
  if (!totalPages || totalPages <= 1) { el.innerHTML = ""; return; }
  let html = "";
  if (brandPage > 1) html += `<button onclick="changeBrandPage(${brandPage - 1})">Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button style="${i === brandPage ? "background:#2563eb;color:white;" : ""}" onclick="changeBrandPage(${i})">${i}</button>`;
  }
  if (brandPage < totalPages) html += `<button onclick="changeBrandPage(${brandPage + 1})">Next</button>`;
  el.innerHTML = html;
}

function changeBrandPage(p) { brandPage = p; loadBrands(); }

function brandHandleSearch(e) { brandSearch = e.target.value; brandPage = 1; loadBrands(); }
function brandHandleStatus(e) { brandStatusFilter = e.target.value; brandPage = 1; loadBrands(); }

function openBrandModal() {
  brandEditId = null;
  document.getElementById("brandModalTitle").innerText = "Add Brand";
  document.getElementById("brandSaveBtn").innerText = "Save";
  document.getElementById("brandNames").value = "";
  document.getElementById("brandStatusSelect").value = "active";
  document.getElementById("brandForm").style.display = "flex";
}

async function editBrandItem(id) {
  const res = await fetch(`${BRAND_API}/${id}`);
  const data = await res.json();
  const b = data.data;
  brandEditId = id;
  document.getElementById("brandModalTitle").innerText = "Edit Brand";
  document.getElementById("brandSaveBtn").innerText = "Update";
  document.getElementById("brandNames").value = Array.isArray(b.Brands) ? b.Brands.join(", ") : (b.Brands || "");
  document.getElementById("brandStatusSelect").value = b.status || "active";
  document.getElementById("brandForm").style.display = "flex";
}

async function saveBrand() {
  const rawNames = document.getElementById("brandNames").value.trim();
  const status = document.getElementById("brandStatusSelect").value;
  if (!rawNames) { alert("Brand name required hai"); return; }
  const Brands = rawNames.split(",").map(s => s.trim()).filter(Boolean);
  const url = brandEditId ? `${BRAND_API}/${brandEditId}` : BRAND_API;
  const method = brandEditId ? "PATCH" : "POST";
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Brands, status })
  });
  if (res.ok) {
    alert(brandEditId ? "Updated!" : "Brand added!");
    closeBrandModal();
    loadBrands();
  } else {
    const err = await res.json();
    alert(err.message || "Error hua");
  }
}

async function deleteBrand(id) {
  if (!confirm("Delete karna chahte ho?")) return;
  const res = await fetch(`${BRAND_API}/${id}`, { method: "DELETE" });
  if (res.ok) { alert("Deleted!"); loadBrands(); }
  else alert("Delete nahi hua");
}

function closeBrandModal() {
  document.getElementById("brandForm").style.display = "none";
  brandEditId = null;
}

window.addEventListener("click", function(e) {
  if (e.target === document.getElementById("brandForm")) closeBrandModal();
});