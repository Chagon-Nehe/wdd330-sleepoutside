// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get a parameter from the URL query string
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  //Clear the element if clear is true
  if (clear) {
    parentElement.innerHTML = " ";
  }

  // Convert each item in the list to HTML using the template function
  const htmlStrings = list.map(templateFn);

  //Insert the HTML into DOM
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}