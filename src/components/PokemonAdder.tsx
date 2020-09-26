import React, { createRef, useRef, useState } from 'react';
import { PokemonType } from './Pokemon';

type Props = {
    onAddToParty: (pokemonToAdd: PokemonType) => void;
};

const PokemonAdder: React.FC<Props> = ({ onAddToParty }) => {
    const endpoint = 'https://pokeapi.co/api/v2/pokemon/';
    const searchBarRef = createRef<HTMLInputElement>();
    const [pokemonSprite, setPokemonSprite] = useState<string>('');
    const [pokemonName, setPokemonName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        const searchTerm = searchBarRef.current?.value;
        const repsonse = await (await fetch(`${endpoint}${searchTerm}`)).json();

        const sprite = repsonse.sprites.front_default;
        setPokemonSprite(sprite);
        setIsLoading(false);
    };

    const handleAddToParty = () => {
        const pokemon: PokemonType = {
            name: pokemonName,
            sprite: pokemonSprite,
        };

        onAddToParty(pokemon);
    };

    const isButtonDisabled = !pokemonSprite || !pokemonName || isLoading;

    return (
        <div>
            <div>
                <input ref={searchBarRef} placeholder="Pokemon to add to party" />
                <button onClick={() => handleSearch()}>Serach</button>
            </div>
            <div>
                <input placeholder="Nickname for pokemon" onChange={({ target: { value } }) => setPokemonName(value)} />
                <button onClick={handleAddToParty} disabled={isButtonDisabled}>Add to party</button>
            </div>
        </div>
    );
};

export default PokemonAdder;