const dogForm = document.getElementById('dog-form');
const dogTableBody = document.getElementById('table-body');

fetchAndDisplayDogs();
dogForm.addEventListener('submit', patchDog);

function patchDog(e) {
  e.preventDefault();
  const id = parseInt(dogForm.querySelector('#current-dog-id').dataset['currentDogId']);

  const name = dogForm['name'].value;
  const breed = dogForm['breed'].value;
  const sex = dogForm['sex'].value;
  console.log(sex);

  const patchConfig = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      breed, breed,
      sex: sex
    })
  }

  fetch(`http://localhost:3000/dogs/${id}`, patchConfig)
    .then(res => res.json())
    .then(dog => updateRow(dog));

  dogForm.reset();
}

function updateRow(dog) {
  const row = dogTableBody.querySelector(`[data-dog-id='${dog.id}']`);
  const nameTd = row.querySelector('td.dog-name');
  const breedTd = row.querySelector('td.dog-breed');
  const sexTd = row.querySelector('td.dog-sex');

  nameTd.textContent = dog.name;
  breedTd.textContent = dog.breed;
  sexTd.textContent = dog.sex;
}

function fetchAndDisplayDogs() {
  fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => addDogRow(dog)))
}

function addDogRow(dog) {
  const dogRow = createDogRow(dog);
  dogTableBody.append(dogRow);
}

function createDogRow(dog) {
  const dogTr = document.createElement('tr');
    dogTr.dataset['dogId'] = dog.id;
  
    const dogNameTd = document.createElement('td');
      dogNameTd.textContent = dog.name;
      dogNameTd.className = "dog-name";

    const dogBreedTd = document.createElement('td');
      dogBreedTd.textContent = dog.breed;
      dogBreedTd.className = "dog-breed";
      
    const dogSexTd = document.createElement('td');
      dogSexTd.textContent = dog.sex;
      dogSexTd.className = "dog-sex";

    const editB = document.createElement('button');
      editB.textContent = "Edit Dog"
      editB.addEventListener('click', fillForm);

    const dogEditTd = document.createElement('td');
      dogEditTd.append(editB);

    dogTr.append(dogNameTd, dogBreedTd, dogSexTd, dogEditTd);
    return dogTr;
}

function fillForm(e) {
  const currentHiddenInput = dogForm.querySelector('#current-dog-id');
  if (currentHiddenInput !== null) {
    currentHiddenInput.remove();
  }

  const dogTr = e.target.closest('tr');
  const nameTd = dogTr.querySelector('td.dog-name');
  const breedTd = dogTr.querySelector('td.dog-breed');
  const sexTd = dogTr.querySelector('td.dog-sex');

  const dogName = nameTd.textContent;
  const dogBreed = breedTd.textContent;
  const dogSex = sexTd.textContent;
  const dogId = dogTr.dataset['dogId'];

  const hiddenInput = document.createElement('input');
    hiddenInput.type = "hidden";
    hiddenInput.id = "current-dog-id"
    hiddenInput.dataset['currentDogId'] = dogId;
  
  dogForm.prepend(hiddenInput);
  dogForm['name'].value = dogName;
  dogForm['breed'].value = dogBreed;
  dogForm['sex'].value = dogSex;
}