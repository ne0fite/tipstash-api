import { Inject, Injectable } from '@nestjs/common';
import { Op, Order } from 'sequelize';

import Job from '../models/job.entity';
import Shift from '../models/shift.entity';
import ShiftStats from 'src/models/shift_stats.entity';

type AggregateItem = {
  field: string;
  aggregate: string;
};

type FilterItem = {
  field: string;
  operator:
    | 'eq'
    | 'neq'
    | 'lt'
    | 'lte'
    | 'gte'
    | 'gt'
    | 'contains'
    | 'notcontains'
    | 'in'
    | 'notin';
  value: string | number | boolean | null;
};

type Filter = {
  logic: 'and' | 'or';
  filters: FilterItem[];
};

type GroupItem = {
  field: string;
  dir: string;
};

type SortItem = {
  field: string;
  dir: string;
};

type QueryBuilderQuery = {
  attributes?: string[];
  aggregates?: AggregateItem[];
  filter?: Filter;
  sort?: SortItem[];
  group?: GroupItem[];
  skip?: number;
  take?: number;
  bucket?: 'day' | 'month';
};

@Injectable()
export class ShiftService {
  constructor(
    @Inject('SHIFT_REPO') private shiftRepository: typeof Shift,
    @Inject('SHIFT_STATS_REPO') private shiftStatsRepository: typeof ShiftStats,
  ) {}

  async find(query: QueryBuilderQuery, accountId: string) {
    const sequelize = this.shiftRepository.sequelize;

    const {
      attributes = [],
      aggregates = [],
      filter = {
        logic: 'and',
        filters: [],
      },
      sort = [],
      skip = 0,
      take = 10,
      bucket,
    } = query;

    const options = {
      where: {
        accountId,
      },
    };

    if (attributes.length > 0) {
      options['attributes'] = attributes;
    }

    if (aggregates.length > 0) {
      if (options['attributes'] == null) {
        options['attributes'] = [];
      }

      for (const aggregateItem of aggregates) {
        options['attributes'].push([
          sequelize.fn(
            aggregateItem.aggregate,
            sequelize.col(aggregateItem.field),
          ),
          `${aggregateItem.field}_${aggregateItem.aggregate}`,
        ]);
      }
    }

    for (const filterItem of filter.filters) {
      if (!options.where[filterItem.field]) {
        options.where[filterItem.field] = {};
      }

      let operator;
      let filterValue: any = filterItem.value;
      switch (filterItem.operator) {
        case 'gt':
          operator = Op.gt;
          break;
        case 'gte':
          operator = Op.gte;
          break;
        case 'lte':
          operator = Op.lte;
          break;
        case 'lt':
          operator = Op.lt;
          break;
        case 'in':
          operator = Op.in;
          if (!Array.isArray(filterValue)) {
            filterValue = filterValue.toString().split(',');
          }
          break;
        case 'notin':
          operator = Op.notIn;
          if (!Array.isArray(filterValue)) {
            filterValue = filterValue.toString().split(',');
          }
          break;
        case 'contains':
          operator = Op.iLike;
          filterValue = `%${filterValue}%`;
          break;
        case 'notcontains':
          operator = Op.notILike;
          filterValue = `%${filterValue}%`;
          break;
        default:
          operator = Op.eq;
      }

      options.where[filterItem.field][operator] = filterValue;
    }

    if (sort.length > 0) {
      const order: Order = [];
      for (const sortItem of sort) {
        order.push([sortItem.field, sortItem.dir]);
      }
      options['order'] = order;
    }

    if (bucket) {
      options['attributes'].push([
        sequelize.fn('date_trunc', bucket, sequelize.col('date')),
        'bucket',
      ]);
      options['group'] = ['bucket'];
    }

    const totalRows = await this.shiftStatsRepository.count(options);

    const results = await this.shiftStatsRepository.findAll({
      ...options,
      limit: take,
      offset: skip,
    });

    return {
      totalRows,
      results,
    };
  }

  getById(id: string, accountId: string) {
    const options = {
      where: {
        id,
        accountId,
      },
      include: [
        {
          model: Job,
        },
      ],
    };
    return this.shiftRepository.findOne(options);
  }

  save(shift: Shift) {
    return shift.save();
  }
}
