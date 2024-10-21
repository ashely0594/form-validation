const form = document.getElementById("registration");
// const emailVal = document.getElementById("email")
// const passwordVal = document.getElementById("password")
const loginForm = document.getElementById("login");
const errorDisplay = document.getElementById("errorDisplay");

// alert("testing file connection");

const clearErrors = () => {
  errorDisplay.textContent = "";
};

///// to show meassages
const showError = (message, input) => {
  errorDisplay.textContent = message;
  input.focus();
};

// validation the form 
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  clearErrors();

  //email part  
  // email validation since it didn't work using pattern in html 
  const email = form.email.value.trim().toLowerCase();
  if (!/\S+@\S+\.\S+/.test(email) || email.endsWith('@example.com')) {
    return showError("Email must be a valid email address and cannot be from the domain 'example.com'.", form.email);
  }


  // password and username validation part
  const username = form.username.value.trim().toLowerCase();
  const password = form.password.value;
  const passwordCheck = form.passwordCheck.value;

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
    return showError("Passwords must contain at least one uppercase letter, one lowercase letter, one number, and one special character.", form.password);
  }
  if (password.toLowerCase().includes("password")) {
    return showError("Passwords cannot contain the word 'password'.", form.password);
    
  } if (username && password.toLowerCase().includes(username)) {
    return showError("Passwords cannot contain the username.", form.password);
  }
  
  // password check
  if (password !== passwordCheck) {
    return showError("Passwords do not match.", form.passwordCheck);
  } 

  // localStorage
  users[username] = { email, password };
  localStorage.setItem("users", JSON.stringify(users));

   // show success message
   form.reset();
   errorDisplay.textContent = "Registration successful!";

});

///==== longin part of the form
loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    clearErrors();
  
    const username = loginForm.username.value.trim().toLowerCase();
    const password = loginForm.password.value;
  
    if (!username) {
      return showError("Username cannot be blank.", loginForm.username);
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]) {
      return showError("That username does not exist.", loginForm.username);
    }
  
    // Password validation
    if (!password) {
      return showError("Password cannot be blank.", loginForm.password);
    }
    if (users[username].password !== password) {
      return showError("Incorrect password.", loginForm.password);
    }
  
    // Clear form and show success message
    loginForm.reset();
    errorDisplay.textContent = loginForm.persist.checked 
      ? "you will be kept logged in." 
      : "login successful!";
  });