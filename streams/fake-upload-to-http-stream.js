import { Readable } from 'stream'

class OneToHundredStream extends Readable {
    current = 0

    _read() {
        this.current++

        setTimeout(() => {
            if (this.current > 5) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(this.current))
                this.push(`${buf}\n`)
            }
        }, 1000)
    }
}

// Para uma stream de leitura, é aceito os metodos de Post, Put e Patch. Isso se dá porque a stream de leitura é responsável por enviar dados
// Abrindo uma conexao com o servidor http e nao fechando ate que todos os dados tenham sido enviados
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: "half"
})
    .then(res => {
        return res.text()
    })
    .then(data => {
        console.log(data)
    })
