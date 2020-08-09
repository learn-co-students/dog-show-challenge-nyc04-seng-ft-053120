const dogForm = document.querySelector('form#dog-form')
const dogTable = document.querySelector('table') 
getDogs()

function getDogs() {
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(arrayDogObjs => {
        let dogTrs = document.querySelectorAll('table > tr')
        dogTrs.forEach((dogTr) => dogTr.remove())
        arrayDogObjs.forEach(dogObj => turnDogObjToHTML(dogObj))
    })
};

function turnDogObjToHTML(dogObj) {
    let dogDisplayTr = document.createElement('tr')
    let dogNameTd = createTd(dogObj.name)
    let dogBreedTd = createTd(dogObj.breed)
    let dogSexTd = createTd(dogObj.sex)
    let dogEditTd = createTd()
    let editButton = document.createElement('button')
        editButton.innerText = "Edit Dog"
    
    editButton.addEventListener('click', (e) => {
        dogForm.id.value = dogObj.id
        dogForm.name.value = dogObj.name
        dogForm.breed.value = dogObj.breed
        dogForm.sex.value = dogObj.sex
    });

    dogEditTd.append(editButton)
    dogDisplayTr.append(dogNameTd, dogBreedTd, dogSexTd, dogEditTd)
    dogTable.append(dogDisplayTr)

};

function createTd(innerTextString = "") {
    let td = document.createElement('td')
        td.innerText = innerTextString
        return td
};

dogForm.addEventListener('submit', function(e) {
    e.preventDefault()
    updateDog(this)
});

function updateDog(dogObjForm) {
    let dogObjInputs = {
        id: parseInt(dogObjForm.id.value),
        name: dogObjForm.name.value,
        breed: dogObjForm.breed.value,
        sex: dogObjForm.sex.value
    }
    
    fetch(`http://localhost:3000/dogs/${dogObjInputs.id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(dogObjInputs)
    })
    .then(response => response.json())
    .then(updatedDogObj => {
        getDogs()
    })
};