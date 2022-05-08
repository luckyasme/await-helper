import { retryToData } from '../src/index'

describe('retryToData test', async () => {

  it('should return a value when resolved', async () => {
    const testInput = 888;
    const data = await retryToData<number>({
      func: () => Promise.resolve(testInput),
    });

    expect(data).toEqual(testInput);
  });

  it('should return an argament value when resolved', async () => {
    const number = 123;
    const data = await retryToData<number>({
      func: async (num: number) => (num),
      args: [number],
    });

    expect(data).toEqual(number);
  });

  it('should return a value when retry two times', async () => {
    let retryTime = 0;
    const func = async () => {
      if (retryTime < 2) {
        retryTime++;
        throw new Error('Error')
      }
      return retryTime;
    }

    const data = await retryToData({
      func,
      times: 2
    });

    expect(data).toEqual(2);
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

    const data = await retryToData({
      func,
      times: 2,
      interval: 1000,
    });

    let endTime = new Date().getTime() - startTime;
    expect(data).toEqual(2);
    expect(endTime).toBeGreaterThan(2000);
  });

  it('should return a wrapped value when resolved', async () => {
    const testInput = 888;
    const data = await retryToData<number>({
      func: () => Promise.resolve(testInput),
      beforeReturnData: (val) => val + 123,
    });

    expect(data).toEqual(testInput + 123);
  });

  it('should return a null value when promise is rejected', async () => {
    const data = await retryToData<number>({
      func: () => Promise.reject('Error'),
    });
    
    expect(data).toBeNull();
  });

  it('should return a default value when promise is rejected', async () => {
    const defaultValue = 888;
    const data = await retryToData<number>({
      func: () => Promise.reject('Error'),
      defaultValue,
    });
    
    expect(data).toEqual(defaultValue);
  });

});
