// Tudo que estou recebendo de entrada, estou enviando de saída
// Conectando a ação de entrada com a de saída (pipe)

// process.stdin.pipe(process.stdout)


import { Readable } from 'stream'

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

// Stream de escrita
// Proposito de receber dados
// Enquanto estou recebendo dados, estou fazendo algo com eles
new OneToHundredStream().pipe(process.stdout)