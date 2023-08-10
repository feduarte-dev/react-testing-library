import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 2', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutQuestion = screen.getByRole('heading', {
      name: /what does this app do\?/i,
    });
    expect(aboutQuestion).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i, level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutText = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon\./i,
    );
    const aboutText2 = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them\./i,
    );
    expect(aboutText).toBeInTheDocument();
    expect(aboutText2).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex:', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutImg = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(aboutImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
