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
  const cardEditButton = document.createElement('button')
  const showCardModalClose_button = document.createElement('span')

  showCardModal.className="modal"
  showCardModal.id="showCardModal"

  showCardModal_content.id="card-modal-content"

  cardEditButton.innerText="Edit"
  cardEditButton.id="cardEditButton"
  cardEditButton.value=card_id
  cardEditButton.addEventListener('click', () => editCard(showCardModal_content, showCardModal))
  

  showCardModalClose_button.className="close-button"
  showCardModalClose_button.innerText = 'x'
  showCardModalClose_button.addEventListener("click", ()=> {
    toggleModal() 
    campaignCardModal.classList.toggle("show-modal")
  })

  showCardModal_content.append(cardEditButton, showCardModalClose_button)

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
  const showCardInfoDiv = document.createElement('div')
  const name = document.createElement('h3')
  const shortDescription = document.createElement('p')
  const text = document.createElement('p')
  const addRelationshipLabel = document.createElement('p')
  const cardDropdownMenu = document.createElement('select')
  const addParentButton = document.createElement('button')
  const addChildButton = document.createElement('button')
  const parentCardsLabel = document.createElement('h4')
  const parentCardDiv = document.createElement('div')
  const childCardLabel = document.createElement("h4")
  const childCardDiv = document.createElement('div')
  const image = document.createElement('img')
  const deleteButton = document.createElement('button')

  showCardInfoDiv.id ="showCardInfoDiv"

  name.innerText = card.name
  name.id ="showCardName"
  shortDescription.innerText = card.short_description
  shortDescription.id ="showCardDescription"
  text.innerText = card.text
  text.id = "showCardText"
  image.src = card.image
  image.id = "showCardImage"

  showCardInfoDiv.append(
    name,
    shortDescription,
    text,
    image)

  addRelationshipLabel.innerText = "Add a Card Relationship:"

  cardDropdownMenu.type ="search"
  cardDropdownMenu.name ="card_id"
  cardDropdownMenu.id ="cardDropdown"
  populateCardDropdownMenu(cardDropdownMenu, card.campaign_id)

  addParentButton.innerText = "Parent"
  addParentButton.addEventListener('click', ()=> addParentCard(card.id, parseInt(cardDropdownMenu.value), parentCardDiv))

  addChildButton.innerText = "Child"
  addChildButton.addEventListener('click', ()=> addChildCard(parseInt(cardDropdownMenu.value), card.id, childCardDiv))

  parentCardsLabel.innerText = "Parent Cards"
  parentCardDiv.id = "parentCardDiv"
  populateParentCardDiv(card, parentCardDiv)
  parentCardDiv.addEventListener('click', (event) => {
    if(event.path[0].id === "removeButton"){
      removeCardRelationship(card.id, event.target.value)
      event.target.parentNode.remove()
    }
    else {
    testForShowCardModal(event.path[event.path.length-8].querySelector('#relationshipCardId').value)
    }
  })

  childCardLabel.innerText = "Child Cards"
  childCardDiv.id = "childCardDiv"
  populateChildCardDiv(card, childCardDiv)
  childCardDiv.addEventListener('click', (event) => {
    if(event.path[0].id === "removeButton"){
      removeCardRelationship(event.target.value, card.id)
      event.target.parentNode.remove()
    }
    else {
    testForShowCardModal(event.path[event.path.length-8].querySelector('#relationshipCardId').value)
    }
  })
  
  deleteButton.innerText = "Delete"
  deleteButton.value = card.id
  deleteButton.addEventListener('click', () => {deleteCard(event.target.value, showCardModal)})

  showCardModal_content.append(
    showCardInfoDiv, 
    addRelationshipLabel,
    cardDropdownMenu,
    addParentButton,
    addChildButton,
    parentCardsLabel,
    parentCardDiv, 
    childCardLabel,
    childCardDiv, 
    deleteButton)
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

function populateCardDropdownMenu(cardDropdownMenu, campaign_id){
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
    const defaultOption = document.createElement('option')
    
    defaultOption.value="none" 
    defaultOption.selected
    defaultOption.disabled 
    defaultOption.hidden
    defaultOption.innerText = "Select a Card" 

    cardDropdownMenu.appendChild(defaultOption)

    cards.map(card => {
    const cardOption = document.createElement('option')

    cardOption.value = card.id
    cardOption.innerText = card.name

    cardDropdownMenu.appendChild(cardOption)
    })  
  })
}

