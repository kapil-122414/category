let editId = null;
let currentpage = 1;
let limit = 4;
let searchText = "";
let statusFilter = "";

function showpage(page) {
  document.getElementById("Dashboard").style.display = "none";
  document.getElementById("Categories-page").style.display = "none";
  document.getElementById("product-page").style.display = "none";
  document.getElementById("blog").style.display = "none";
  document.getElementById("Bookings").style.display = "none";
  document.getElementById("orders").style.display = "none";
  document.getElementById("setting").style.display = "none";
  if (page === "Dashboard") {
    document.getElementById("Dashboard").style.display = "block";
  } else if (page === "category") {
    document.getElementById("Categories-page").style.display = "block";
  } else if (page === "product") {
    document.getElementById("product-page").style.display = "block";
  } else if (page === "blog") {
    document.getElementById("blog").style.display = "block";
  } else if (page === "Bookings") {
    document.getElementById("Bookings").style.display = "block";
  } else if (page === "orders") {
    document.getElementById("orders").style.display = "block";
  } else if (page === "setting") {
    document.getElementById("setting").style.display = "block";
  }
}

// Show Category Form
function openModal() {
  document.getElementById("categoriesform").style.display = "flex";
}

// Image Preview
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    preview.style.display = "block";
    preview.src = URL.createObjectURL(file);
  }
});

// Optional: click outside to close
window.addEventListener("click", function (e) {
  const modal = document.getElementById("categoriesform");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
function cencel() {
  document.getElementById("categoriesform").style.display = "none";
  resetfrom();
}

// reset from
function resetfrom() {
  document.getElementById("imageInput").value = "";
  document.getElementById("Categoryname").value = "";
  document.getElementById("slug").value = "";
  document.getElementById("Description").value = "";
  document.getElementById("categories-order").value = "";
  document.getElementById("Status").value = "";
  document.getElementById("preview").style.display = "none";
  document.getElementById("saveBtn").innerText = "Save";
  editId = null;
}

//search  function

// slug
document.getElementById("Categoryname").addEventListener("input", function () {
  const slug = this.value
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  document.getElementById("slug").value = slug;
});
// post api in category

async function closeModal() {
  const input = document.getElementById("imageInput");
  const Categoryname = document.getElementById("Categoryname").value;
  const slug = document.getElementById("slug").value;
  const Description = document.getElementById("Description").value;
  const order = document.getElementById("categories-order").value;
  const Status = document.getElementById("Status").value;

  // ✅ validation
  if (!Categoryname || !slug || !order) {
    alert("Please fill all required fields");
    return;
  }

  const formData = new FormData();

  if (input.files[0]) {
    formData.append("Img", input.files[0]);
  }

  formData.append("Categoryname", Categoryname);
  formData.append("Slug", slug);
  formData.append("Description", Description);
  formData.append("Order", order);
  formData.append("Status", Status.toLowerCase());
  formData.append("Featured", document.getElementById("featured").checked);

  try {
    const url = editId
      ? `http://localhost:5000/api/category/${editId}`
      : `http://localhost:5000/api/category`;
    const method = editId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method: method,
      body: formData,
    });

    const data = await res.json();
    console.log("Response:", data);

    if (res.ok) {
      alert("Category Added ✅");
      showcategory();
      const modal = document.getElementById("categoriesform");
      modal.style.display = "none";

      resetfrom();
    } else {
      alert("Error ❌");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// total category

// get api

async function showcategory() {
  const showdata = document.getElementById("categoryTable");

  const res = await fetch(
    `http://localhost:5000/api/category?page=${currentpage}&limit=${limit}&search=${searchText}&status=${statusFilter}`,
  );
  const data = await res.json();

  showdata.innerHTML = "";

  const realData = data.data;

  realData.forEach((item) => {
    showdata.innerHTML += `
<tr>
  <td>
    <div style="display:flex;align-items:center;gap:10px;">
    
      <img src="${item.Img}" width="50" height="50"/>
      <div>
        <div>${item.Categoryname}</div>
        <small>/${item.Slug}</small>
      </div>
    </div>
  </td>

  <td>${item.Description}</td>
  <td>${item.products || 0}</td>
  <td>#${item.Order}</td>
  <td>
    <span class="${item.Status === "active" ? "active" : "inactive"}">
      ${item.Status}
    </span>
  </td>

  <td>
    <button onclick="updateCategory('${item._id}')">✏️</button>
    <button onclick="deleteCategory('${item._id}')">🗑️</button>
  </td>
</tr>
`;
  });
  // search not found
  if (realData.length === 0) {
    showdata.innerHTML = `<tr><td colspan="6">No Data Found</td></tr>`;
    return;
  }
  renderPagination(data.totalPages);

  // 🔥 FULL DATA FOR COUNTS
  const res2 = await fetch(
    `http://localhost:5000/api/category?page=1&limit=1000`,
  );

  const fullDataRes = await res2.json();

  const allData = fullDataRes.data;

  // ✅ Total
  document.querySelectorAll(".total-category h5")[0].innerText =
    fullDataRes.totalItems || allData.length;

  // ✅ Active
  const activeCount = allData.filter((item) => item.Status === "active").length;

  document.querySelectorAll(".total-category h5")[1].innerText = activeCount;

  // ✅ Featured
  const featuredCount = allData.filter((item) => item.Featured === true).length;

  document.querySelectorAll(".total-category h5")[2].innerText = featuredCount;

  // ✅ Total Products
  const totalProducts = allData.reduce(
    (sum, item) => sum + (item.products || 0),
    0,
  );

  document.querySelectorAll(".total-category h5")[3].innerText = totalProducts;
}

// search not found

window.onload = function () {
  showcategory();
};

// pagination
function renderPagination(totalPages) {
  let html = " ";

  // Prev
  if (currentpage > 1) {
    html += `<button class="changepage" onclick="changePage(${currentpage - 1})">Prev</button>`;
  }

  // Numbers
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button 
      class="changepage"
      style="${i === currentpage ? "background:#2563eb;color:white;" : ""}"
      onclick="changePage(${i})">
      ${i}
      </button>
    `;
  }
  // Next
  if (currentpage < totalPages) {
    html += `<button  class="changepage" onclick="changePage(${currentpage + 1})">Next</button>`;
  }

  document.getElementById("pagination").innerHTML = html;
}
//page change function
function changePage(page) {
  currentpage = page;
  showcategory();
}

// search
function handleSearch(e) {
  searchText = e.target.value;
  currentpage = 1;
  showcategory();
}

function handleStatus(e) {
  statusFilter = e.target.value;
  currentpage = 1;
  showcategory();
}

async function deleteCategory(_id) {
  try {
    const res = await fetch(`http://localhost:5000/api/category/${_id}`, {
      method: "delete",
    });
    console.log(res);
    const data = await res.json();
    if (res.ok) {
      alert("delete successfully");
      showcategory();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("DELETE ERROR:", error);
  }
}

async function updateCategory(_id) {
  try {
    editId = _id;
    const res = await fetch(`http://localhost:5000/api/category/${_id}`);
    const data = await res.json();
    const item = data.data;
    document.getElementById("Categoryname").value = item.Categoryname;
    document.getElementById("slug").value = item.Slug;
    document.getElementById("Description").value = item.Description;
    document.getElementById("categories-order").value = item.Order;
    document.getElementById("Status").value = item.Status;
    if (item.Img) {
      preview.src = item.Img;
      preview.style.display = "block";
    }
    document.getElementById("saveBtn").innerText = "Update";
    openModal();
  } catch (error) {
    alert("no edit", error);
  }
}
