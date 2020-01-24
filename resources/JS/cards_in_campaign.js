function testForCampaignCardModal(campaignId, modal){
  const testForModal = document.body.querySelector('#campaignCardModal')
  if (testForModal){
    testForModal.remove()
    showCardsInCampaign(campaignId, modal)
  }
  else{
    showCardsInCampaign(campaignId, modal)
  }
}

function testForNewCardModal(campaignId){
  newCardModal = document.querySelector("#createNewCardModal")
  if (newCardModal) {
    newCardModalValue = newCardModal.querySelector("#campaign_id")

    newCardModalValue.value = campaignId
    newCardModal.classList.toggle("show-modal")
  } 
  else {
    createNewCardModal(campaignId)
  }
}

function showCardsInCampaign(campaignId, modal){
  const showCampaignCardsModal = document.createElement('div')
  const showCampaignCardsdModal_content = document.createElement('div')
  const modalCardsContainer = document.createElement('div')
  const showCampaignCardsClose_button = document.createElement('span')
  const newCardButton = document.createElement('button')
  const deleteCampaignButton = document.createElement('button')
  
  showCampaignCardsModal.className="modal"
  showCampaignCardsModal.id="campaignCardModal"

  showCampaignCardsdModal_content.className="modal-content"

  showCampaignCardsClose_button.className="close-button"
  showCampaignCardsClose_button.innerHTML = '&times'

  modalCardsContainer.id = "modalCardContainer"
  modalCardsContainer.addEventListener('click', () => {
    testForShowCardModal(event.path[event.path.length - 8].querySelector("#card_id").value),
    showCampaignCardsModal.classList.toggle("show-modal")
  })

  newCardButton.innerText = "Create a new card."
  newCardButton.addEventListener('click', () =>{
    showCampaignCardsModal.classList.toggle("show-modal")

    testForNewCardModal(campaignId)
  })
  deleteCampaignButton.innerText = "Delete Campaign"
  deleteCampaignButton.addEventListener('click', ()=>{deleteCampaign(campaignId, showCampaignCardsModal)})

  showCampaignCardsClose_button.addEventListener("click", ()=>{
    toggleModal(),
    modal.classList.toggle("show-modal")
  })
  window.addEventListener("click", windowOnClick)
  
  createCardsInCampaign(modalCardsContainer, campaignId)

  showCampaignCardsdModal_content.append(
    newCardButton, 
    showCampaignCardsClose_button,
    modalCardsContainer,
    deleteCampaignButton 
    )

  showCampaignCardsModal.append(showCampaignCardsdModal_content)
  document.body.append(showCampaignCardsModal)
  showCampaignCardsModal.classList.toggle("show-modal")

  function toggleModal() {
    showCampaignCardsModal.classList.toggle("show-modal");
  }
  
  function windowOnClick(event) {
    if (event.target === showCampaignCardsModal) {
        toggleModal();
    }
  } 
}

function createNewCardModal(campaignId){

  const createNewCardModal = document.createElement('div')
  const createNewCardModal_content = document.createElement('div')
  const createNewCardClose_button = document.createElement('span')

  createNewCardModal.className="modal"
  createNewCardModal.id="createNewCardModal"

  createNewCardModal_content.className="new-campaign-modal-content"

  createNewCardClose_button.className="close-button"
  createNewCardClose_button.innerHTML = '&times'
  createNewCardClose_button.addEventListener('click', () =>{
    document.body.querySelector('#campaignCardModal').classList.toggle("show-modal")
  })

  createNewCardModal_content.append(createNewCardClose_button)
  
  createNewCardForm(campaignId, createNewCardModal_content)
  
  createNewCardModal.append(createNewCardModal_content)
  document.body.append(createNewCardModal)
  
  createNewCardModal.classList.toggle("show-modal")
  createNewCardClose_button.addEventListener("click", toggleModal)
  window.addEventListener("click", windowOnClick)

  function toggleModal() {
    createNewCardModal.classList.toggle("show-modal");
  }
  
  function windowOnClick(event) {
    if (event.target === createNewCardModal) {
        toggleModal();
    }
  }  
}

