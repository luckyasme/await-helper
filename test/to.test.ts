import { to } from '../src/index'

describe('to test', async () => {
  it('should return a value and a truthy when resolved', async () => {
    const testInput = 888;
    const promise = Promise.resolve(testInput);
    const [err, data, success] = await to<number>(promise);

    expect(err).toBeNull();
    expect(data).toEqual(testInput);
    expect(success).toBeTruthy();
  });

  it('should return a wrapped value and a truthy when resolved', async () => {
    const testInput = 888;
    const promise = Promise.resolve(testInput);
    const [err, data, success] = await to<number>(promise, null, (val) => val + 222);

    expect(err).toBeNull();
    expect(data).toEqual(testInput + 222);
    expect(success).toBeTruthy();
  });

  it('should return an error and a falsy when promise is rejected', async () => {
    const promise = Promise.reject('Error');
    const [err, data, success] = await to(promise);

    expect(err).toEqual('Error');
    expect(data).toBeNull();
    expect(success).toBeFalsy();
  });

  it('should add external properties to the error object', async () => {
    const promise = Promise.reject({ error: 'Error message' });
    const [err] = await to<
      string,
      { error: string; extraKey: number }
    >(promise, {
      extraKey: 1
    });

    expect(err).toBeTruthy();
    expect((err as any).extraKey).toEqual(1);
    expect((err as any).error).toEqual('Error message')
  });

  it('should receive the type of the parent if no type was passed', async () => {
    let user: { name: string };
    let err: Error;
    [err, user] = await to(Promise.resolve({ name: '123' }));

    expect(user.name).toEqual('123');
  });
});
