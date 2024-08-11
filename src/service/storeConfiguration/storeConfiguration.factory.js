import { getStoreConfigurationDao } from '../../dao/storeConfiguration/index.dao.js'
import { StoreConfigurationRepository } from './StoreConfiguration.repository.js'
import { StoreConfigurationService } from './StoreConfiguration.service.js'

async function storeConfigurationFactory(dbname) {
    const storeConfigurationDao = await getStoreConfigurationDao(dbname)
    const repository = new StoreConfigurationRepository(storeConfigurationDao)
    return new StoreConfigurationService(repository)
}

export {
    storeConfigurationFactory
}