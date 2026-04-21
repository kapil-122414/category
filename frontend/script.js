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
