import React from 'react';
import styled from 'styled-components';
import Pokemon, { PokemonType } from './Pokemon';

type Props = {
    pokemon: Array<PokemonType | null>;
    handleRelease: (pokemonToRelese: PokemonType) => void;
};

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    @media screen and (max-width: 400px) {
        grid-template-columns: repeat(1, 1fr);
    }
    @media screen and (min-width: 400px) and (max-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (min-width: 800px) and (max-width: 1300px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const Party: React.FC<Props> = ({ pokemon, handleRelease }) => {
    return (
        <Container>
            {pokemon.map(pokemon => (
                <Pokemon onRelease={() => pokemon === null ? {} : handleRelease(pokemon)} pokemon={pokemon} />
            ))}
        </Container>
    );
};

export default Party;