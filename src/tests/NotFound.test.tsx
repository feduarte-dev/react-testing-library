import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 4', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found.', () => {
    renderWithRouter(<App />, { route: '/teste' });
    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found/i, level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem com o texto alternativo', () => {
    renderWithRouter(<App />, { route: '/teste' });
    const notFoundImgAltText = screen.getByAltText(
      /clefairy pushing buttons randomly with text i have no idea what i'm doing/i,
    );
    expect(notFoundImgAltText).toBeInTheDocument();
  });
});
