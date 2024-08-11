import { storeConfigurationFactory } from "../../service/storeConfiguration/storeConfiguration.factory.js"


const createStoreConfiguration = async (req, res) => {
    console.log("desde controller createStoreConfiguration", req.body);
    
    const dbname = req.subdomain
    try {
        const storeConfigurationService = await storeConfigurationFactory(dbname)
        const configuration = await storeConfigurationService.createStoreConfiguration(req.body)
        res.status(200).json({status: "ok", data: configuration});
    } catch (error) {
        // console.log("error desde controller storeConfiguration", error);
        
        res.status(error.status).json( {status: "failed", data: error.msg} )
    }
}

const getStoreConfiguration = async (req, res) => {
    console.log("desde controller getStoreConfigurationDefault", req.body);
    
    const dbname = req.subdomain
    try {
        const storeConfigurationService = await storeConfigurationFactory(dbname)
        const configuration = await storeConfigurationService.getStoreConfiguration()
        res.status(200).json({status: "ok", data: configuration});
    } catch (error) {
        console.log("error desde controller storeConfiguration", error);
        
        res.status(error.status).json( {status: "failed", data: error.msg} )
    }
}

const updateStoreConfiguration = async (req, res) => {
    console.log("desde controller getStoreConfigurationDefault", req.body);
    console.log("configId", req.params.id);
    
    const dbname = req.subdomain
    try {
        const storeConfigurationService = await storeConfigurationFactory(dbname)
        
        const updatedConfigStore = await storeConfigurationService.updateStoreConfiguration(req.params.id, req.body)
        res.status(200).json({status: "ok", data: updatedConfigStore});
    } catch (error) {
        console.log("error desde controller updateStoreConfiguration", error);
        
        res.status(error.status).json( {status: "failed", data: error.msg} )
    }
}


// CONTROLLER API CONFIG STORE

const getStoreConfigurationStore = async (req, res) => {
    console.log("desde controller getStoreConfigurationStore", req.body);
    
    const dbname = req.subdomain
    try {
        const storeConfigurationService = await storeConfigurationFactory(dbname)
        const configuration = await storeConfigurationService.getStoreConfigurationStore()
        res.status(200).json({status: "ok", data: configuration});
    } catch (error) {
        // console.log("error desde controller storeConfiguration", error);
        
        res.status(error.status).json( {status: "failed", data: error.msg} )
    }
}


export {
    createStoreConfiguration,
    getStoreConfiguration,
    updateStoreConfiguration,
    getStoreConfigurationStore
}