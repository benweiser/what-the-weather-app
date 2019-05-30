describe('Weather Search Flow', () => {
  it('performs a complete weather search', () => {
    const { getByTestId, visit } = cy;
    visit('http://localhost:3000');
    const input = cy.get('[data-testid=WeatherSearchInput-city] input');
    input.type('Las Vegas');
    getByTestId('search-button').click();
    getByTestId('WeatherStats').should('exist');
  });

  it('displays an error on a failed weather search', () => {
    const { getByTestId, visit } = cy;
    visit('http://localhost:3000');
    const input = cy.get('[data-testid=WeatherSearchInput-city] input');
    input.type('abcdefg');
    getByTestId('search-button').click();
    getByTestId('error-text').should('exist');
  });
});
