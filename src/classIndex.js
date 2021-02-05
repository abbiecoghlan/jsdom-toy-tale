function main(){
    fetchToys()
    createFormListener()
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
          displayToys(jsonToys)
      })
  }
  
  
  function displayToys(jsonToys) {
    const toyContainer = document.querySelector("#toy-collection")
    jsonToys.forEach(function(toy){ 
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
      newLikes.innerText = toy["likes"] + " Likes"
  
      //create a button tag with a class "like-btn" and append to the card
      let newButton = document.createElement('button')
      newButton.innerText = "Like"
      newButton.className = "like-btn"
      newButton.setAttribute('id', toy.id)
      //add an event listener to the button
      newButton.addEventListener('click', likeToy)
  
      //append the card to the toycontainer
        newDiv.append(newName, newImage, newLikes, newButton)
          toyContainer.append(newDiv)
  
    })
  }
  
  
  function likeToy(e){
    console.log("you liked this")
    e.preventDefault()
    e.target.previousElementSibling.innerText = "You pushed the like button"
  
  
  
  
      // const reqObj = {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: "application/json"
      //   },
      //   body: JSON.stringify(
      //   )
      // }
  
  //     fetch(toyUrl, reqObj)
  //       .then((res) => res.json())
  //       .then(toy => {
  //         form.reset()
  //         displayToys(toy) 
  //       })
  //   })
  // }
  
  
  
  }
  
  
  function createFormListener(){
    const form = document.querySelector('.add-toy-form')
    form.addEventListener('submit', function(event){
      event.preventDefault()
  
      const newToy = [{
        name: event.target['name'].value,
        image: event.target['image'].value,
        likes: 0
      }]
  
      console.log(newToy.likes)
  
  
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
  
  