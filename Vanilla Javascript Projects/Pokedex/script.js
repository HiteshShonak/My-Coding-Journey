const searchBtn = document.querySelector(".searchBtn");
const searchBox = document.querySelector(".pokemonSearch");
const imgElement = document.querySelector("#pokeImg");
const nameElement = document.querySelector(".pokemonName");
const typesContainer = document.querySelector("#typesContainer");
const shinyBtn = document.querySelector("#shinyBtn");
const cardElement = document.querySelector(".card");

//Elements for Stats
const hpVal = document.getElementById("hpVal");
const hpBar = document.getElementById("hpBar");
const atkVal = document.getElementById("atkVal");
const atkBar = document.getElementById("atkBar");
const defVal = document.getElementById("defVal");
const defBar = document.getElementById("defBar");
const spdVal = document.getElementById("spdVal");
const spdBar = document.getElementById("spdBar");

let currentPokemonData = null;
let isShiny = false;
let toastTimeout;

const typeColors = {
    fire: '#F08030', water: '#6890F0', grass: '#78C850',
    electric: '#F8D030', ice: '#98D8D8', fighting: '#C03028',
    poison: '#A040A0', ground: '#E0C068', flying: '#A890F0',
    psychic: '#F85888', bug: '#A8B820', rock: '#B8A038',
    ghost: '#705898', dragon: '#7038F8', steel: '#B8B8D0',
    fairy: '#EE99AC', normal: '#A8A878'
};

async function fetchPokemon(query) {
    if (!query) return;
    
    searchBox.classList.remove("shake");

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        
        if (!response.ok) throw new Error("Pokemon not found!");

        const data = await response.json();
        
        //Save to LocalStorage
        localStorage.setItem("lastPokemon", data.name);

        currentPokemonData = data; 
        isShiny = false; 
        
        updateUI(data);

    } catch (error) {
        showToast(`Pokemon "${query}" not found!`);
        searchBox.classList.add("shake");
        setTimeout(() => searchBox.classList.remove("shake"), 500);
    }
}


function showToast(msg) {
    //Remove existing
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        existingToast.remove();
        clearTimeout(toastTimeout);
    }

    //Create
    const toast = document.createElement("div");
    toast.className = "toast";
    
    //Inject Content + Timer
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>${msg}</span>
        </div>
        <div class="toast-timer"></div>
    `;

    //Append to CARD
    cardElement.appendChild(toast);

    //Remove after 3s
    toastTimeout = setTimeout(() => {
        toast.remove();
    }, 3000);
}

function updateUI(data) {
    updateImageSource();
    nameElement.textContent = data.name;

    typesContainer.innerHTML = "";
    data.types.forEach(t => {
        const typeName = t.type.name;
        const badge = document.createElement("span");
        badge.textContent = typeName;
        badge.className = "type-badge";
        badge.style.backgroundColor = typeColors[typeName] || '#777';
        typesContainer.appendChild(badge);
    });

    updateStat(hpVal, hpBar, data.stats[0].base_stat);
    updateStat(atkVal, atkBar, data.stats[1].base_stat);
    updateStat(defVal, defBar, data.stats[2].base_stat);
    updateStat(spdVal, spdBar, data.stats[5].base_stat);
}

function updateStat(textEl, barEl, value) {
    textEl.textContent = value;
    const percentage = Math.min((value / 200) * 100, 100);
    barEl.style.width = `${percentage}%`;
}

shinyBtn.addEventListener("click", () => {
    if (!currentPokemonData) return;
    isShiny = !isShiny;
    updateImageSource();
});

function updateImageSource() {
    if (!currentPokemonData) return;
    const sprites = currentPokemonData.sprites;
    const normalSrc = sprites.other["official-artwork"].front_default || sprites.front_default;
    const shinySrc = sprites.other["official-artwork"].front_shiny || sprites.front_shiny;
    imgElement.src = isShiny ? shinySrc : normalSrc;
}

searchBtn.addEventListener("click", () => fetchPokemon(searchBox.value));
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") fetchPokemon(searchBox.value);
});

// LOAD FROM LOCAL STORAGE (or default to Pikachu)
const lastSaved = localStorage.getItem("lastPokemon") || "pikachu";
fetchPokemon(lastSaved);