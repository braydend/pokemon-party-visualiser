import React, { useState } from 'react';
import { PokemonListing } from '../api-types';
import { PokemonType } from './Pokemon';
import ReactSelect from 'react-select';
import { useGetAllPokemon, useGetPokemonData } from '../hooks/PokeApi';

type SelectOption = {label: string, value: string};

type Props = {
    onAddToParty: (pokemonToAdd: PokemonType) => void;
};

const PokemonAdder: React.FC<Props> = ({ onAddToParty }) => {
    const [selectedPokemon, setSelectedPokemon] = useState<SelectOption | null>();
    const [nickname, setNickname] = useState<string>('');
    const { data: allPokemon, loading: pokedexLoading } = useGetAllPokemon();
    const [fetchPokemon, { data: pokemonData, loading: pokemonLoading }] = useGetPokemonData();

    const clearData = () => {
        setNickname('');
        setSelectedPokemon(null);
    };

    // Couldn't get the type definitions working correctly with react-select
    // so I have typed it as unkown for now
    const handleSearch = async (e: unknown) => {
        if (!e) return;
        setSelectedPokemon(e as SelectOption);
        const { value: name } = e as SelectOption;
        fetchPokemon(name);
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

    const transformPokemonForReactSelect = (pokemon: PokemonListing[]): SelectOption[] => {
        if (!pokemon){
            return [];
        }
        return pokemon.map(({ name }) => ({ label: name, value: name }));
    };

    const isButtonDisabled = pokemonLoading || pokedexLoading;

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