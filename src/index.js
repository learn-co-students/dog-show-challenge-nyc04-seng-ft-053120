document.addEventListener('DOMContentLoaded', () => {

})

let tableBody = document.querySelector('#table-body')
let newForm = document.querySelector('#dog-form')
let nameInput = document.getElementsByTagName('input')[0]


fetch("http://localhost:3000/dogs") 
.then(res => res.json())
.then(dogArr => dogArr.forEach((dog) => {
    renderDog(dog)
}))

let renderDog = (dogObj) => {

    let dogTr = document.createElement('tr')
        
    let nameTd = document.createElement('td')
        nameTd.innerText = dogObj.name

    let breedTd = document.createElement('td')
        breedTd.innerText = dogObj.breed

    let sexTd = document.createElement('td')
        sexTd.innerText = dogObj.sex

    let buttonTd = document.createElement('td')
            let editButton = document.createElement('button')
                editButton.innerText = 'Edit'

    buttonTd.append(editButton)
    dogTr.append(nameTd, breedTd, sexTd, buttonTd)
    tableBody.append(dogTr)

    editButton.addEventListener('click', (evt) => {
        console.log(nameInput.name.value = dogObj.name)
        //this will populate the information of this specific dog within the edit form
        newForm.name.value = dogObj.name
        newForm.breed.value = dogObj.breed
        newForm.sex.value = dogObj.sex

        editDog()
    })

    function editDog(){

        console.log('I am inside function')
        newForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            let newName = evt.target.name.value
            let newBreed = evt.target.breed.value
            let newSex = evt.target.sex.value

            // console.log(newName)
            // console.log(newBreed)
            // console.log(newSex)
            // console.log(dogObj)
            // console.log('hello')
            fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    name: newName,
                    breed:newBreed,
                    sex: newSex,
                })
            })
            .then(res => res.json())
            .then(updatedPost => {
                 nameTd.innerText = updatedPost.name
                 breedTd.innerText = dogObj.breed
                 sexTd.innerText = dogObj.sex
            }
            )

        //     fetch("http://localhost:3000/dogs")
        //     .then(res => res.json())
        //    .then(updatedArr => updatedArr.forEach((dog) => {
        //        renderDog(dog)
        //    }))


        })
    }





}