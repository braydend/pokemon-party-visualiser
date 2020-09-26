import React, { useState } from 'react';
import { PokeAPIPokemon } from '../api-types';
import { PokemonType } from './Pokemon';

type Props = {
    onAddToParty: (pokemonToAdd: PokemonType) => void;
};

const PokemonAdder: React.FC<Props> = ({ onAddToParty }) => {
    const endpoint = 'https://pokeapi.co/api/v2/pokemon/';
    const [query, setQuery] = useState<string>('');
    const [pokemonData, setPokemonData] = useState<PokeAPIPokemon>();
    const [nickname, setNickname] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const clearData = () => {
        setPokemonData(undefined);
        setNickname('');
        setQuery('');
    };

    const handleSearch = async (searchQuery: string) => {
        setIsLoading(true);

        const repsonse: PokeAPIPokemon = await (await fetch(`${endpoint}${searchQuery}`)).json();

        setPokemonData(repsonse);
        setIsLoading(false);
    };

    const handleAddToParty = () => {
        if (!pokemonData){
            throw new Error('Cannot add a pokemon to your party without an API response');
        }

        const pokemon: PokemonType = {
            name: nickname || pokemonData.name,
            sprite: pokemonData.sprites.front_default,
        };

        onAddToParty(pokemon);
        clearData();
    };

    const isButtonDisabled = !pokemonData || isLoading;

    return (
        <div>
            <div>
                <input value={query} onChange={({ target: { value } }) => setQuery(value)} placeholder="Search for a pokemon" />
                <button onClick={() => handleSearch(query)}>Search</button>
            </div>
            <div>
                <input placeholder="Nickname" onChange={({ target: { value } }) => setNickname(value)} value={nickname} />
                <button onClick={handleAddToParty} disabled={isButtonDisabled}>Add to party</button>
            </div>
        </div>
    );
};

export default PokemonAdder;