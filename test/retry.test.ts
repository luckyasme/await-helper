import { retry } from '../src/index'

describe('retry test', async () => {

  it('should return a value and a truthy when resolved', async () => {
    const testInput = 888;
    const [err, data, success] = await retry<number>({
      func: () => Promise.resolve(testInput),
    });

    expect(err).toBeNull();
    expect(data).toEqual(testInput);
    expect(success).toBeTruthy();
  });

  it('should return an argament value and a truthy when resolved', async () => {
    const number = 123;
    const [err, data, success] = await retry<number>({
      func: async (num) => num,
      args: [number],
    });

    expect(err).toBeNull();
    expect(data).toEqual(number);
    expect(success).toBeTruthy();
  });

  it('should add external properties to the error object', async () => {
    const [err] = await retry<
      string,
      { error: string; extraKey: number }
    >({
      func: () => Promise.reject({ error: 'Error message' }),
      errorExt: {
        extraKey: 1
      },
    });

    expect(err).toBeTruthy();
    expect((err as any).extraKey).toEqual(1);
    expect((err as any).error).toEqual('Error message');
  });

  it('should return a value and a truthy when retry two times', async () => {
    let retryTime = 0;
    const func = async () => {
      if (retryTime < 2) {
        retryTime++;
        throw new Error('Error')
      }
      return retryTime;
    }

    const [err, data, success] = await retry({
      func,
      times: 2
    });

    expect(err).toBeNull();
    expect(data).toEqual(2);
    expect(success).toBeTruthy();
  });

  it('should end time over 2000ms', async () => {
    let startTime = new Date().getTime();
    let retryTime = 0;
    const func = async () => {
      if (retryTime < 2) {
        retryTime++;
        throw new Error('Error')
      }
      return retryTime;
    }

    const [err, data, success] = await retry({
      func,
      times: 2,
      interval: 1000,
    });

    let endTime = new Date().getTime() - startTime;
    expect(err).toBeNull();
    expect(data).toEqual(2);
    expect(success).toBeTruthy();
    expect(endTime).toBeGreaterThan(2000);
  });

  it('should return a wrapped value when resolved', async () => {
    const testInput = 888;
    const [err, data, success] = await retry<number>({
      func: () => Promise.resolve(testInput),
      beforeReturnData: (val) => val + 123,
    });

    expect(err).toBeNull();
    expect(data).toEqual(testInput + 123);
    expect(success).toBeTruthy();
  });

  
});
