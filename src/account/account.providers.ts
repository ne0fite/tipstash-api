import Account from '../models/account.entity';

export const accountProviders = [
  {
    provide: 'ACCOUNT_REPO',
    useValue: Account,
  },
];
