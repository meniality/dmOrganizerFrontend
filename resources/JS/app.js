createLogInForm()

worldBuilderButtonEvent()

function worldBuilderButtonEvent(){
  worldBuilderButton = document.querySelector('#worldBuilderButton')
  
  worldBuilderButton.addEventListener('click', renderCampaignsModal)
}

function renderCampaignsModal(){
  const modal = document.createElement('div')
  const modal_campaign_cards = document.createElement('div')
  const modal_content = document.createElement('div')
  const close_button = document.createElement('span')
  const newWorldButton = document.createElement('button')

  modal.className="modal"
  modal_campaign_cards.id="modalCampaignCards"

  close_button.className="close-button"
  close_button.innerText = 'x' 

  modal_content.className="modal-content"

  newWorldButton.innerText="Create a New World"
  newWorldButton.addEventListener('click', () => createNewWorldModal(modal))
  
  modal_content.append(close_button, newWorldButton)

  createCampaignCards(modal_campaign_cards)

  modal_content.appendChild(modal_campaign_cards)
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

  createNewWorldModal_content.append(createNewWorldClose_button)
  createNewWorldForm(createNewWorldModal, createNewWorldModal_content)
  
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

function createNewWorldForm(createNewWorldModal, createNewWorldModal_content){
  const createNewWorldForm = document.createElement('form')
  const createNewWorldFormLabel = document.createElement('h3')
  const createNewWorldFormName = document.createElement('input')
  const createNewWorldFormSubmit = document.createElement('button')


  createNewWorldFormLabel.innerText = "Choose a name for you new world!"

  createNewWorldFormName.type = 'text'

  createNewWorldFormSubmit.innerText = 'submit'
  createNewWorldFormSubmit.addEventListener('click', event => {
    event.preventDefault()
      if (createNewWorldFormName.value === ""){
        alert("A World Must Have A Name")
      }
        else {
        createNewWorldModal.classList.toggle("show-modal");
        createNewCampaignFetch(createNewWorldFormName.value)
        }
    })

  createNewWorldForm.append(
    createNewWorldFormLabel, 
    createNewWorldFormName, 
    createNewWorldFormSubmit)

  createNewWorldModal_content.append(createNewWorldForm)
}

function createNewCampaignFetch(newWorldName){
  fetch('http://localhost:3000/campaigns', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    authorization: `bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({"campaign":{"name": `${newWorldName}`}})
  })
  .then(response => response.json())
  .then(renderCampaignsModal())
}

function createCampaignCards(modal_campaign_cards){
  fetch('http://localhost:3000/campaigns', {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    authorization: `bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => response.json())
  .then(campaigns => {
    campaigns.map(campaign => {
      const campaignCard = document.createElement('div')
      const titleDiv = document.createElement('div')
      const title = document.createElement('h4')
      const image = document.createElement('img')

      campaignCard.id = "campaignCard"
      title.innerText = campaign.name
      title.id="campaignTitle"

      image.id="campaignImage"
      if(campaign.image){
        image.src = campaign.image
      } else{
        image.src = "./resources/images/defaultCampaignImage.jpg"
      }

      titleDiv.appendChild(title)
      campaignCard.append(titleDiv, image)

      modal_campaign_cards.appendChild(campaignCard)
    })
  })  
}