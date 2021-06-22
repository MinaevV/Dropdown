let list = document.getElementById("home-changer").options;
const listParent = document.getElementById("home-changer");

const editBtn = document.getElementById("edit");
const addBtn = document.getElementById("add");

const newName = document.getElementById("home-new");

const field = document.getElementById("home-edit");
const fieldValidity = document.querySelector(".home-edit__validity");

const defaultOptions = ["Home 1", "Home 2", "Home 3"];
let options = defaultOptions.slice();

const defaultIndex = ["0"];
let index = defaultIndex.slice();

// localStorage.clear();

if (localStorage.options === undefined) {
  console.log("list was empty, filled");
  setDefaults();
  load();
} else {
  console.log("list is not emgty, loaded from lS");
  load();
  newName.value = list[list.selectedIndex].value;
}

function setDefaults() {
  localStorage.options = JSON.stringify(options);
  localStorage.index = JSON.stringify(index);
}

function load() {
  const parsedOptions = JSON.parse(localStorage.options);

  parsedOptions.forEach((el) => {
    addDOMElement(el);
  });

  newName.value = list[list.selectedIndex].value;
  
  index = JSON.parse(localStorage.index);
  list.selectedIndex = index;
  localStorage.index = JSON.stringify(index);
}

function addDOMElement(el) {
  const tempOpt = document.createElement("option");
  tempOpt.text = tempOpt.value = el;
  document.querySelector("select").append(tempOpt);
}

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

listParent.addEventListener("change", () => {
  newName.value = list[list.selectedIndex].value;
  index = [`${list.selectedIndex}`];
  localStorage.index = JSON.stringify(index);
});

editBtn.addEventListener("click", () => {
  if (validation()) {
    localStorage.options = JSON.parse(localStorage.options);

    list[list.selectedIndex].value =
      list[list.selectedIndex].text =
      options[list.selectedIndex] =
        newName.value;
    localStorage.options = JSON.stringify(options);
    newName.value = list[list.selectedIndex].value;
  }
});

addBtn.addEventListener("click", () => {
  const value = newName.value.trim();

  if (value.length) {
    valid();

    localStorage.options = JSON.parse(localStorage.options);
    options.push(value);
    addDOMElement(value);
    localStorage.options = JSON.stringify(options);
    
    // select added option
    list[list.length - 1].selected = true;
    newName.value = list[list.selectedIndex].value;
    index = list.selectedIndex;
    localStorage.index = JSON.stringify(index);
  } else {
    invalid();
  }
});
