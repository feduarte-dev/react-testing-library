import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 7', () => {
  const caterpieLocation = 'Caterpie location';
  const caterpie = '/pokemon/10';
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />, { route: caterpie });
    const pokemonName = screen.getByRole('heading', {
      name: /caterpie details/i,
    });
    expect(pokemonName).toBeInTheDocument();
    const moreDetailsLink = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(moreDetailsLink).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', {
      name: /summary/i, level: 2,
    });
    expect(summary).toBeInTheDocument();
    const infoText = screen.getByText(
      /for protection, it releases a horrible stench from the antennae on its head to drive away enemies\./i,
    );
    expect(infoText).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />, { route: caterpie });
    const pokemonLocation = screen.getByRole('heading', {
      name: /game locations of caterpie/i,
    });
    expect(pokemonLocation).toBeInTheDocument();
    const locationArr = screen.getAllByAltText(caterpieLocation);
    expect(locationArr).toHaveLength(4);
    expect(locationArr[0]).toBeInTheDocument();
    const locationText = screen.getByText(/johto route 30/i);
    expect(locationText).toBeInTheDocument();
    expect(locationArr[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/7/76/Johto_Route_30_Map.png');
    expect(locationArr[0]).toHaveAttribute('alt', caterpieLocation);
  });

  it('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    const { user } = renderWithRouter(<App />, { route: caterpie });
    const favPokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(favPokemon).toBeInTheDocument();
    await user.click(favPokemon);
    const favIconOn = screen.getByRole('img', {
      name: /caterpie is marked as favorite/i,
    });
    expect(favIconOn).toBeInTheDocument();
    await user.click(favPokemon);
    expect(favIconOn).not.toBeInTheDocument();
  });
});
