import axios from "axios"
import create from "./create.js"


const createConnector = async (_credentials) => {
    const params = await create(_credentials)
    class kwildb {
        connectionParams = params

        query = async (_query) => {
            let _params = params //we must copy the params since we will be writing to them
            _params.data.query = _query
            _params.url = _params.url+'/raw'
            const response = await axios(_params)
            return response.data
        }
    }

    const retVal = new kwildb()
    return retVal
}

export default createConnector