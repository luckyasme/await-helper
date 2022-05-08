import { toData } from '../src/index';
import { User, fakeReqSuccess, fakeReqFailed } from './base';

(async () => {
  const successfulData = await toData<User>(fakeReqSuccess());
  console.log('toData-success', successfulData);

  const wrappedData = await toData<User>(fakeReqSuccess(), null, (val: User) => {
    val.username = 'username: ' + val.username;
    return val;
  });
  console.log('toData-success-beforeReturnData', wrappedData);

  const failedData = await toData(fakeReqFailed());
  console.log('toData-failure', failedData);

  const defaultData = await toData(fakeReqFailed(), { username: 'no login' });
  console.log('toData-defaultValue', defaultData);
})();
