const dogTableBody = document.querySelector("tbody#table-body");
const dogEditForm = document.querySelector("#dog-form");
const formName = dogEditForm.name;
const formBreed = dogEditForm.breed;
const formSex = dogEditForm.sex;

function getDogs() {
  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then((dogObjectArray) => {
      dogObjectArray.forEach((dogObject) =>
        gentlySlapThatDogOnTheDOM(dogObject)
      );
    });
}

function gentlySlapThatDogOnTheDOM(dogObject) {
  const dogTr = document.createElement("tr");

  for (let attr in dogObject) {
    if (attr !== "id") {
      let dogTd = document.createElement("td");
      dogTd.innerText = dogObject[attr];
      dogTr.append(dogTd);
      if (attr === "sex") {
        let dogTd = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        dogTd.append(editButton);
        dogTr.append(dogTd);
        editButton.addEventListener("click", (editButtonEvt) => {
          populateEditForm(editButtonEvt, dogObject);
        });
      }
    }
  }

  dogTableBody.append(dogTr);
}

function populateEditForm(editButtonEvt, dogObject) {
  formName.value = dogObject.name;
  formBreed.value = dogObject.breed;
  formSex.value = dogObject.sex;

  dogEditForm.addEventListener("submit", (editFormEvt) => {
    editFormEvt.preventDefault();

    const editedDogObject = {
      name: formName.value,
      breed: formBreed.value,
      sex: formSex.value,
    };

    fetch("http://localhost:3000/dogs/" + dogObject.id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedDogObject),
    })
      .then((response) => response.json())
      .then((editedDogObject) => {
        const dogRow = editButtonEvt.target.parentElement.parentElement;

        dogRow.firstChild.innerText = editedDogObject.name;
        dogRow.children[1].innerText = editedDogObject.breed;
        dogRow.children[2].innerText = editedDogObject.sex;
        dogEditForm.reset();
      });
  });
}

getDogs();