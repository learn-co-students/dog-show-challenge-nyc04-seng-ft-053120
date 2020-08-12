document.addEventListener('DOMContentLoaded', () => {
})


let tableBody = document.querySelector("#table-body")
let dogForm = document.querySelector("#dog-form")

let getdogs = () => {
    fetch(`http://localhost:3000/dogs`)
    .then(r=>r.json())
    .then((dogs) => {
        tableBody.innerHTML = ""
        dogs.forEach((dog) => {
            turnDogIntoHTML(dog)
        })
    })
}

    getdogs()

let turnDogIntoHTML = (dog) =>{
    let dogRow = document.createElement("tr")

    let dogName = document.createElement("td")
    dogName.innerText = dog.name

    let dogBreed = document.createElement("td")
    dogBreed.innerText = dog.breed  

    let dogSex = document.createElement("td")
    dogSex.innerText = dog.sex

    let buttonColumn = document.createElement("td")
    let editButton = document.createElement("button")
    editButton.innerText = "Edit"

    buttonColumn.append(editButton)
    dogRow.append(dogName, dogBreed, dogSex, buttonColumn)
    tableBody.append(dogRow)

    editButton.addEventListener("click", (event) => {
        dogForm.name.value = dog.name
        dogForm.breed.value = dog.breed
        dogForm.sex.value = dog.sex
        dogForm.id.value = dog.id
    })
}

        dogForm.addEventListener("submit", (event) => {
            event.preventDefault()
            let nameNew = event.target.name.value
            let breedNew = event.target.breed.value
            let sexNew = event.target.sex.value
           
         fetch(`http://localhost:3000/dogs/${event.target.id.value}`, {
             method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: nameNew,
                breed: breedNew,
                sex: sexNew
            })
        })
        .then(r => r.json())
        .then(updatedDog => {
          getdogs()
          event.target.reset()
     })
    }) 