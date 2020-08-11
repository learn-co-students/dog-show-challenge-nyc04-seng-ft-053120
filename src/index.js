document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'http://localhost:3000/dogs';
  const tableBody = document.querySelector('#table-body');
  const dogForm = document.querySelector('#dog-form');

  fetch(BASE_URL)
    .then((response) => response.json())
    .then((dogArray) => {
      dogArray.forEach((dog) => {
        displayDog(dog);
      });
    });

  const displayDog = (dog) => {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('table-row');

    const dogName = document.createElement('td');
    dogName.innerText = dog.name;
    dogName.id = 'name';
    dogName.classList.add('dog-table-name');

    const dogBreed = document.createElement('td');
    dogBreed.innerText = dog.breed;
    dogBreed.id = 'breed';
    dogBreed.classList.add('dog-table-breed');

    const dogSex = document.createElement('td');
    dogSex.innerText = dog.sex;
    dogSex.id = 'sex';
    dogSex.classList.add('dog-table-sex');

    const editDogButton = document.createElement('button');
    editDogButton.innerText = 'Edit Dog';
    editDogButton.classList.add('edit-dog-btn');

    tableRow.append(dogName, dogBreed, dogSex, editDogButton);
    tableBody.append(tableRow);

    editDogButton.addEventListener('click', (event) => {
      dogForm.name.value = dog.name;
      dogForm.breed.value = dog.breed;
      dogForm.sex.value = dog.sex;

      dogForm.addEventListener('submit', (event) => {
        const API_PATH = `/${dog.id}`;
        const name = event.target.name.value;
        const breed = event.target.breed.value;
        const sex = event.target.sex.value;

        const attributePatch = {
          name,
          breed,
          sex,
        };

        fetch(`${BASE_URL}${API_PATH}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(attributePatch),
        })
          .then((response) => response.json())
          .then((dog) => {
            displayDog(dog);
          });
      });
    });
  };
});
