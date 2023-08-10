import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 5', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<App />);
    const pokedexText = screen.getByRole('heading', {
      name: /encountered pokémon/i, level: 2,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  it('Teste se é exibido apenas um Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    const { user } = renderWithRouter(<App />);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    await user.click(nextPokemon);
    const secondPokemon = screen.getByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();
    await user.click(nextPokemon);
    const thirdPokemon = screen.getByText(/caterpie/i);
    expect(thirdPokemon).toBeInTheDocument();
    const moreDetails = screen.getAllByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const pokemonTypeBtn = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonTypeBtn).toHaveLength(7);
  });

  it('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo e voltar para o inicio ao chegar no ultipo pokemon da lista.', async () => {
    const { user } = renderWithRouter(<App />);
    const fireTypePokemon = screen.getByRole('button', {
      name: /fire/i,
    });
    await user.click(fireTypePokemon);
    const firstFirePokemon = screen.getByText(/charmander/i);
    expect(firstFirePokemon).toBeInTheDocument();
    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    await user.click(nextPokemon);
    const secondFirePokemon = screen.getByText(/rapidash/i);
    expect(secondFirePokemon).toBeInTheDocument();
    await user.click(nextPokemon);
    expect(firstFirePokemon).toBeInTheDocument();
  });

  it('O texto do botão deve corresponder ao nome do tipo, ex.: Psychic.', async () => {
    const { user } = renderWithRouter(<App />);
    const pokemonFireBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    const pokemonType = screen.getByTestId('pokemon-type');
    await user.click(pokemonFireBtn);
    expect(pokemonFireBtn.innerHTML).toBe(pokemonType.innerHTML);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    const { user } = renderWithRouter(<App />);
    const resetBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(resetBtn).toBeInTheDocument();
    const pokemonFireBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    await user.click(pokemonFireBtn);
    const fireTypePokemon = screen.getByText(/charmander/i);
    expect(fireTypePokemon).toBeInTheDocument();
    await user.click(resetBtn);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
