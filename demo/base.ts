export interface User {
  username: string;
}

export type Err = Error &  {
  flag: Boolean;
}

export function fakeReqSuccess(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ username: 'luckyasme' }), 1000);
  });
}

export function fakeReqFailed(): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('ERROR')), 1000);
  });
}
