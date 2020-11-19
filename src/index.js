//DOM Stable Elements
const tableBody = document.querySelector('#table-body');

fetch("http://localhost:3000/dogs")
.then((response) => response.json())
.then((dogArray) => {
  dogArray.forEach((dog) => {
    turnDogToHTML(dog);
  });
});

const turnDogToHTML = (dogObject) => {
    const tableRow = document.createElement('tr')


    const dogNameTd = document.createElement('td')
    dogNameTd.innerText = dogObject.name
    const dogBreedTd = document.createElement('td')
    dogBreedTd.innerText = dogObject.breed
    const dogSexTd = document.createElement('td')
    dogSexTd.innerText = dogObject.sex

    const editButtonTd = document.createElement('td')
    const editButton = document.createElement('button')
    editButton.innerText = "edit"
    editButtonTd.append(editButton)

    tableRow.append(dogNameTd, dogBreedTd, dogSexTd, editButtonTd)
    tableBody.append(tableRow)

}