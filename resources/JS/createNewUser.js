
createNewUserForm()



function createNewUserForm(){
  const newUserForm = document.createElement('form')
  newUserForm.id = "newUserForm"
  
  const usernameLabel = document.createElement('label')
  const username = document.createElement('input')
  const passwordLabel = document.createElement('label')
  const password = document.createElement('input')
  const verifyPasswordLabel = document.createElement('label')
  const verifyPasswordInput = document.createElement('input')
  const submitButton = document.createElement('input')
  
  
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
    usernameLabel, 
    username,
    passwordLabel,
    password,
    verifyPasswordLabel,
    verifyPasswordInput,
    submitButton,
    )
    
    document.body.append(newUserForm)
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
  
  