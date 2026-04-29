async function openproduct() {
  document.getElementById("productforms").style.display = "flex";
  loadCategories();
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
  const preview = document.getElementById("propreview");

  preview.src = "";
  preview.style.display = "none";

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
    <input type="number" placeholder="Discount %" class="discount" min="0" >
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

//get variant
async function getvriant() {
  const variantbox = document.querySelectorAll(".variant-box");
  const variants = [];

  variantbox.forEach((box) => {
    const image = box.querySelector(".img").files[0];
    const size = box.querySelector(".size").value;
    const color = box.querySelector(".color").value;
    const mrp = box.querySelector(".mrp").value;
    const discount = box.querySelector(".discount").value;
    const price = box.querySelector(".price").value;
    const stock = box.querySelector(".stock").value;
    const sku = box.querySelector(".sku").value;
    variants.push({
      image,
      size,
      color,
      mrp,
      discount,
      price,
      stock,
      sku,
    });
  });
  return variants;
}
// post api
async function prosubmit() {
  const variants = await getvriant();

  const proname = document.getElementById("proname").value;
  const proslug = document.getElementById("proslug").value;
  const prodescrition = document.getElementById("prodescrition").value;
  const proshort = document.getElementById("proshort").value;
  const probrand = document.getElementById("probrand").value;
  const promrp = document.getElementById("promrp").value;
  const prodiscount = document.getElementById("prodiscount").value;
  const proprice = document.getElementById("proprice").value;
  const prostatus = document.getElementById("status").value;

  const proImage = document.getElementById("proimg").files[0];
  const categoryId = document.getElementById("category").value;

  if (!proname || !proslug || !prodescrition || !proshort) {
    return alert("please fill the form");
  }
  const formData = new FormData();

  if (proImage) {
    formData.append("Img", proImage);
  }
  if (!categoryId) {
    return alert("Please select category");
  }
  variants.forEach((v, i) => {
    if (v.image) {
      formData.append(`variantImages_${i}`, v.image);
    }
  });

  const cleanVariants = variants.map(({ image, ...rest }) => rest);

  formData.append("variant", JSON.stringify(cleanVariants));

  formData.append("Productname", proname);
  formData.append("slug", proslug);
  formData.append("description", prodescrition);
  formData.append("shortDescription", proshort);
  formData.append("brand", probrand);
  formData.append("mrp", promrp);
  formData.append("discount", prodiscount);
  formData.append("price", proprice);
  formData.append("status", prostatus);
  formData.append("categoryId", categoryId);

  try {
    const res = await fetch("http://localhost:5000/api/product", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert("successfully post data ");
      procCancel();
      proreset();
      getproduct();
    } else {
      alert(data.message || "Error ");
    }
  } catch (error) {
    console.error("error", error);
  }
}

async function loadCategories() {
  const res = await fetch("http://localhost:5000/api/category/all");
  const data = await res.json();

  const select = document.getElementById("category");

  data.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat._id;
    option.textContent = cat.Categoryname;

    select.appendChild(option);
  });
}

async function getproduct() {
  const showdataa = document.getElementById("productdata");
  const res = await fetch("http://localhost:5000/api/product");
  const data = await res.json();
  showdataa.innerHTML = " ";
  const reldata = data.data;
  console.log(reldata);
  if (!reldata) {
    alert("not found data");
  }

  reldata.forEach((items) => {
    showdataa.innerHTML += `
    
    <tr>
    <td>
    <div style="display:flex;align-items:center;gap:10px;">
    <img src="${items.Img?.url}"width="50" height="50"></img>
     
     <div>
      <div>${items.Productname}</div>
     <small>/${items.slug}</small> 
     </div>
    
     
    </div>
    </td>
    <td>${items.categoryId?.Categoryname}</td>
<td>
    <div>Price-${items.price}</div>
    <div>Discount-${items.discount}%</div>
    <div>MRP-${items.mrp}</div>
    </td>
    <td>
    ${items.shortdiscription}
</td>    
<td>
<div  class="${items.status === "active" ? "active" : "inactive"}">
${items.status}
</div>
  
</td>
  
</td>
   
<td>

    <button  class="btn"onclick='showVariants(${JSON.stringify(items.variant)})'>
     Variants
    </button>
</td>

<td>
<button onclick="updateproduct('${items._id}')">✏️</button>
    <button onclick="deleteproduct('${items._id}')">🗑️</button>
</td>
    </tr>  
    `;
  });
}
getproduct();

function showVariants(variants) {
  const varinatdata = document.getElementById("Variants-data");
  console.log(variants);

  if (!variants || variants.length === 0) {
    varinatdata.innerHTML = "<P> Not variants </p>";
    return;
  }
  let showvarint = "<h3>Varinats</h3>";

  variants.forEach((v) => {
    showvarint += `   
    
     `;
  });
}
