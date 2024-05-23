import Shift from '../models/shift.entity';

export const shiftProviders = [
  {
    provide: 'SHIFT_REPO',
    useValue: Shift,
  },
];
