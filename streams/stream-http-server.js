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

const server = http.createServer(async (req, res) => {
    const buffers = []

    // Adicionando os chunks de dados em um array de buffers para depois trabalhar com a informação completa
    // Pegando cada chunk da requisição e adicionando no array de buffers
    // Nada abaixo do await irá rodar até que a requisição seja completada
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    // Após juntar todos os chunks no array de buffers, concatena todos os buffers em um único buffer e transformando em string
    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)
    return res.end(fullStreamContent)

    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res)
})

server.listen(3334)