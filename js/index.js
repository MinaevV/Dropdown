let list = document.getElementById("home-changer").options;
const listParent = document.getElementById("home-changer");

const editBtn = document.getElementById("edit");
const addBtn = document.getElementById("add");

const newName = document.getElementById("home-new");

const field = document.getElementById("home-edit");
const fieldValidity = document.querySelector(".home-edit__validity");

updValue();

editBtn.addEventListener("click", () => {
  validation();
  updValue();
});

function valid() {
  field.classList.remove("__invalid");
  fieldValidity.classList.remove("__invalid");
}

function invalid() {
  field.classList.add("__invalid");
  fieldValidity.classList.add("__invalid");

  setTimeout(valid, 1000);
}

function validation() {
  const value = newName.value.trim();

  if (value.length) {
    valid();

    list[list.selectedIndex].value = value;
    list[list.selectedIndex].text = value;
    newName.blur();
    newName.value = null;
  } else {
    invalid();
  }
}

function updValue() {
  newName.value = list[list.selectedIndex].value;
}

listParent.addEventListener("change", () => {
  updValue();
});
