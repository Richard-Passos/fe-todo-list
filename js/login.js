let logado = JSON.parse(sessionStorage.getItem("logado"));
if (logado) {
  window.location = "index.html";
}

let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

const loginForm = document.getElementById("login_form");

const loginBtnSubmit = loginForm.querySelector("#btnSubmit");
loginBtnSubmit.addEventListener("click", () => {
  let userEmail = loginForm.querySelector("#email").value;
  let userPassword = loginForm.querySelector("#password").value;

  if(userEmail != '' && userPassword != '') {
    if (verifyLoginAttempt(userEmail, userPassword)) {
      sessionStorage.setItem("logado", true);
      sessionStorage.setItem("userEmail", JSON.stringify(userEmail));
      window.location = "index.html";
    } else {
      alert("Email ou senha inválido!");
    }
  }
})

function verifyLoginAttempt(email, password) {
  const cryptoUserPassword = CryptoJS.MD5(password).toString();

  let isRegistred = accounts.find((account) => account.email == email);

  if (isRegistred) {
    if (
      email == isRegistred.email &&
      cryptoUserPassword == isRegistred.password
    ) {
      return true;
    }
  }

  return false
}
