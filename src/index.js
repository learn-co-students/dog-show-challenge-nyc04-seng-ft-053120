const dogForm = document.querySelector("#dog-form")
const dogTableBody = document.querySelector("#table-body")
let currentDog

const fetchAllDogs = () => {
  fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogArray => {
      console.log(dogArray)

      dogTableBody.innerHTML = ""

      dogArray.forEach(dog => {
        renderDog(dog)
      });
    })
}

const renderDog = (dog) => {

  const tableRow = document.createElement("tr")

  const nameTableCell = document.createElement("td")
  const breedTableCell = document.createElement("td")
  const sexTableCell = document.createElement("td")
  const buttonTableCell = document.createElement("td")

  const editButton = document.createElement("button")
  editButton.innerText = "Edit"
  editButton.addEventListener("click", (evt) => {
    populateEditForm(dog)
  })

  nameTableCell.innerText = dog.name
  breedTableCell.innerText = dog.breed
  sexTableCell.innerText = dog.sex

  buttonTableCell.append(editButton)

  tableRow.append(nameTableCell, breedTableCell, sexTableCell, buttonTableCell)
  dogTableBody.append(tableRow)
}

const populateEditForm = (dog) => {
  currentDog = dog
  dogForm.name.value = dog.name
  dogForm.breed.value = dog.breed
  dogForm.sex.value = dog.sex
}

dogForm.addEventListener("submit", (evt) => {
  evt.preventDefault()

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: evt.target.name.value,
      sex: evt.target.sex.value,
      breed: evt.target.breed.value
    })
  }

  console.log(options)
  fetch(`http://localhost:3000/dogs/${currentDog.id}`, options)
    .then(res => res.json())
    .then(updatedDog => {
      fetchAllDogs()
    })
})

fetchAllDogs()
