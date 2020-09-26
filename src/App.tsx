import React, { useState } from 'react';
import './App.css';
import Party from './components/Party';
import { PokemonType } from './components/Pokemon';
import PokemonAdder from './components/PokemonAdder';

function App() {
  const [pokemon, setPokemon] = useState<Array<PokemonType | null>>([null, null, null, null, null, null]);

  const handleRelease = (pokemonToRelease: PokemonType) => {
    setPokemon((previousParty) => {
      return [...previousParty.filter((partyMember) => partyMember !== pokemonToRelease), null];
    });
  };

  const addPokemon = (pokemonToAdd: PokemonType) => {
    const realPokemonCount = pokemon.filter(p => p !== null).length;
    if (realPokemonCount === 6) return;
    setPokemon((party) => {
      const realPokemon = party.filter(p => p !== null);

      let newParty = [...realPokemon, pokemonToAdd];

      while (newParty.length < 6){
        newParty.push(null);
      }

      return newParty;
    });
  };

  return (
    <div className="App">
      <PokemonAdder onAddToParty={addPokemon} />
      <Party pokemon={pokemon} handleRelease={handleRelease} />
    </div>
  );
}

export default App;
