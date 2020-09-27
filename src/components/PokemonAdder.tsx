import React, { useState } from 'react';
import { PokeAPIAllPokemon, PokeAPIPokemon } from '../api-types';
import { PokemonType } from './Pokemon';
import ReactSelect from 'react-select';
import { useGetAllPokemon } from '../hooks/PokeApi';

type SelectOption = {label: string, value: string};

type Props = {
    onAddToParty: (pokemonToAdd: PokemonType) => void;
};

const PokemonAdder: React.FC<Props> = ({ onAddToParty }) => {
    const [selectedPokemon, setSelectedPokemon] = useState<SelectOption | null>();
    const [pokemonData, setPokemonData] = useState<PokeAPIPokemon>();
    const [nickname, setNickname] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const { data: allPokemon, loading } = useGetAllPokemon();

    const clearData = () => {
        setPokemonData(undefined);
        setNickname('');
        setSelectedPokemon(null);
    };

    // Couldn't get the type definitions working correctly with react-select
    // so I have typed it as unkown for now
    const handleSearch = async (e: unknown) => {
        if (!e) return;
        setSelectedPokemon(e as SelectOption);
        const { value: endpoint } = e as SelectOption;

        setIsLoading(true);

        const repsonse: PokeAPIPokemon = await (await fetch(endpoint)).json();

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

    const transformPokemonForReactSelect = (pokemon: PokeAPIAllPokemon['results']): SelectOption[] => {
        if (!pokemon){
            return [];
        }
        return pokemon.map(({ name, url}) => ({ label: name, value: url }));
    };

    const isButtonDisabled = !pokemonData || isLoading || loading;

    const allPokemonOptions = allPokemon && transformPokemonForReactSelect(allPokemon);

    return (
        <div>
            <div>
                <ReactSelect value={selectedPokemon} options={allPokemonOptions} isDisabled={!allPokemon} onChange={handleSearch}  />
            </div>
            <div>
                <input placeholder="Nickname" onChange={({ target: { value } }) => setNickname(value)} value={nickname} />
                <button onClick={handleAddToParty} disabled={isButtonDisabled}>Add to party</button>
            </div>
        </div>
    );
};

export default PokemonAdder;