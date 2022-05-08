import { toError } from '../src/index'

describe('toError test', async () => {

  it('should return a null value when resolved', async () => {
    const testInput = 888;
    const promise = Promise.resolve(testInput);
    const err = await toError<number>(promise);

    expect(err).toBeNull();
  });

  it('should return an error when promise is rejected', async () => {
    const promise = Promise.reject('Error');
    const err = await toError(promise);

    expect(err).not.toBeNull();
    expect(err).toMatch('Error');
  });

  it('should add external properties to the error object', async () => {
    const promise = Promise.reject({ error: 'Error message' });

    const err = await toError<
      string,
      { error: string; extraKey: number }
    >(promise, {
      extraKey: 1
    });

    expect(err).toBeTruthy();
    expect((err as any).extraKey).toEqual(1);
    expect((err as any).error).toEqual('Error message')
  });

});
