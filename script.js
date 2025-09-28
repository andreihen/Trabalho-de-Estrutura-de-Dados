let alunos = []
const limiteAlunos = 10

const nomeInput = document.getElementById('nome_input')
const raInput = document.getElementById('ra_input')
const idadeInput = document.getElementById('idade_input')
const mediaInput = document.getElementById('media_input')
const listaAlunos = document.getElementById('listaAlunos')
const formulario = document.getElementById('formulario_aluno')
const buttonNome = document.getElementById('ordenarNome')
const buttonRA = document.getElementById('ordenarRA')
const buttonAprovados = document.getElementById('ordenarAprovados')

function computarAlunos(vetor) {
    listaAlunos.innerHTML = ''
    
    for (let i = 0; i < vetor.length; i++) {
        const tr = document.createElement('tr')

        tr.innerHTML = `
                    <td>${vetor[i].NOME}</td>
                    <td>${vetor[i].RA}</td>
                    <td>${vetor[i].IDADE}</td>
                    <td>${vetor[i].SEXO}</td>
                    <td>${vetor[i].MEDIA}</td>
                    <td>${vetor[i].RESULTADO}</td>
                `
        listaAlunos.appendChild(tr)
    }
}

function criarAluno(nome, ra, idade, sexo, media) {
    let resultado
    
    if (media >= 6) {
        resultado = 'APROVADO'
    } else {
        resultado = 'REPROVADO'
    }
    
    return {
        NOME: nome,
        RA: ra,
        IDADE: idade,
        SEXO: sexo,
        MEDIA: media,
        RESULTADO: resultado
    }
}

function selectionSort(vetor, fnComp) {
    for(let posSel = 0; posSel < vetor.length - 1; posSel++) {
        let posMenor = posSel + 1

        for(let i = posMenor + 1; i < vetor.length; i++) {
            if(fnComp(vetor[posMenor], vetor[i])) {
                posMenor = i
            }
        }

        if(fnComp(vetor[posSel], vetor[posMenor])) {
            [ vetor[posSel], vetor[posMenor] ] = [ vetor[posMenor], vetor[posSel] ]
        }
    }
}

function filtroSequencial(vetor, fnComp) {
    const listaFiltrada = []

    for(let i = 0; i < vetor.length; i++) {
        const elemAtual = vetor[i]

        if(fnComp(elemAtual)) {
            listaFiltrada.push(elemAtual)
        }
    }
    return listaFiltrada
}

formulario.addEventListener('submit', function (e) {
    e.preventDefault()
    if (alunos.length < limiteAlunos) {
        const nome = nomeInput.value
        const ra = parseInt(raInput.value)
        const idade = parseInt(idadeInput.value)
        const sexo = document.querySelector('input[name="Genero"]:checked').value
        const media = parseFloat(mediaInput.value)
        
        alunos.push(criarAluno(nome, ra, idade, sexo, media))
        computarAlunos(alunos)
        formulario.reset()
    } else {
        alert("Limite de Alunos atingido")
        
    }
})

buttonNome.addEventListener('click', () => { 
    selectionSort(alunos, (elem1, elem2) => elem1.NOME > elem2.NOME)
    computarAlunos(alunos)
})

buttonRA.addEventListener('click', () => { 
    selectionSort(alunos, (elem1, elem2) => elem1.RA < elem2.RA)
    computarAlunos(alunos)
})

buttonAprovados.addEventListener('click', () => { 
    const alunosAprovados = filtroSequencial(alunos, function(aluno) {
        return aluno.RESULTADO === 'APROVADO'
    })

    selectionSort(alunosAprovados, (elem1, elem2) => elem1.NOME > elem2.NOME);
    computarAlunos(alunosAprovados)
})