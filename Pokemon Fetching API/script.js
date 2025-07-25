const input = document.getElementById("pokemonInput");
const button = document.getElementById("searchBtn");

button.addEventListener("click", fetchPokemon);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetchPokemon();
  }
});

function fetchPokemon() {
  const name = input.value.trim().toLowerCase();

  if (!name) {
    alert("Please enter a Pokémon name.");
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokémon not found!");
      }
      return response.json();
    })
    .then(data => {
      // Show result section
      document.getElementById("result").classList.remove("hidden");

      // Set name and image
      document.getElementById("pokeName").innerText = data.name.toUpperCase();
      document.getElementById("pokeImage").src = data.sprites.front_default;

      // Set base stats
      document.getElementById("hp").innerText = data.stats[0].base_stat;
      document.getElementById("attack").innerText = data.stats[1].base_stat;
      document.getElementById("defense").innerText = data.stats[2].base_stat;
    })
    .catch(error => {
      alert(error.message);
      document.getElementById("result").classList.add("hidden");
    });
}
