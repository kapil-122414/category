function isEligible(Graduation) {
  if (Graduation == "yes") {
    return "job Eligibility";
  } else {
    return "not Eligibility";
  }
}
let arr = [];

function showdata() {
  const student_name = document.getElementById("student").value;
  const ages = document.getElementById("age").value;
  const Graduation = document.getElementById("Graduation").value;

  const showdataa = document.getElementById("showdata");

  showdataa.innerHTML += `
<table>
        <thead>
          <tr>
           <td>${student_name}</td>
           <td>${ages}</td>
           <td>${Graduation}</td>
           <td>${isEligible(Graduation)}</td>
           
          </tr>
        </thead>
        <tbody id="showdata"></tbody>
      </table>

`;
}
