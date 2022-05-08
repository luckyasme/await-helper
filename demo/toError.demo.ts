import { toError } from '../src/index';
import { User, Err, fakeReqFailed } from './base';

(async () => {
  const err = await toError(fakeReqFailed());
  console.log('toError-failure', err.message);

  const err1 = await toError<User, Err>(fakeReqFailed(), { flag: false });
  console.log('toError-failure', err1.message, err1.flag);

})();
