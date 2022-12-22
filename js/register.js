let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

const btnRegister = document.getElementById("btnSubmit");
btnRegister.addEventListener("click", register)

function verifyRegisterAttempt(email) {
    let isRegistred = accounts.find((account) => email == account.email);
    if (isRegistred) {
      alert("Email já cadastrado!");
      return false;
    }

    return true;
}

function register() {
  let userEmail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;

  if(userEmail != '' && userPassword != '') {
    if (verifyRegisterAttempt(userEmail)) {
      let objToAdd = {
        email: userEmail,
        password: CryptoJS.MD5(userPassword).toString(),
        toDo_list: [],
      };

      accounts.push(objToAdd);
      saveLocalStorage("accounts", accounts);

      alert("Email cadastrado!");
    }
  }
}

function saveLocalStorage(itemName, item) {
  localStorage.setItem(itemName, JSON.stringify(item));
}
