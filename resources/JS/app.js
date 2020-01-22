createLogInForm()

campaignBuilderButtonEvent()








function testForShowCardModal(card_id){
  showcard = document.querySelector('#showCardModal')
  if (showcard){
    showcard.remove()
    showCardModal(card_id)
  }
  else{
    showCardModal(card_id)
  }
}

function showCardModal(card_id){
  const campaignCardModal = document.querySelector('#campaignCardModal')
  const showCardModal = document.createElement('div')
  const showCardModal_content = document.createElement('div')
  const showCardModalClose_button = document.createElement('span')

  showCardModal.className="modal"
  showCardModal.id="showCardModal"

  showCardModal_content.id="card-modal-content"

  showCardModalClose_button.className="close-button"
  showCardModalClose_button.innerText = 'x'
  showCardModalClose_button.addEventListener("click", ()=> {
    toggleModal() 
    campaignCardModal.classList.toggle("show-modal")
  })

  showCardModal_content.append(showCardModalClose_button)

  getCardInfoFetch(showCardModal_content, card_id, showCardModal)

  toggleModal()
  window.addEventListener("click", windowOnClick)

  function toggleModal() {
    showCardModal.classList.toggle("show-modal");
  }
  
  function windowOnClick(event) {
    if (event.target === showCardModal) {
        toggleModal();
    }
  } 
}

function getCardInfoFetch(showCardModal_content, card_id, showCardModal){
  fetch('http://localhost:3000/show_card', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    authorization: `bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({"card": {"card_id": card_id}})
  })
  .then(response => response.json())
  .then(card => {createShowCard(showCardModal_content, card, showCardModal)})
}

function createShowCard(showCardModal_content, card, showCardModal){
  
  const name = document.createElement('h3')
  const shortDescription = document.createElement('p')
  const text = document.createElement('p')
  const image = document.createElement('img')
  const deleteButton = document.createElement('button')


  name.innerText = card.name
  shortDescription.innerText = card.short_description
  text.innerText = card.text
  image.src = card.image

  deleteButton.innerText = "Delete"
  deleteButton.value = card.id
  deleteButton.addEventListener('click', () => {deleteCard(event.target.value, showCardModal)})

  showCardModal_content.append(name, shortDescription, text, image, deleteButton)
  showCardModal.append(showCardModal_content)
  document.body.append(showCardModal)
}

function deleteCard(cardId, showCardModal){
  fetch(`http://localhost:3000/cards/${cardId}`,{
    method: 'DELETE',
    headers: {
      authorization: `bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    removeCardFromCampaignPage(cardId)
  })
  .then(() => {
    campaign = document.querySelector('#campaignCardModal')
    campaign.classList.toggle("show-modal")

    showCardModal.classList.toggle("show-modal")

  })
}

function removeCardFromCampaignPage(cardId){
  cardContainer= document.querySelector(`#cardId${cardId}`)
  cardContainer.remove()
}
