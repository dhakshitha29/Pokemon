import React, { useEffect, useState } from "react";
import axios from "axios";
import './Poki.css'

function Poki() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const results = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url);
            return {
              id: pokemonData.data.id,
              name: pokemonData.data.name,
              image: pokemonData.data.sprites.front_default,
            };
          })
        );
        setPokemons(results);
      } catch (error) {
        console.error("Error fetching Pokémon data", error);
      }
    }
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-4"
      />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 g-4">
        {filteredPokemons.map((pokemon) => (
          <div key={pokemon.id} className="col">
            <div className="card text-center p-3 shadow-sm">
              <img src={pokemon.image} alt={pokemon.name} className="card-img-top mx-auto w-50" />
              <div className="card-body">
                <h6 className="card-title text-capitalize">{pokemon.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Poki