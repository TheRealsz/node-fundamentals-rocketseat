import http from 'http'

const port = 8080

// Statefull data
const users = []

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method === 'GET' && url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/user') {
        users.push({ id: users.length + 1, name: 'John Doe' })
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end('User created')
    }

    res.end('Hello World!')
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})