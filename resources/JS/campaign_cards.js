function campaignBuilderButtonEvent(){
  campaignBuilderButton = document.querySelector('#worldBuilderButton')
  
  campaignBuilderButton.addEventListener('click', () => {
    const campaignModal = document.querySelector('#campaignsModal')
    if(campaignModal){
      campaignModal.classList.toggle("show-modal")
    }
    else {
    renderCampaignsModal()
    }
  })
}

function renderCampaignsModal(){
  const modal = document.createElement('div')
  const modal_campaign_cards = document.createElement('div')
  const modal_content = document.createElement('div')
  const close_button = document.createElement('span')
  const newWorldButton = document.createElement('button')

  modal.className="modal"
  modal.id = "campaignsModal"
  modal_campaign_cards.id="modalCampaignCards"

  close_button.className="close-button"
  close_button.innerText = 'x' 

  modal_content.className="modal-content"
  modal_content.id ="campaignsModalContent"

  newWorldButton.innerText="Create a New Campaign"
  newWorldButton.addEventListener('click', () => {
    const newWorldModal = document.querySelector("#createNewWorldModal")
    
    if (newWorldModal){
      newWorldModal.classList.toggle("show-modal")
    }
    else{
      createNewWorldModal(modal_campaign_cards, modal)
    }
  })
  
  
  modal_content.append(close_button, newWorldButton)

  createCampaignCards(modal_campaign_cards, modal)

  // modal_content.appendChild(modal_campaign_cards)
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

function createNewWorldModal(modal_campaign_cards,modal){

  const createNewWorldModal = document.createElement('div')
  const createNewWorldModal_content = document.createElement('div')
  const createNewWorldClose_button = document.createElement('span')

  createNewWorldModal.className="modal"
  createNewWorldModal.classList.toggle("show-modal")
  createNewWorldModal.id="createNewWorldModal"

  createNewWorldModal_content.className="new-campaign-modal-content"

  createNewWorldClose_button.className="close-button"
  createNewWorldClose_button.innerText = 'x'
  createNewWorldClose_button.addEventListener('click', () =>{modal.classList.toggle("show-modal")})

  createNewWorldModal_content.append(createNewWorldClose_button)
  createNewWorldForm(createNewWorldModal, createNewWorldModal_content, modal_campaign_cards, modal)
  
  createNewWorldModal.append(createNewWorldModal_content)
  document.body.append(createNewWorldModal)

  createNewWorldClose_button.addEventListener("click", toggleModal)
  window.addEventListener("click", windowOnClick)

  function toggleModal() {
    createNewWorldModal.classList.toggle("show-modal");
    modal.classList.toggle("show-modal")
  }
  
  function windowOnClick(event) {
    if (event.target === createNewWorldModal) {
        toggleModal();
    }
  }  
}

function createNewWorldForm(createNewWorldModal, createNewWorldModal_content, modal_campaign_cards, modal){
  const createNewWorldForm = document.createElement('form')
  const createNewWorldFormLabel = document.createElement('h3')
  const createNewWorldFormName = document.createElement('input')
  const createNewWorldFormSubmit = document.createElement('button')


  createNewWorldFormLabel.innerText = "Choose a name for your new campaign!"

  createNewWorldFormName.type = 'text'

  createNewWorldFormSubmit.innerText = 'submit'
  createNewWorldFormSubmit.addEventListener('click', event => {
    event.preventDefault()
      if (createNewWorldFormName.value === ""){
        alert("A World Must Have A Name")
      }
        else {
        createNewWorldModal.classList.toggle("show-modal");
        createNewCampaignFetch(createNewWorldFormName.value, modal_campaign_cards, modal)
        }
      
    })

  createNewWorldForm.append(
    createNewWorldFormLabel, 
    createNewWorldFormName, 
    createNewWorldFormSubmit)

  createNewWorldModal_content.append(createNewWorldForm)
}

function createNewCampaignFetch(newWorldName, modal_campaign_cards, modal){
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
  .then(campaign  => createCampaignCard(campaign, modal_campaign_cards, modal))
}

function createCampaignCards(modal_campaign_cards, modal){
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
      createCampaignCard(campaign,modal_campaign_cards, modal)
    })
  })  
}

function createCampaignCard(campaign, modal_campaign_cards, modal){  
  const modal_content = document.querySelector('#campaignsModalContent')
  const campaignCard = document.createElement('div')
  const titleDiv = document.createElement('div')
  const title = document.createElement('h4')
  const image = document.createElement('img')
  const valueForm = document.createElement('form')
  const formInput = document.createElement('input')

  formInput.value = campaign.id
  formInput.type = "hidden"

  campaignCard.addEventListener('click', () => {
    modal.classList.toggle("show-modal"),
    testForCampaignCardModal(formInput.value, modal)
  })
  campaignCard.id = "campaignCard"
  title.innerText = campaign.name
  title.id="campaignTitle"

  image.id="campaignImage"
  if(campaign.image){
    image.src = campaign.image
  } else{
    image.src = "./resources/images/defaultCampaignImage.jpg"
  }

  valueForm.appendChild(formInput)

  titleDiv.appendChild(title)
  campaignCard.append(titleDiv, image, valueForm)

  modal_campaign_cards.append(campaignCard)
  modal_content.appendChild(modal_campaign_cards)
  modal.appendChild(modal_content)
  document.body.appendChild(modal)
}