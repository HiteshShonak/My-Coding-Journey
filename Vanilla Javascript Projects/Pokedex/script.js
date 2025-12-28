const searchBtn = document.querySelector(".searchBtn");
const warning = document.querySelector("#warningMessage");
let SearchBox = document.querySelector(".pokemonSearch");
const imgElement = document.querySelector(".pokemonImage");

const pokemonName = document.querySelector(".pokemonName");
const pokemonType = document.querySelector(".pokemonType");
const pokemonHP = document.querySelector(".pokemonHP");
const pokemonAttack = document.querySelector(".pokemonAttack");
const pokemonDefence = document.querySelector(".pokemonDefence");
const pokemonSpeed = document.querySelector(".pokemonSpeed");




async function fetchPikachu() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const data = await response.json();
  
  updatePokemon(data);
}


fetchPikachu();




async function fetchData() {
  try {
    const input = SearchBox.value.trim().toLowerCase();
    if (!input) {
      warning.textContent = "Please enter a Pokémon name!";
      return;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

    if (!response.ok) {
      throw new Error("Could not fetch Pokémon");
    }

    const data = await response.json();


    updatePokemon(data);
  } catch (error) {
    console.log(error);
    warning.textContent = "Pokémon not found! Try again.";
  }
}



searchBtn.addEventListener("click", fetchData);
SearchBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fetchData();
  }
});




function updatePokemon(data){
    const pokemonSprite = data.sprites.front_default;
    imgElement.src = pokemonSprite;
    imgElement.alt = `Image of ${data.name}`;

    imgElement.onload = () => {
    pokemonName.textContent = data.name;
    pokemonType.textContent = data.types.map(t => t.type.name).join(", ");
    pokemonHP.textContent = data.stats[0].base_stat;       // HP
    pokemonAttack.textContent = data.stats[1].base_stat;   // Attack
    pokemonDefence.textContent = data.stats[2].base_stat;  // Defence
    pokemonSpeed.textContent = data.stats[5].base_stat;    // Speed
    warning.textContent = "";
    }
}