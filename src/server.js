import http from 'http'

const port = 8080

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method === 'GET' && url === '/test') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        return res.end('Test route')
    }

    if (method === 'POST' && url === '/user') {
        res.writeHead(201, { 'Content-Type': 'text/plain' })
        return res.end('User created')
    }

    res.end('Hello World!')
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})