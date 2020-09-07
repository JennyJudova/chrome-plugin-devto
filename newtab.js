function init() {
  //GLOBAL VARIABLES
  let flags = []
  const countryList = document.querySelector('.countries')

  // FUNCTIONS

  //Checks local storage
  function checkLocalStorage() {
    chrome.storage.local.get('data', function (result) {
      result.data == undefined ? isLocalStorageFull = false : isLocalStorageFull = true
      getAllFlags(isLocalStorageFull)
    });
  }

  //gets the flags via the API or localStorage
  function getAllFlags(isLocalStorageFull) {
    if (isLocalStorageFull) {
      console.log('full')
      chrome.storage.local.get('data', function (result) {
        flags = result.data
        displayFlags(flags)
      })
    } else {
      fetch('https://restcountries.eu/rest/v2/all?fields=name;flag;region;nativeName;')
        .then(response => response.json())
        .then(response => {
          console.log('empty')
          flags = response
          chrome.storage.local.set({ data: flags });
          displayFlags(flags)
        })
        .catch(err => console.log(err))
    }
  }

  //creates div with flag img, country name, and native country name
  function displayFlags(flags) {
    flags.map(flag => {
      const flagDiv = document.createElement('DIV')
      flagDiv.innerHTML = `<h2>${flag.name}</h2> <p>${flag.nativeName}</p>`
      countryList.appendChild(flagDiv)
      const flagImg = document.createElement('img')
      flagImg.setAttribute('src', `${flag.flag}`)
      flagDiv.appendChild(flagImg)
    })
  }

  // KICKSTARTS THIS
  getAllFlags()
}

window.addEventListener('DOMContentLoaded', init)