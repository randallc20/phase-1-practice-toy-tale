"use strict"
let addToy = false;

document.addEventListener("DOMContentLoaded", (e) => {
  //invoke my functions here inside the DOMContentLoaded
  e.preventDefault()
  getToys()
  createToySubmitListener()
  // this shows that the element has the id I want
  // let test = document.getElementById("create-toy")
  // console.log(test)

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
  toyLikes.innerHTML = `${toys.likes}`
  //console.log(toyLikes.innerHTML)
  //create the like button
  toyLikes.id=`${toys.id}`
  //console.log(card.id)
  likeBtn.id = "like-button"
  likeBtn.innerText = "Like"
  likeBtn.addEventListener("click", e => likes(e,toys.id))
  //add the elements with the data to the page
  card.append(toyName, toyImg, toyLikes, likeBtn)
  document.getElementById("toy-collection").appendChild(card)
}

//this is the submit button listener that calls postNewToy to then post the new Toy
function createToySubmitListener(){
  //console.log("This is printing :)")
  //console.log(document.getElementById("create-toy"))
  document.getElementById("submit-form").addEventListener("submit", (e) =>{
    e.preventDefault();
    const toyName = document.getElementById("input-toy-name").value
    const toyImg = document.getElementById("input-img-url").value
    const newLikes = 0;
    let newToy = {name:toyName, image:toyImg, likes:newLikes}
    createToyCard(newToy)
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
function likes(e, id){
  e.preventDefault();
  //console.log("this should show when I press a like button")
  let likes = parseInt(document.getElementById(id).innerText) +1
  let updateLikes = parseInt(document.getElementById(id).innerText) +1
  document.getElementById(id).innerText = updateLikes
  //console.log(likes)
  fetch(toyUrl + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": likes
      })
    })
    .then(response => response.json()).then(data => {
      createToyCard(data)
    });
}

