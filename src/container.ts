import express = require('express');
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';

//MYSQL
// import { BalanceMySQLRepository } from './services/repositories/impl/mysql/balance.repository';

//MSSQL
// import { BalanceMSSQLRepository } from './services/repositories/impl/mssql/balance.repository';

//MOCK
import { BalanceMOCKRepository } from './services/repositories/impl/mock/balance.repository';

//SERVICES
import { BalanceService } from './services/balance.service';


export default (app: express.Application) => {

    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        //repositories

        // MYSQL
        // balanceRepository: asClass(BalanceMySQLRepository).scoped(),

        // MSSQL
        // balanceRepository: asClass(BalanceMSSQLRepository).scoped(),

        // MOCK
        balanceRepository: asClass(BalanceMOCKRepository).scoped(),

        //services
        balanceService: asClass(BalanceService).scoped(),
    });

    app.use(scopePerRequest(container));
};