let API = "https://pokeapi.co/api/v2/"


const menu = document.querySelector(".menu")
let fragmento = document.createDocumentFragment();

for (let i = 0; i < 151; i++) {

  const menuList = document.createElement("div")
  menuList.setAttribute("class", "menu--list")
  menuList.setAttribute("id", `${ i+1 }`)

  fetch(API+"pokedex/2/")

    .then(Response => Response.json())
    .then(Response => {
      menuList.innerHTML = `<p class= "menu--list__number">N°${Response.pokemon_entries[`${i}`].entry_number}</p>&nbsp 
      <img class="menu--list__icon" src="./assets/pokeball-icon.svg">
      <p class="menu--list__name">${Response.pokemon_entries[`${i}`].pokemon_species.name.toUpperCase()}</p>`
    })
    .catch(error => console.error(error) )


    fragmento.appendChild(menuList)
}

menu.appendChild(fragmento)

menu.addEventListener("mouseover", (event)=>{
  var x = event.clientX
  var y = event.clientY
  
  const elementOfMouse = document.elementFromPoint(x, y);

    if (elementOfMouse.getAttribute("class") == "menu--list") {
      elementOfMouse.addEventListener("click", ()=>{
        changePokemon(elementOfMouse.id)
        changeColor(elementOfMouse.id)
      })
    }

})


const screen = document.querySelector(".screen")
let fragmento2 = document.createDocumentFragment();

const changePokemon = (pokemon) => {
  const info = document.querySelector(".head--info__main")
  const features = document.querySelector(".head--features__text")
  const image = document.querySelector("#photo")
  const text = document.querySelector(".screen--text__paragraph")

  //Conseguir las informacion

  fetch(API + `pokemon/${pokemon}/`)
  .then(response => response.json())
  .then(response => info.innerHTML = `N°${response.order} ${response.name.toUpperCase()}`)

  //Conseguir las caracteristicas

  fetch(API + `pokemon/${pokemon}/`)
  .then(response => response.json())
  .then(response => features.innerHTML = `ALT. ${(response.height)/10}m <br><br>
  PESO ${(response.weight)/10}kg`)



  //Conseguir la imagen
  fetch(API + `pokemon/${pokemon}/`)
  .then(response => response.json())
  .then(response => response.sprites.other["official-artwork"].front_default)
  .then(response => image.setAttribute("src", `${response}`) )


  //conseguir el texto
  fetch(API + `pokemon-species/${pokemon}/`)
  .then(response => response.json())
  .then(response => response.flavor_text_entries[26].flavor_text)
  .then(response => text.innerHTML= response)

}



const changeColor = (id) =>{

  const colorTerciario = document.querySelector(".screen")
  const colorSecundario = document.querySelector(".screen--text")
  const colorPrimario = document.querySelector(".screen--head")


  const getColor = (color3, color2) =>{
    colorTerciario.style.borderTop = "70px solid " + color3;
    colorTerciario.style.borderBottom = "100px solid " + color3;
  
    colorSecundario.style.backgroundColor = color2;
  }


  fetch(API + `pokemon-species/${id}/`)
  .then(response => response.json())
  .then(response => response.color.name)
  .then(color => {
    switch (color) {
      case "yellow":
          getColor("#ffd700", "#fffacd")
        break;

        case "green":
          getColor("#228b22", "#deffde")
          
        break;

        case "blue":
          getColor("#3d8bff", "#d1e4ff")
          
        break;

        case "white":
          getColor("#eeeeee", "#ffffff")
          
        break;

        case "gray":
          getColor("#696969", "#d3d3d3")
          
        break;

        case "brown":
          getColor("#b8860b", "#eedd82")
          
        break;

        case "purple":
          getColor("#6a5acd", "#c5badb")
          
        break;

        case "black":
          getColor("#000000", "#a9a9a9")
          
        break;

        case "pink":
          getColor("#db7093", "#ffe4e1")
          
        break;

        case "red":
          getColor("#ff6347", "#ffd1d1")
          
        break;
    

      default:
        break;
    }
  })
}