function addParentCard(child_card_id, parent_card_id, parentCardDiv){
  fetch('http://localhost:3000/card_relationships', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    authorization: `bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({"card_relationships":{child_card_id, parent_card_id}})
  })
  .then(response => response.json())
  .then(newRelationshipData => {
    const parentCard = newRelationshipData.parent_card
    createParentCard(parentCard, parentCardDiv)
  })
}

function populateParentCardDiv(card, parentCardDiv){
  parentCards = card.parentCards
  parentCards.map(parentCard => {
    createParentCard(parentCard, parentCardDiv)
  })
}

function createParentCard(parentCard, parentCardDiv){
    const relationshipCardDiv = document.createElement('div')
    const name = document.createElement('p')
    const image = document.createElement('img')
    const cardId = document.createElement('input')
    const removeButton = document.createElement('button')

    cardId.type="hidden"
    cardId.value = parentCard.id
    cardId.id = "relationshipCardId"

    relationshipCardDiv.className="relationshipCardCard"

    name.innerText = parentCard.name
    name.className = "relationshipCardName"

    removeButton.innerText = "remove"
    removeButton.id="removeButton"
    removeButton.value = `${parentCard.id}`

    image.className = "relationshipCardImage"
    if (parentCard.image){
      image.src = parentCard.image
    }
    else {
      image.src = "./resources/images/defaultCardImage.jpg"
    }

    relationshipCardDiv.append(image, name, cardId, removeButton)
    parentCardDiv.append(relationshipCardDiv)
}

function addChildCard(child_card_id, parent_card_id, childCardDiv){
  fetch('http://localhost:3000/card_relationships', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    authorization: `bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({"card_relationships":{child_card_id, parent_card_id}})
  })
  .then(response => response.json())
  .then(newRelationshipData => {
    const childCard = newRelationshipData.child_card
    createChildCard(childCard, childCardDiv)
  })
}

function populateChildCardDiv(card, childCardDiv){
  childCards = card.childCards
  childCards.map(childCard => {
    createChildCard(childCard, childCardDiv)
  })
}

function createChildCard(childCard, childCardDiv){
  
    const relationshipCardDiv = document.createElement('div')
    const name = document.createElement('p')
    const image = document.createElement('img')
    const cardId = document.createElement('input')
    const removeButton = document.createElement('button')
  
    cardId.type="hidden"
    cardId.value = childCard.id
    cardId.id = "relationshipCardId"

    relationshipCardDiv.className="relationshipCardCard"

    name.innerText = childCard.name
    name.className = "relationshipCardName"

    image.className = "relationshipCardImage"
    if (childCard.image){
      image.src = childCard.image
    }
    else {
      image.src = "./resources/images/defaultCardImage.jpg"
    }

    removeButton.innerText = "remove"
    removeButton.id="removeButton"
    removeButton.value = `${childCard.id}`

    relationshipCardDiv.append(image, name, cardId, removeButton)
    childCardDiv.append(relationshipCardDiv)
}

function editCard(showCardModal_content, showCardModal){
  showCardInfoDiv = document.querySelector('#showCardInfoDiv')
  title = document.querySelector('#showCardName')
  shortDescription = document.querySelector('#showCardDescription')
  text = document.querySelector('#showCardText')
  image = document.querySelector('#showCardImage')

  const updateCardForm = document.createElement('form')
  const updateTitle = document.createElement('input')
  const updateShortDescription= document.createElement('input')
  const updateText = document.createElement('textarea')
  const updateImage= document.createElement('input')
  const updateSubmitButton = document.createElement('button')

  updateCardForm.id="updateCardForm"
  updateTitle.value = title.innerText
  updateTitle.id ="updateTile"
  updateTitle.name = "name"
  updateShortDescription.value = shortDescription.innerText
  updateShortDescription.id="updateShortDescription"
  updateShortDescription.name = "short_description"
  updateText.value = text.innerText
  updateText.id = "updateText"
  updateText.name = "text"
  updateImage.value = image.src
  updateImage.id ="updateImage"
  updateImage.name = "image"

  updateSubmitButton.innerText = "update"
  updateSubmitButton.id = "updateSubmitButton"
  updateSubmitButton.addEventListener('click', event => {
    event.preventDefault()
    formData = new FormData(updateCardForm)
    updateCardFetch(formData)

    title.innerText = updateTitle.value
    shortDescription.innerText = updateShortDescription.value
    text.innerText = updateText.value
    if (updateImage.innerText = "http://localhost:3001/"){  
      } 
    else {
      image.src=updateImage.value
      }
    
      updateCardForm.parentNode.replaceChild(showCardInfoDiv, updateCardForm)

  })

  updateCardForm.append(updateTitle, updateShortDescription, updateText, updateImage, updateSubmitButton)

  showCardInfoDiv.parentNode.replaceChild(updateCardForm, showCardInfoDiv)
  
}

function updateCardFetch(formData){
  const id = document.querySelector("#cardEditButton").value
  const name = formData.get("name")
  const short_description = formData.get("short_description")
  const text = formData.get("text")
  let image = formData.get("image")

  if (image === "http://localhost:3001/"){image = ""}
  
  fetch('http://localhost:3000/update_card',{
  method: "PATCH",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  authorization: `bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify({card: {id, name, short_description, text, image}})
  })
  .then(response => response.json())
}

function removeCardRelationship(child_card_id, parent_card_id){
  
  fetch('http://localhost:3000/destroy_relationship', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    authorization: `bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({"card_relationships":{child_card_id, parent_card_id}})
  })
}