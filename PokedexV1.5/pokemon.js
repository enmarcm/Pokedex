let containerPokemon = document.querySelector(".containerPokemon")
let tipos = document.createElement("div")
tipos.classList.add("tipos")
containerPokemon.append(tipos)

let params = new URLSearchParams(location.search)
let id = params.get('pokeId')
console.log(id)
let url = `https://pokeapi.co/api/v2/pokemon/${id}`

const CargarDatos = () =>{
    fetch(url)
    .then(datos => datos.json()
    .then(pokemon =>{
        console.log(pokemon.abilities)
        containerPokemon.innerHTML = `
        <div class="containerImgs imgFrente">
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="Frente Default">
                <img src="${pokemon.sprites.other.home.front_shiny}" alt="Frente Shiny">
        </div>
            
        <div class="containerInfo">
            <p class="id">#${pokemon.id}</p>
            <p class="nombre">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
        `
     
        let tipos = document.createElement("div")
        tipos.classList.add("tipos")
        document.querySelector(".containerInfo").append(tipos)
    pokemon.types.forEach(e=>{
       tipos.innerHTML += `
        <div class="tipo ${e.type.name}">${e.type.name}</div>
        `
    })
        
    document.querySelector(".containerInfo").innerHTML += `
    <div class="informacionGeneral">
    <p>Peso: ${pokemon.weight}lb</p>
    <p>Altura: ${pokemon.height} pies</p>
    </div>`
    
    
    
    document.querySelector(".containerInfo").innerHTML += `
    <p>Habilidades: </p>
    `

    let habilidades = document.createElement("div")
    habilidades.classList.add("habilidades")
    document.querySelector(".containerInfo").append(habilidades)
    pokemon.abilities.forEach(e=>{
        habilidades.innerHTML += `
        <p class="tipos 
        habilidades">${e.ability.name}</p>
        `
    })

    document.querySelector(".containerInfo").innerHTML += `
    </div> 
    `       

    }))
}

CargarDatos()

document.querySelector("#nav").addEventListener("click", ()=>{
    window.location.href = "index.html"
})