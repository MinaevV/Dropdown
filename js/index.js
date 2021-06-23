document.addEventListener("DOMContentLoaded", function () {
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

  const ADD = 'Add';
  const EDIT = 'Edit';

  if (localStorage.options === undefined) {
    setDefaults();
    load();
  } else {
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
      appendOption(el);
    });

    newName.value = list[list.selectedIndex].value;

    index = JSON.parse(localStorage.index);
    list.selectedIndex = index;
    localStorage.index = JSON.stringify(index);
  }

  function appendOption(el) {
    const tempOpt = document.createElement("option");
    tempOpt.text = tempOpt.value = el;
    if (document.contains(document.querySelector('select'))) {
      document.querySelector("select").append(tempOpt);
    }
  }

  function valid() {
    field.classList.remove("__invalid-anim");
  }

  function invalid() {
    field.classList.remove("__invalid-anim");
    field.classList.add("__invalid-anim");
    field.classList.add("__invalid-highlight");
  }

  function validation(calledFrom) {
    const value = newName.value.trim();

    options = JSON.parse(localStorage.options);

    if (value.length) {
      valid();
      field.classList.remove("__invalid-highlight");

      switch (calledFrom) {
        case "Edit":
          if (options.find((item) => item == value) === newName.value) {
            if (newName.value !== list[list.selectedIndex].value) {
              alert("Такое название уже есть, выберете пожалуйста другое");
              return false;
            }
            return false;
          }
          break;
        case "Add":
          if (options.find((item) => item == value) === newName.value) {
            alert("Такое название уже есть, выберете пожалуйста другое");
            return false;
          } else {
            return true;
          }
          break;
        default:
          false;
      }

      return true;
    } else {
      invalid();
    }
  }

  listParent.addEventListener("change", () => {
    newName.value = list[list.selectedIndex].value;
    index = list.selectedIndex;
    localStorage.index = JSON.stringify(index);
  });

  newName.addEventListener("focus", () => {
    field.classList.remove("__invalid-highlight");
  });
  

  editBtn.addEventListener("click", () => {
    if (validation(EDIT)) {
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

    if (validation(ADD)) {
      options = JSON.parse(localStorage.options);
      options.push(value);
      appendOption(value);
      localStorage.options = JSON.stringify(options);

      // select added option
      list[list.length - 1].selected = true;
      newName.value = list[list.selectedIndex].value;
      index = list.selectedIndex;
      localStorage.index = JSON.stringify(index);
    }
  });
});
