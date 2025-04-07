document.getElementById("timestamp").value = new Date().toISOString();

    function openModal(id) {
      document.getElementById(id).style.display = "block";
    }
    function closeModal(id) {
      document.getElementById(id).style.display = "none";
    }


const params = new URLSearchParams(window.location.search);
document.getElementById("firstName").textContent = params.get("firstName") || "";
document.getElementById("lastName").textContent = params.get("lastName") || "";
document.getElementById("email").textContent = params.get("email") || "";
document.getElementById("mobile").textContent = params.get("mobile") || "";
document.getElementById("organization").textContent = params.get("organization") || "";
document.getElementById("timestamp").textContent = params.get("timestamp") || "";