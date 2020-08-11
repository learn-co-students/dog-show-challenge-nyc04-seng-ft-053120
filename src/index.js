document.addEventListener('DOMContentLoaded', () => {

    const dogTable = document.querySelector('#table-body')
    const dogForm = document.querySelector('#dog-form')
    let input = document.createElement('input')
        input.type = "hidden"
        input.name = "dogId"
        dogForm.prepend(input)

    fetch('http://localhost:3000/dogs')
        .then((response) => response.json())
        .then((dogArray) => {
            dogArray.forEach((dog) => {
                dogToHTML(dog)

            })

        })

    const dogToHTML = (digs) => {
        const trTag = document.createElement('tr')
        const tdTagName = document.createElement('td')
            tdTagName.innerText = digs.name
        const tdTagBreed = document.createElement('td')
            tdTagBreed.innerText = digs.breed
        const tdTagSex = document.createElement('td')
            tdTagSex.innerText = digs.sex
        const tdTagButt = document.createElement('td')
        const button = document.createElement('button')
            button.innerText = "Edit"

        tdTagButt.append(button)

        trTag.append(tdTagName, tdTagBreed, tdTagSex, tdTagButt)
        dogTable.append(trTag)


        
        //neede an event listener for form 'button'

        button.addEventListener('click', (evt) => {
            dogForm.dogId.value = digs.id
            dogForm.name.value = digs.name
            dogForm.breed.value = digs.breed
            dogForm.sex.value = digs.sex
        })

        
        
    }
            dogForm.addEventListener('submit', (evt) => {
                evt.preventDefault()
    
    
                fetch(`http://localhost:3000/dogs/${dogForm.dogId.value}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: dogForm.name.value,
                        breed: dogForm.breed.value,
                        sex: dogForm.sex.value
                    })
                })
                    .then((response) => response.json())
                    .then((updatedDog) => {

                        console.log(updatedDog)

                        dogTable.innerHTML = ""
                        // tdTagName.innerText = updatedDog.name
                        // tdTagBreed.innerText = updatedDog.breed
                        // tdTagSex.innerText = updatedDog.sex
                    })
    
            })
})