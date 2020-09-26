import React, { createRef, useState } from 'react';
import { PokeAPIPokemon } from '../api-types';
import { PokemonType } from './Pokemon';

type Props = {
    onAddToParty: (pokemonToAdd: PokemonType) => void;
};

const PokemonAdder: React.FC<Props> = ({ onAddToParty }) => {
    const endpoint = 'https://pokeapi.co/api/v2/pokemon/';
    const searchBarRef = createRef<HTMLInputElement>();
    const [pokemonData, setPokemonData] = useState<PokeAPIPokemon>();
    const [nickname, setNickname] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const clearData = () => {
        setPokemonData(undefined);
        setNickname(undefined)
    };

    const handleSearch = async () => {
        setIsLoading(true);
        
        const searchTerm = searchBarRef.current?.value;
        const repsonse: PokeAPIPokemon = await (await fetch(`${endpoint}${searchTerm}`)).json();

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
                <input ref={searchBarRef} placeholder="Search for a pokemon" />
                <button onClick={() => handleSearch()}>Search</button>
            </div>
            <div>
                <input placeholder="Nickname" onChange={({ target: { value } }) => setNickname(value)} />
                <button onClick={handleAddToParty} disabled={isButtonDisabled}>Add to party</button>
            </div>
        </div>
    );
};

export default PokemonAdder;