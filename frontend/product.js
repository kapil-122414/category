//this is the product api function h jo  hum create kar rahe h

let productAPI = "https://categoryapi-oluc.onrender.com/api/product";
let productlimit = 4;
let productpage = 1;

// 🔥 open product modal
function openProductModal() {
  document.getElementById("productModal").style.display = "flex";
}

function resetProductForm() {
  document.getElementById("productName").value = "";
  document.getElementById("price").value = "";
  document.getElementById("categoryId").value = "";
  document.getElementById("pDescription").value = "";
  document.getElementById("ppreview").style.display = "none";
  document.getElementById("pimageInput").value = "";
}

// 🔥 save product
//let editId = null;

async function saveProduct() {
  const file = document.getElementById("pimageInput").files[0];
  const productName = document.getElementById("productName").value;
  const price = document.getElementById("price").value;
  const categoryId = document.getElementById("categoryId").value;
  const description = document.getElementById("pDescription").value;

  const formData = new FormData();
  if (file) formData.append("Img", file);

  formData.append("Productname", productName);
  formData.append("price", price);
  formData.append("categoryId", categoryId);
  formData.append("Description", description);

  let url = productAPI;
  let method = "POST";

  // 🔥 update mode
  if (editId) {
    url += "/" + editId;
    method = "PATCH";
  }

  const res = await fetch(url, {
    method,
    body: formData,
  });

  const data = await res.json();

  if (res.ok) {
    alert(editId ? "Updated ✅" : "Added ✅");
    document.getElementById("productModal").style.display = "none";
    loadProducts();
    resetProductForm();
    editId = null;
  } else {
    alert(data.message);
  }
}

// 🔥 get product
async function loadProducts() {
  const res = await fetch(
    `${productAPI}?page=${productpage}&limit=${productlimit}`,
  );
  const data = await res.json();

  const tbody = document.getElementById("productData");
  tbody.innerHTML = "";

  data.data.forEach((item) => {
    tbody.innerHTML += `
      <tr>
        <td><img src="${item.Img}"></td>
        <td>${item.Productname}</td>
        <td>${item.price}</td>
        <td>${item.Description}</td>
        <td>${item.categoryId}</td>
         <td><button class="edit-btn"   onclick="updateproduct('${item._id}')">Edit</button></td>
    <td> <button class="delete-btn" onclick="deleteproduct('${item._id}')">
    Delete
  </button></td>
      </tr>
    `;
  });
  productpagination(data.totalPages);
}

//productpagination
function productpagination(totalPages) {
  let html = "";
  if (productpage > 1) {
    html += `<button class="changepage" onclick="changePage(${currentpage - 1})"> pre</button>`;
  }

  // Numbers
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button 
      class="changepage"
      style="${i === productpage ? "background:#2563eb;color:white;" : ""}"
      onclick="changePage(${i})">
      ${i}
      </button>
    `;
  }
  // Next
  if (productpage < totalPages) {
    html += `<button  class="changepage" onclick="changePage(${currentpage + 1})">Next</button>`;
  }

  document.getElementById("porductpagination").innerHTML = html;
}

function changePage(page) {
  productpage = page;
  loadProducts();
}
//delete product
async function deleteproduct(_id) {
  try {
    const res = await fetch(`${productAPI}/${_id}`, {
      method: "delete",
    });

    const data = await res.json();
    if (res.ok) {
      alert("Deleted successfully ✅");
      // page refresh
      loadProducts();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("DELETE ERROR:", error);
  }
}

//update product

async function updateproduct(_id) {
  try {
    editId = _id;

    const res = await fetch(`${productAPI}/${_id}`);
    const data = await res.json();

    const item = data.data;
    console.log(item);
    // 🔥 form fill
    document.getElementById("productName").value = item.Productname || "";
    document.getElementById("price").value = item.price || "";
    document.getElementById("categoryId").value = item.categoryId || "";
    document.getElementById("pDescription").value = item.Description || "";

    // 🔥 image preview
    if (item.Img) {
      document.getElementById("ppreview").src = item.Img;
      document.getElementById("ppreview").style.display = "block";
    } else {
      document.getElementById("ppreview").style.display = "none";
    }

    // 🔥 button change
    document.getElementById("productSaveBtn").innerText = "Update";

    // ✅ LAST me modal open karo
  } catch (error) {
    console.log("Edit error:", error);
    openProductModal();
  }
}
// 🔥 image preview
document.getElementById("pimageInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    document.getElementById("ppreview").src = URL.createObjectURL(file);
    document.getElementById("ppreview").style.display = "block";
  }
});

// 🔥 load both
window.onload = () => {
  // category
  loadProducts(); // product
};
