import { ReversePipe } from './reverse.pipe';

/* The point of demonstrating the test of a pipe is to show an "isolated" test.
 * It does not depend on any resource of the Angular testing library. It is possible
 * to notice that in the imports above, which only contain the pipe I'm testing. */
describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should reverse a string', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('hello')).toEqual('olleh');
  })
});