function createNewCardForm(campaignId, createNewCardModal_content){
  const createNewCardForm = document.createElement('form')
  const createNewCardFormLabel = document.createElement('h3')
  const createNewCardFormName = document.createElement('input')
  const createNewCardFormShortDescription = document.createElement('input')
  const createNewCardFormText = document.createElement('textarea')
  const createNewCardFormImage = document.createElement('input')
  const createNewCardFormCampaingId = document.createElement('input')
  const createNewCardFormSubmit = document.createElement('button')

  createNewCardFormLabel.innerText = 'Enter your info for your new card. The card must have a name.'

  createNewCardFormName.type = 'text'
  createNewCardFormName.name = 'name'
  createNewCardFormName.placeholder = 'Name of Card'

  createNewCardFormShortDescription.type = 'text'
  createNewCardFormShortDescription.name = "short_description"
  createNewCardFormShortDescription.placeholder = " Enter Your Short Description Here"

  createNewCardFormText.rows ='8'
  createNewCardFormText.cols ='70'
  createNewCardFormText.name = "text"
  createNewCardFormText.placeholder = "Enter Your Full Description Here"

  createNewCardFormImage.type = 'text'
  createNewCardFormImage.name ='image'
  createNewCardFormImage.placeholder = 'Enter a URL for and Image'

  createNewCardFormCampaingId.type = 'hidden'
  createNewCardFormCampaingId.value = campaignId
  createNewCardFormCampaingId.name ='campaign_id'
  createNewCardFormCampaingId.id ='campaign_id'

  createNewCardFormSubmit.innerText = "submit"
  createNewCardFormSubmit.addEventListener('click', event => {
    createNewCardModal = 
    event.preventDefault(),
    createNewCardFetch(createNewCardForm)
    document.body.querySelector("#campaignCardModal").classList.toggle("show-modal");
    document.body.querySelector("#createNewCardModal").classList.toggle("show-modal");
    createNewCardForm.reset()
  })

  createNewCardForm.append(
    createNewCardFormLabel,
    createNewCardFormName,
    createNewCardFormShortDescription,
    createNewCardFormText,
    createNewCardFormImage,
    createNewCardFormCampaingId,
    createNewCardFormSubmit
  )
  createNewCardModal_content.appendChild(createNewCardForm)
}

function createNewCardFetch(createNewCardForm){
const formData = new FormData(createNewCardForm)
const name = formData.get("name")
const short_description = formData.get("short_description")
const text = formData.get("text")
const image = formData.get("image")
const campaign_id = formData.get("campaign_id")

fetch('http://localhost:3000/cards#campaign_cards', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    authorization: `bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({"card":{name, short_description, text, image, campaign_id}})
  })
  .then(response => response.json())
  .then(card => {createCardInCampaign(card)})
}

function createCardsInCampaign(modalCardsContainer, campaign_id){
  fetch('http://localhost:3000/campaign_cards', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    authorization: `bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({"card":{"campaign_id": campaign_id}})
  })
  .then(response => response.json())
  .then(cards => {
    cards.map(card => createCardInCampaign(card, modalCardsContainer))
  })
}

function createCardInCampaign(card){
  const modalCardsContainer=document.querySelector("#modalCardContainer")
  const cardContainer = document.createElement('div')
  const valueOfCardValue = document.createElement ('input')
  const name = document.createElement('p')
  const image = document.createElement('img')
  const short_description = document.createElement('p')


  cardContainer.className = "cardContainer"
  cardContainer.id = `cardId${card.id}`

  valueOfCardValue.type = "hidden"
  valueOfCardValue.id = "card_id"
  valueOfCardValue.value = card.id
  
  cardContainer.append(valueOfCardValue)

  name.innerText = card.name
  name.id = "cardName"

  image.id = "cardImage"
  if (card.image){
    image.src = card.image
  } else {
    image.src = "./resources/images/defaultCardImage.jpg"
  }

  short_description.innerText = card.short_description
  short_description.id = "shortDescription"

  cardContainer.append(name, image, short_description)

  modalCardsContainer.appendChild(cardContainer)
}

function deleteCampaign(campaignId, showCampaignCardsModal){
  fetch(`http://localhost:3000/campaigns/${campaignId}`,{
    method: 'DELETE',
    headers: {
      authorization: `bearer ${localStorage.getItem('token')}`
    }
  })
  .then(() => {
    removeCampaignFromMainPage(campaignId)
  })
  .then(() => {
    showCampaignCardsModal.classList.toggle("show-modal")

    allCampaigns = document.querySelector('#campaignsModal')
    allCampaigns.classList.toggle("show-modal")
  })
}

function removeCampaignFromMainPage(campaignId){
  campaignContainer= document.querySelector(`#campaignId${campaignId}`)
  campaignContainer.remove()
}