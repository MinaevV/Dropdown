let list = document.getElementById("home-changer").options;
const listParent = document.getElementById("home-changer");

const editBtn = document.getElementById("edit");
const addBtn = document.getElementById("add");

const newName = document.getElementById("home-new");

const field = document.getElementById("home-edit");
const fieldValidity = document.querySelector(".home-edit__validity");

const defaultOptions = ["Home 1", "Home 2", "Home 3"];
let options = defaultOptions.slice();

const defaultIndex = 0;

// localStorage.clear();

if (localStorage.options === undefined) {
  console.log("list was empty, filled");
  setDefaults();
  loadDefaults();
} else {
  console.log("list is not emgty, loaded from lS");

  loadDefaults();
}

init();

function setDefaults() {
  localStorage.options = JSON.stringify(options);
}

function loadDefaults() {
  const parsedOptions = JSON.parse(localStorage.options);


  parsedOptions.forEach((el) => {
    addDOMElement(el);
  });
}

function addDOMElement(el) {
  const tempOpt = document.createElement("option");
  tempOpt.text = tempOpt.value = el;
  document.querySelector("select").append(tempOpt);
}

// tempOpt.text = tempOpt.value = newName.value;

// add as html options to select
// save to LS
// after edit/add update data in LS

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

    return true;
  } else {
    invalid();
  }
}

function init() {
  newName.value = list[list.selectedIndex].value;
}


listParent.addEventListener("change", () => {
  newName.value = list[list.selectedIndex].value;
});

editBtn.addEventListener("click", () => {
  if (validation()) {
    list[list.selectedIndex].value = list[list.selectedIndex].text = options[list.selectedIndex] = newName.value;
    localStorage.options = JSON.stringify(options);
  }
});

addBtn.addEventListener("click", () => {
  const value = newName.value.trim();

  if (value.length) {
    options.push(value);
    localStorage.options = JSON.stringify(options);
    addDOMElement(value);

    // select added option
    list[list.length - 1].selected = true;
  } else {
    invalid();
  }
});
