createLogInForm()


function createLogInForm(){
  topOfPage = document.querySelector("#topOfPage")
  const loginForm = document.createElement("form")
  
  loginForm.method = "POST"
  loginForm.action = "http://localhost:3000/login"
  loginForm.id = "loginForm"
  
  const loginUsernameLabel = document.createElement('label')
  const loginUsername = document.createElement('input')
  const loginPasswordLabel = document.createElement('label')
  const loginPassword = document.createElement('input')
  const loginSubmit = document.createElement("input")
  
  loginUsernameLabel.innerText = "Enter Username:"
  
  loginUsername.name = "username"
  loginUsername.placeholder = "Username"
  
  loginPasswordLabel.innerText = "Enter Password:"
  
  loginPassword.name = "password"
  loginPassword.placeholder = "Password"
  
  loginSubmit.type = "submit"
  
  loginForm.append(loginUsernameLabel, loginUsername, loginPasswordLabel, loginPassword, loginSubmit)
  
  topOfPage.append(loginForm)
  
  renderCreateNewUserButton(topOfPage)
}

function renderCreateNewUserButton(topOfPage){
  createNewUserButton = document.createElement("button")

  createNewUserButton.id = "createNewUserButton"
  createNewUserButton.innerText = "Create New User"
  createNewUserButton.addEventListener('click', () => {
    createNewUserForm(topOfPage)
  })

  topOfPage.appendChild(createNewUserButton)
}

function createNewUserForm(topOfPage){
  loginForm = document.querySelector("#loginForm")
  loginForm.style.display = "none"

  createNewUserButton = document.querySelector('#createNewUserButton')
  createNewUserButton.style.display = "none"

  const newUserForm = document.createElement('form')
  newUserForm.id = "newUserForm"
  
  const newUserLabel = document.createElement('label')
  const usernameLabel = document.createElement('label')
  const username = document.createElement('input')
  const passwordLabel = document.createElement('label')
  const password = document.createElement('input')
  const verifyPasswordLabel = document.createElement('label')
  const verifyPasswordInput = document.createElement('input')
  const submitButton = document.createElement('input')
  
  newUserLabel.innerText = "Create a New User:"

  usernameLabel.innerText = "Enter your Username:"
  username.placeholder = "Username"
  username.name = "username"
  
  passwordLabel.innerText = "Enter a Password:"
  password.type = 'password'
  password.placeholder = 'Password'
  password.name = "password"
  
  verifyPasswordLabel.innerText = "Verify your Password:"
  verifyPasswordInput.type = "password"
  verifyPasswordInput.placeholder = "Password"
  verifyPasswordInput.name = "verifyPasswordInput"
  
  submitButton.type = "button"
  submitButton.value = "submit"
  submitButton.addEventListener('click', () => {
    verifyPassword()
  })
  
  newUserForm.append(
    newUserLabel,
    usernameLabel, 
    username,
    passwordLabel,
    password,
    verifyPasswordLabel,
    verifyPasswordInput,
    submitButton,
    )
    
  const cancelCreateNewUserButton = document.createElement('button')

  cancelCreateNewUserButton.innerText = "Cancel"
  cancelCreateNewUserButton.addEventListener('click', () => {

  cancelCreateNewUserButton.style.display = 'none'
  newUserForm.style.display = 'none'
  loginForm.style.display = "block"
  createNewUserButton.style.display = "block"
  })

    topOfPage.append(newUserForm, cancelCreateNewUserButton)
  }
  
function verifyPassword(){
  const formElement = document.querySelector("#newUserForm")
  const formData = new FormData(formElement)
  
  if (formData.get("password")===formData.get("verifyPasswordInput")){
    fetch("http://localhost:3000/users",
      {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({user: {username: formData.get("username"), password: formData.get("password")}})
      })
    .then(response => response.json())
    .then(window.location.href = "http://localhost:3001/")
  }
  else {
    alert("Passwords Must Match.")
    formElement.password.value = ""
    formElement.verifyPasswordInput.value = ""
  }
}
  
  