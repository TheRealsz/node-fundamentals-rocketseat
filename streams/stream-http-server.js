import http from 'http'
import { Transform } from 'stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        let err = null

        const number = Number(chunk.toString())

        if (number < 0) {
            err = new Error('Number must be positive')
        }

        console.log(number)
        const transformedChunk = Buffer.from(String(number * -1))

        callback(err, transformedChunk)
    }
}

// req é uma stream de leitura (Readable), podemos ler dados do front-end através dela
// res é uma stream de escrita (Writable), podemos escrever dados para o front-end através dela

const server = http.createServer((req, res) => {
    return req
        .pipe(new InverseNumberStream())
        .pipe(res)
})

server.listen(3334)