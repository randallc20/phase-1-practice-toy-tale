"use strict"
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  //invoke my functions here inside the DOMContentLoaded
  getToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      //console.log("this displays when clicking add new toy")
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyUrl = "http://localhost:3000/toys";
function getToys(){
  fetch(toyUrl)
  .then(response => response.json())
  .then(data => {
    for(let x=0; x<data.length; x++){
      createToyCard(data[x])
    }
  });

}

//h2 with toy name - //img with src of toy image - p tag with the like 
//like button
function createToyCard(toys){
  //create the elements
  let card = document.createElement("div")
  let toyName = document.createElement("h2")
  let toyImg = document.createElement("img")
  let toyLikes = document.createElement("p")
  let likeBtn = document.createElement("button")
  //add the data to the innerHTML
  toyName.innerHTML = `${toys.name}`
  toyImg.width = "200"
  toyImg.height = "200"
  toyImg.src = toys.image
  toyLikes.innerHTML = `Like: ${toys.likes}`
  //create the like button
  likeBtn.id = "like-button"
  likeBtn.innerText = "Like"
  //add the elements with the data to the page
  card.append(toyName, toyImg, toyLikes, likeBtn)
  document.getElementById("toy-collection").appendChild(card)
}

function createNewToy(){
  const newCard = document.createElement("div").id="new-card"
  const newName = document.createElement("h2").id="new-name"
  const newImg = document.createElement("img").id="new-img"
  const newLikes = document.createElement("p").id="new-likes"
  const newBtn = document.createElement("button").id="new-btn"
  newBtn.innerText = "Like"
  newCard.append(newName, newImg, newLikes, newBtn)
  document.getElementById("toy-collection").appendChild(newCard)
  createToySubmitListener()
}

function createToySubmitListener(){
  document.getElementById("create-toy").addEventListener("submit", (e) =>{
    e.preventDefault();
    const toyName = document.getElementById().value
    const toyImg = document.getElementById().value
    const newLikes = 0;
    let newToy = {name:toyName, image:toyImg, likes:newLikes}
    postNewToy(toyUrl, newToy)
  });

}

function postNewToy(toyUrl, data={}){
  fetch(toyUrl, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
    }, body: JSON.stringify(data)
}).then(response => response.json()).then(data => console.log(data));
}

//create the like button functionality and use a patch
function likes(e){
  e.preventDefault();
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((response => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}
