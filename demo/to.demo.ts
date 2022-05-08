import { to } from '../src/index';
import { User, Err, fakeReqSuccess, fakeReqFailed } from './base';

(async () => {
  const [err1, data1, success1] = await to(fakeReqSuccess());
  if (success1) {
    console.log('to-success', data1);
  }

  const [err2, data2, success2] = await to(fakeReqSuccess(), null, (val: User) => {
    val.username = 'username: ' + val.username;
    return val;
  });
  if (success2) {
    console.log('to-success-beforeReturnData', data2);
  }

  const [err3, data3, success3] = await to(fakeReqFailed());
  if (!success3) {
    console.log('to-failure', err3.message);
  }

  const [err4, data4, success4] = await to<unknown, Err>(fakeReqFailed(), { flag: false });
  if (!success4) {
    console.log('to-failure-errorExt', err4.message, err4.flag);
  }
})();