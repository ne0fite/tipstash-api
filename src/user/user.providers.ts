import User from '../models/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPO',
    useValue: User,
  },
];
