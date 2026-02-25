const http = require('http')
const fs = require('fs')

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const server = http.createServer(async(request, response) => {

    switch (request.url) {
        case '/home': {
            const data = await readFile('page/home.html')
            response.write(data)
            response.end()
            break;
        }
        case '/about': {
            const data = await readFile('page/about.html')
            response.write(data)
            response.end()
            break;
        }
        default: {
            response.write("404 not found")
            response.end()
        }
    }
})

server.listen(3003)