// Tudo que estou recebendo de entrada, estou enviando de saída
// Conectando a ação de entrada com a de saída (pipe)

// process.stdin.pipe(process.stdout)


import { Readable, Writable } from 'stream'

// Stream de leitura
// Proposito de enviar dados, fornecer informações
class OneToHundredStream extends Readable {
    current = 0

    // Toda classe que herda de Readable precisa implementar o método _read
    _read() {
        this.current++

        // Para visualizar a stream de dados
        setTimeout(() => {
            if (this.current > 100) {
                // Push fornece dados para o consumidor
                // Não tenho mais dados para fornecer dentro dessa stream
                this.push(null)
            } else {
                const buf = Buffer.from(String(this.current))
                this.push(`${buf}\n`)
            }
        }, 1000)
    }
}

class MultiplyByTwoStream extends Writable {
    // Toda classe que herda de Writable precisa implementar o método _write
    // chunk: pedaço de dados que estou recebendo
    // encoding: encoding do chunk
    // callback: função que chama quando terminar de processar o chunk
    // Dentro de uma stream de escrita, nao retornamos nada e nem transformamos o dado, apenas processamos
    _write(chunk, encoding, callback) {
        const number = Number(chunk.toString())
        console.log(number * 2)
        callback()
    }
}

// Stream de escrita
// Proposito de receber dados
// Enquanto estou recebendo dados, estou fazendo algo com eles
new OneToHundredStream().pipe(new MultiplyByTwoStream())