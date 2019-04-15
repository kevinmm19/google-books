import Shared from '@/assets/js/shared';

describe('authorsClean function from assets/js/shared.js', () => {
  it('renders "No authors provided" when there are no authors', () => {
    const msg = 'No authors provided';
    const result = Shared.authorsClean('');
    expect(result).toMatch(msg);
  });
  it('renders a clean and readable Author string', () => {
    const authorsJSON = '["Karan Singh","Preben Esbensen","Peter Hoyle","Mark Pope","Jean Sylvester","IBM Redbooks"]';
    const expected = 'Karan Singh, Preben Esbensen, Peter Hoyle, Mark Pope, Jean Sylvester, IBM Redbooks';
    const result = Shared.authorsClean(authorsJSON);
    expect(result).toMatch(expected);
  });
});