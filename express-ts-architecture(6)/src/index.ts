import {app} from './app.js'

const port = 3002
app.listen(port, () => {
    console.log('Server has started on port ' + port)
})
