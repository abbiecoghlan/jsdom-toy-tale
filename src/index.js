function main(){
  fetchToys()
  createFormListener()
  createLikeListener()
}

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyUrl = "http://localhost:3000/toys" 


function fetchToys(){
    fetch(toyUrl)
    .then( res => res.json() )
    .then( jsonToys => {
        jsonToys.forEach(function(toy){
          displayToys(toy)
        })


      })
}

const toyContainer = document.querySelector("#toy-collection")
function displayToys(toy) {
 
    //capture and create a div with the class "card"
    let newDiv = document.createElement('div')
    newDiv.className = "card"

    //create an h2 with the toys name and append to the card
    let newName = document.createElement('h2')
    newName.innerText = toy["name"]

    //create an im with the toys picutre, with a classname of "toy-avatar" and append to the card    
    let newImage = document.createElement('img')
    newImage.setAttribute("src", toy["image"])
    newImage.className = "toy-avatar"

    //create a p-tag that says likes and append to the card
    let newLikes = document.createElement('p')
    newLikes.setAttribute
    newLikes.innerText = toy["likes"] + " Likes"


    //create a button tag with a class "like-btn" and append to the card
    let newButton = document.createElement('button')
    newButton.innerText = "Like"
    newButton.className = "like-btn"
    newButton.setAttribute('id', toy.id)
    //add an event listener to the button
    // newButton.addEventListener('click', likeToy)

    //append the card to the toycontainer
      newDiv.append(newName, newImage, newLikes, newButton)
        toyContainer.append(newDiv)

}

function createLikeListener(e){
  toyContainer.addEventListener('click', function(e){
    if (e.target.className === 'like-btn'){
      likeToy(e)
    }
})
}


function likeToy(e){
  console.log(e.target.id)
  const id = e.target.id
  const pTag = e.target.previousElementSibling
  let likes = parseInt(pTag.innerText)

  // e.target.previousElementSibling.innerText = `0 likes`
  

    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(
      { likes : likes + 1
      })
    }

    fetch(`http://localhost:3000/toys/${id}`, reqObj)
      .then((res) => res.json())
      .then(toy => {
        pTag.innerText = `${likes + 1} likes`
      })
  }


function createFormListener(){
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', function(event){
    event.preventDefault()

    const newToy = {
      name: event.target['name'].value,
      image: event.target['image'].value,
      likes: 0
    }


    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    }

    fetch(toyUrl, reqObj)
      .then((res) => res.json())
      .then(toy => {
        form.reset()
        displayToys(toy) 
      })
  })
}











main()

