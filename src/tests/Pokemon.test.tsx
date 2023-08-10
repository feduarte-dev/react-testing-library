import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 6', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeigth.innerHTML).toBe('Average weight: 6.0 kg'); // Era isso ?
    expect(pokemonImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon.', async () => {
    const { user } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemon/25');
    await user.click(moreDetailsLink);
    expect(global.window.location.href).toContain('/pokemon/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />, { route: '/pokemon/10' });
    const favIconOff = screen.queryByRole('img', {
      name: /caterpie is marked as favorite/i,
    });
    expect(favIconOff).not.toBeInTheDocument();
    const favCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    await user.click(favCheckbox);
    const favIconOn = screen.getByRole('img', {
      name: /caterpie is marked as favorite/i,
    });
    expect(favIconOn).toBeInTheDocument();
    expect(favIconOn).toHaveAttribute('src', '/star-icon.png');
    expect(favIconOn).toHaveAttribute('alt', 'Caterpie is marked as favorite');
  });
});
