function init() {
  //GLOBAL VARIABLES
  let flags = []
  const countryList = document.querySelector('.countries')

  // FUNCTIONS
  //gets the flags via the API 
  function getAllFlags() {
    fetch('https://restcountries.eu/rest/v2/all?fields=name;flag;region;nativeName;')
      .then(response => response.json())
      .then(response => {
        flags = response
        chrome.storage.local.set({ data: flags });
        displayFlags(flags)
      })
      .catch(err => console.log(err))
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