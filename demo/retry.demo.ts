import { retry } from '../src/index';

let count = 0;
function fakeRetryReq(args) {
  return new Promise((resolve, reject) => {
    (count++ == 2) ? resolve({ username: 'luckyasme', args }) : reject();
  });
}

(async () => {
  const [err, data, success] = await retry({
    func: fakeRetryReq,
    args: ['test'],
    times: 2,
    interval: 1000,
    beforeReturnData: (val: Record<string, any>) => {
      val?.username && (val.username = `usernmae: ${val.username}`);
      return val;
    }
  });
  if (success) {
    console.log('retry-success', data);
  }

})();

