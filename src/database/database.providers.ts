import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const dbConfig: SequelizeOptions = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'tipstash',
  host: process.env.DB_HOSTNAME || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 5434,
  dialect: 'postgres',
  dialectOptions: {},
  logging: false,
};

if (['production', 'stage'].includes(process.env.NODE_ENV)) {
  dbConfig.dialectOptions['ssl'] = {
    require: true,
    rejectUnauthorized: false,
  };
}

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(dbConfig);
      sequelize.addModels([__dirname + '/../models']);
      // await sequelize.sync();
      return sequelize;
    },
  },
];
