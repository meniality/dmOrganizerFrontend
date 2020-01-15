createLogInForm()

worldBuilderButtonEvent()







function worldBuilderButtonEvent(){
  worldBuilderButton = document.querySelector('#worldBuilderButton')
  
  worldBuilderButton.addEventListener('click', renderCampaignsModal)
}

function renderCampaignsModal(){
  const modal = document.createElement('div')
  const modal_content = document.createElement('div')
  const close_button = document.createElement('span')
  const newWorldButton = document.createElement('button')

  modal.className="modal"

  close_button.className="close-button"
  close_button.innerText = 'x' 

  modal_content.className="modal-content"

  newWorldButton.innerText="Create a New World"
  newWorldButton.addEventListener('click', () => createNewWorldModal(modal))

  modal_content.append(close_button, newWorldButton)
  modal.append(modal_content)
  document.body.append(modal)

  modal.classList.toggle("show-modal")
  close_button.addEventListener("click", toggleModal)
  window.addEventListener("click", windowOnClick)

  function toggleModal() {
    modal.classList.toggle("show-modal");
  }
  
  function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
  }  
}

function createNewWorldModal(modal){
  modal.classList.toggle("show-modal")

  const createNewWorldModal = document.createElement('div')
  const createNewWorldModal_content = document.createElement('div')
  const createNewWorldClose_button = document.createElement('span')

  createNewWorldModal.className="modal"

  createNewWorldModal_content.className="new-campaign-modal-content"

  createNewWorldClose_button.className="close-button"
  createNewWorldClose_button.innerText = 'x'
  createNewWorldClose_button.addEventListener('click', renderCampaignsModal)

  createNewWorldForm(createNewWorldModal_content)
  
  createNewWorldModal_content.append(createNewWorldClose_button)
  createNewWorldModal.append(createNewWorldModal_content)
  document.body.append(createNewWorldModal)

  createNewWorldModal.classList.toggle("show-modal")
  createNewWorldClose_button.addEventListener("click", toggleModal)
  window.addEventListener("click", windowOnClick)

  function toggleModal() {
    createNewWorldModal.classList.toggle("show-modal");
  }
  
  function windowOnClick(event) {
    if (event.target === createNewWorldModal) {
        toggleModal();
    }
  }  
}

function createNewWorldForm(createNewWorldModal_content){
  const createNewWorldForm = document.createElement('form')
  const createNewWorldFormLabel = document.createElement('h3')
  const createNewWorldFormName = document.createElement('input')
  const createNewWorldFormSubmit = document.createElement('button')


  createNewWorldFormLabel.innerText = "Choose a name for you new world!"

  createNewWorldFormName.type = 'text'

  createNewWorldFormSubmit.innerText = 'submit'

  createNewWorldForm.append(
    createNewWorldFormLabel, 
    createNewWorldFormName, 
    createNewWorldFormName)

  createNewWorldModal_content.append(createNewWorldForm)

}