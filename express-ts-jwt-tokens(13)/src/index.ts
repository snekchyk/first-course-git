import { app } from './app.js'
import {runDb} from "./repositories/db.js";

const port = 3000

const runApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Server has started on port ${port}`)
    })
}

runApp()