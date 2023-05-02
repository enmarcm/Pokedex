let contados = 0;


let resultados ;
let containerCards = document.querySelector('.containerCards')
let botones = document.querySelector('.botones')
let btnSiguiente = document.querySelector('.btnSiguiente')
let btnAtras = document.querySelector('.btnAtras')

let urlPrincipal = `https://pokeapi.co/api/v2/pokemon?offset=${contados}&limit=24`

const CargarTipos = (tipos, container) =>{
    tipos.forEach(e=>{
        container.innerHTML += `<div class= "tipo ${e.type.name}">${e.type.name}</div>`
    })

}

const CargarPokemon = (urlPrincipal) =>{
    botones.style.display = 'none'

    fetch(urlPrincipal)
    .then(respuesta=>respuesta.json().then(data=>{
    resultados = data.results

    resultados = resultados.map(elemento =>{
       return fetch(elemento.url).then(e=>e.json())
    })

    Promise.all(resultados)
    .then(pokemon=>{
        pokemon.forEach(poke=>{
            let div = document.createElement("div")
            div.classList.add("card")

            div.innerHTML += `
            <div class="cardImg">
                <img src="${poke.sprites.other.dream_world.front_default}" alt="Imagen de ${poke.name}">
            </div>`

            let divInfo = document.createElement("div")
            divInfo.classList.add("infoCard")
            divInfo.innerHTML += `
                <p class="numero">#${poke.id}</p>
                <p class="nombre">${poke.name[0].toUpperCase() + poke.name.slice(1)}</p>
            `

            let divTipos = document.createElement("div")
            divTipos.classList.add("tipos")
            
            div.append(divInfo)
            divInfo.append(divTipos)
            
            CargarTipos(poke.types, divTipos)
            console.log(div)
            containerCards.appendChild(div)

        })

        botones.style.display = 'flex'
    })
}))

}


CargarPokemon(urlPrincipal)

    
btnSiguiente.addEventListener("click", ()=>{
    contados += 24;

    document.getElementById("nav").scrollIntoView({behavior: "smooth"});

    containerCards.innerHTML = ""
    CargarPokemon(`https://pokeapi.co/api/v2/pokemon?offset=${contados}&limit=24`)
    
    console.log(contados, `https://pokeapi.co/api/v2/pokemon?offset=${contados}&limit=24`)
})

btnAtras.addEventListener("click", ()=>{
    if(contados != 0){
        contados -= 24;
        document.getElementById("nav").scrollIntoView({behavior: "smooth"});

    
        containerCards.innerHTML = ""
    
        CargarPokemon(`https://pokeapi.co/api/v2/pokemon?offset=${contados}&limit=24`)
    }

    
})

