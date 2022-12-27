let accounts = JSON.parse(localStorage.getItem("accounts"));
let userEmail = JSON.parse(sessionStorage.getItem("userEmail"));
let userData = accounts.find((account) => userEmail == account.email);
let userAccountIndex = accounts.indexOf(userData);

const form = document.getElementById("change-password_form");

const btnChangePassword = form.querySelector("#btnSubmit");
btnChangePassword.addEventListener("click", changePassword);

function changePassword() {
  event.preventDefault();

  let newPassword = form.querySelector("#password").value;
  let confirmNewPassword = form.querySelector("#confirm_password").value;

  if (newPassword != '' && confirmNewPassword != '') {
    if (newPassword !== confirmNewPassword) {
      alert("Preencha ambos os campo da mesma forma!");
    } else {
      const newUserPassword = CryptoJS.MD5(newPassword).toString()
      saveAccounts(newUserPassword);
      saveLocalStorage()

      form.querySelector("#password").value = "";
      form.querySelector("#confirm_password").value = "";
      alert("Nova senha cadastrada!");
    }
  } else {
    alert("Preencha todos os campos!");
  }
}

function saveLocalStorage() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

function saveAccounts(newPassword) {
  userData.password = newPassword;
  accounts[userAccountIndex] = userData;
}
