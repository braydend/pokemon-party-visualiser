import React from 'react';
import styled from 'styled-components';
import Pokemon, { PokemonType } from './Pokemon';

type Props = {
    pokemon: Array<PokemonType | null>;
    handleRelease: (pokemonToRelese: PokemonType) => void;
};

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`;

const Party: React.FC<Props> = ({ pokemon, handleRelease }) => {
    return <Container>
        {pokemon.map(pokemon => <Pokemon onRelease={() => pokemon === null ? {} : handleRelease(pokemon)} pokemon={pokemon} />)}
    </Container>;
};

export default Party;