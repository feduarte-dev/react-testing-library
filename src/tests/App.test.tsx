import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1', () => {
  it('Teste se o topo da aplicação contém os links: home, about, favorite pokémon', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favPokemon = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemon).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    await user.click(home);
    const homeText = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });
    expect(homeText).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    await user.click(about);
    const aboutText = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);
    const favPokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(favPokemon);
    const favPokemonText = screen.getByRole('heading', {
      name: /favorite pokémon/i,
    });
    expect(favPokemonText).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    renderWithRouter(<App />, { route: '/teste' });
    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
