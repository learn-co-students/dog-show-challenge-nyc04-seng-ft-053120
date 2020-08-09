document.addEventListener('DOMContentLoaded', () => {
})

let dogTable = document.querySelector("#table-body")
let dogEditForm = document.querySelector("#dog-form")

let dogFetch = () => {
  fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then((dogObjArr) => {
    dogTable.innerHTML = ""
    dogObjArr.forEach((dogObj) => {
      turnDogIntoHTML(dogObj)
    })
  })
}

dogFetch()

let turnDogIntoHTML = (dogObj) => {
  let dogRow = document.createElement("tr")

  let dogNameTd = document.createElement("td")
    dogNameTd.innerText = dogObj.name

  let dogBreedTd = document.createElement("td")
    dogBreedTd.innerText = dogObj.breed

  let dogSexTd = document.createElement("td")
    dogSexTd.innerText = dogObj.sex

  let editButtonTd = document.createElement("td")
  let editButton = document.createElement("button")
    editButton.innerText = "Edit"
    editButtonTd.append(editButton)

  dogRow.append(dogNameTd, dogBreedTd, dogSexTd, editButtonTd)
  dogTable.append(dogRow)

  editButton.addEventListener("click", (evt) => {
    dogEditForm.name.value = dogObj.name
    dogEditForm.breed.value = dogObj.breed
    dogEditForm.sex.value = dogObj.sex
    dogEditForm.id.value = dogObj.id

    // let edit = (evt) => {
    //   evt.preventDefault()
    //   dogObj.name = evt.target.name.value
    //   dogObj.breed = evt.target.breed.value
    //   dogObj.sex = evt.target.sex.value

    //   fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
    //     method: "PATCH",
    //     headers: {
    //       "content-type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       name: dogObj.name,
    //       breed: dogObj.breed,
    //       sex: dogObj.sex
    //     })
    //   })
    //   .then(res => res.json())
    //   .then(updatedDogObj => {
    //     console.log(updatedDogObj)
    //     dogNameTd.innerText = updatedDogObj.name
    //     dogBreedTd.innerText = updatedDogObj.breed
    //     dogSexTd.innerText = updatedDogObj.sex
    //   })
    //   evt.target.reset()
    //   dogEditForm.removeEventListener("submit", edit)
    // }

    // dogEditForm.addEventListener("submit", edit)
  })
}

dogEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault()

  fetch(`http://localhost:3000/dogs/${evt.target.id.value}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: evt.target.name.value,
      breed: evt.target.breed.value,
      sex: evt.target.sex.value
    })
  })
  .then(res => res.json())
  .then(updatedDogObj => {
    dogFetch()
  })
  evt.target.reset()
})