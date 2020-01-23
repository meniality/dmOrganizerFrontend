function createLogInForm(){
  topRightOfPage = document.querySelector("#topRightOfPage")
  const loginForm = document.createElement("form")
  
  loginForm.id = "loginForm"
  
  const loginLabel = document.createElement('label')
  const loginUsername = document.createElement('input')
  const loginPassword = document.createElement('input')
  const loginSubmit = document.createElement("button")
  
  loginLabel.innerText = "Login with Existing User:"
  
  loginUsername.name = "username"
  loginUsername.placeholder = "Username"
  
  loginPassword.name = "password"
  loginPassword.placeholder = "Password"
  loginPassword.type = 'password'
  
  loginSubmit.innerText = "submit"
  loginSubmit.addEventListener('click', event => {
    event.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Accept':'application/json',
      },
      body: JSON.stringify({"username": loginUsername.value, "password": loginPassword.value})
    })
    .then(response => response.json())
    .then(response => {
      localStorage.setItem('token', response.token)
      localStorage.setItem('username', response.username)
      if (response.token){
        createSignOutButton(loginForm, topRightOfPage)
      }
      else {
        alert('Incorrect Username or Password.')
      }
    })
    .catch(console.log)
  })
  
  loginForm.append(loginLabel, loginUsername, loginPassword, loginSubmit)
  
  topRightOfPage.append(loginForm)
  
  renderCreateNewUserButton(topRightOfPage)
 
  if (localStorage.getItem("token")){
    createSignOutButton(loginForm, topRightOfPage)
  }
}

function renderCreateNewUserButton(topRightOfPage){
  createNewUserButton = document.createElement("button")

  createNewUserButton.id = "createNewUserButton"
  createNewUserButton.innerText = "Create New User"
  createNewUserButton.addEventListener('click', () => {
    createNewUserForm(topRightOfPage)
  })

  topRightOfPage.appendChild(createNewUserButton)
}

function createNewUserForm(topRightOfPage){
  loginForm = document.querySelector("#loginForm")
  loginForm.style.display = "none"

  createNewUserButton = document.querySelector('#createNewUserButton')
  createNewUserButton.style.display = "none"

  const newUserForm = document.createElement('form')
  newUserForm.id = "newUserForm"
  
  const newUserLabel = document.createElement('label')
  const username = document.createElement('input')
  const password = document.createElement('input')
  const verifyPasswordInput = document.createElement('input')
  const submitButton = document.createElement('input')
  
  newUserLabel.innerText = "Create a New User:"

  username.placeholder = "Username"
  
  username.name = "username"
  
  password.type = 'password'
  password.placeholder = 'Password'
  password.name = "password"
  
  verifyPasswordInput.type = "password"
  verifyPasswordInput.placeholder = "Verify Password"
  verifyPasswordInput.name = "verifyPasswordInput"
  
  submitButton.type = "button"
  submitButton.value = "submit"
  submitButton.addEventListener('click', () => {
    verifyPassword()
  })
  
  newUserForm.append(
    newUserLabel,
    username,
    password,
    verifyPasswordInput,
    submitButton,
    )
    
  const cancelCreateNewUserButton = document.createElement('button')

  cancelCreateNewUserButton.innerText = "Cancel"
  cancelCreateNewUserButton.id ="cancelCreateNewUserButton"
  cancelCreateNewUserButton.addEventListener('click', () => {

  cancelCreateNewUserButton.style.display = 'none'
  newUserForm.style.display = 'none'
  loginForm.style.display = "flex"
  createNewUserButton.style.display = "flex"
  })

    topRightOfPage.append(newUserForm, cancelCreateNewUserButton)
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

function createSignOutButton(loginForm, topRightOfPage){
  createNewUserButton = document.querySelector('#createNewUserButton')

  loginForm.style.display = 'none'
  createNewUserButton.style.display = 'none'

  const signOutButton = document.createElement('button')
  const welcomeMessage = document.createElement('p')

  welcomeMessage.id="welcomeMessage"
  signOutButton.id="signoutButton"

  signOutButton.innerText = ' Sign Out'
  signOutButton.addEventListener('click', () =>{
    createNewUserButton = document.querySelector('#createNewUserButton')

    welcomeMessage.style.display = 'none'
    signOutButton.style.display = 'none'
    loginForm.style.display = 'flex'
    createNewUserButton.style.display = 'flex'
    loginForm.reset()

    localStorage.removeItem('token')
  })

  welcomeMessage.innerText = `Welcome, ${localStorage.getItem("username")}! `

  topRightOfPage.append(welcomeMessage, signOutButton)
}
  