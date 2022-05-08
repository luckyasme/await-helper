import { toData } from '../src/index'

describe('toData test', async () => {
  it('should return a value when resolved', async () => {
    const testInput = 888;
    const promise = Promise.resolve(testInput);
    const data = await toData<number>(promise);

    expect(data).toEqual(testInput);
  });

  it('should return a wrapped value when resolved', async () => {
    const testInput = 888;
    const promise = Promise.resolve(testInput);
    const data = await toData<number>(promise, null, (val) => val + 222);

    expect(data).toEqual(testInput + 222);
  });

  it('should return a null value when promise is rejected', async () => {
    const promise = Promise.reject('Error');
    const data = await toData<number>(promise);

    expect(data).toBeNull();
  });

  it('should return a default value when promise is rejected', async () => {
    const defaultValue = 888;
    const promise = Promise.reject('Error');
    const data = await toData<number>(promise, defaultValue);

    expect(data).toEqual(defaultValue);
  });

});
