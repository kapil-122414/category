const API_URL = "http://localhost:5000/api/brand";

let allBrands = [];

async function loadBrands() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    allBrands = data;
    renderCounts(data);
  } catch (err) {
    console.error("Error fetching brands:", err);
  }
}

function renderCounts(data) {
  const total = data.length;
  const active = data.filter((b) => b.status === "active").length;
  const inactive = data.filter((b) => b.status === "inactive").length;

  document.querySelectorAll(".total-brands h5")[0].innerText = total;
  document.querySelectorAll(".total-brands h5")[1].innerText = active;
  document.querySelectorAll(".total-brands h5")[2].innerText = inactive;
}

function brandSearch(e) {
  const value = e.target.value.toLowerCase();

  const filtered = allBrands.filter((b) =>
    b.name.toLowerCase().includes(value),
  );

  renderCounts(filtered);
}

function brnadSearch(e) {
  const value = e.target.value;

  let filtered = allBrands;

  if (value) {
    filtered = allBrands.filter((b) => b.status === value);
  }

  renderCounts(filtered);
}

function openbrand() {
  document.getElementById("Brandsfrom").style.display = "flex";
}
// add data
async function addBrand() {
  const name = document.getElementById("Brandname").value;
  const status = document.querySelector("#Brandsfrom select").value;

  if (!name) {
    alert("Brand name required");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, status }),
    });

    const data = await res.json();

    // reload
    loadBrands();

    // reset form
    document.getElementById("Brandname").value = "";
    document.getElementById("Brandsfrom").style.display = "none";
  } catch (err) {
    console.error("Error adding brand:", err);
  }
}
