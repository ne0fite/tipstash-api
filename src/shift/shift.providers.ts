import ShiftStats from 'src/models/shift_stats.entity';
import Shift from '../models/shift.entity';

export const shiftProviders = [
  {
    provide: 'SHIFT_REPO',
    useValue: Shift,
  },
  {
    provide: 'SHIFT_STATS_REPO',
    useValue: ShiftStats,
  },
];
