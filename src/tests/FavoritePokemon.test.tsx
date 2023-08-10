import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 3', () => {
  it('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const favText = screen.getByText(/no favorite pokémon found/i);
    expect(favText).toBeInTheDocument();
  });

  it('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', async () => {
    const { user } = renderWithRouter(<App />, { route: '/pokemon/4' });
    const favCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    await user.click(favCheckbox);
    const favLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    await user.click(favLink);
    const favPokemon = screen.getByText(/charmander/i);
    expect(favPokemon).toBeInTheDocument();
  });
});
