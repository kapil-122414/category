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

  try {
    const res = await fetch("http://localhost:5000/api/category", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Response:", data);

    if (res.ok) {
      alert("Category Added ✅");

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
