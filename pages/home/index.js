//VARIÁVEL DECLARADA PARA SETAR NO LOCALSTORAGE APENAS OS CARDS SELECIONADOS

let vagasSelecionadas = JSON.parse(localStorage.getItem('vagasSelecionadas') || '[]')

    // console.log(vagasSelecionadas)

//FUNÇÃO PARA RENDERIZAR OS CARDS DAS VAGAS NA TELA

function renderizaCards(array) {
    let ancora = document.querySelector('#ulVagas')
    ancora.innerText = ''

    array.map((element) => {
        // console.log(element)
        // console.log(index)
        let liCard = document.createElement('li')
        let tituloCard = document.createElement('h1')
        let divInfosEmpresaECidade = document.createElement('div')
        let infoEmpresa = document.createElement('p')
        let infoCidade = document.createElement('p')
        let descricaoVaga = document.createElement('p')
        let divModalidadeEButton = document.createElement('div')
        let tagModalidade = document.createElement('p')
        let buttonCandidatar = document.createElement('button')

        divInfosEmpresaECidade.classList.add('divInfosEmpresaECidade')
        divModalidadeEButton.classList.add('divModalidadeEButton')
        buttonCandidatar.classList.add('buttonCandidatar')
        buttonCandidatar.setAttribute('id', element.id)

        // console.log(buttonCandidatar)

        tituloCard.innerText = element.title
        infoEmpresa.innerText = element.enterprise
        infoCidade.innerText = element.location
        descricaoVaga.innerText = element.descrition
        tagModalidade.innerText = element.modalities[0]

        const vagaSelecionada = vagasSelecionadas.find(vaga => vaga.id == element.id)
        buttonCandidatar.innerText = vagaSelecionada ? 'Remover Candidatura' : 'Candidatar'

        ancora.append(liCard)
        liCard.append(tituloCard, divInfosEmpresaECidade, descricaoVaga, divModalidadeEButton)
        divInfosEmpresaECidade.append(infoEmpresa, infoCidade)
        divModalidadeEButton.append(tagModalidade, buttonCandidatar)


//LÓGICA DE ADICIONAR AO LOCAL STORAGE APENAS OS CARDS SELECIONADOS 

        buttonCandidatar.addEventListener('click', () => {
            if (buttonCandidatar.innerText == 'Candidatar') {
                vagasSelecionadas.push(element)
            } else {
                vagasSelecionadas = vagasSelecionadas.reduce((novaLista, e) => {
                    if (e.id != element.id){
                        novaLista.push(e)
                    }    
                    return novaLista
                }, [])
            }

            localStorage.setItem("vagasSelecionadas", JSON.stringify(vagasSelecionadas))

            buttonCandidatar.innerText = buttonCandidatar.innerText == 'Candidatar' ? 'Remover Candidatura' : 'Candidatar'
        })
    });
}

renderizaCards(jobsData)

//LÓGICA DE REMOVER E ADICIONAR O TEXTO DO SPAN "VOCÊ NÃO POSSUI VAGAS SELECIONADAS"

let buttonCandidatarEvento = document.querySelectorAll(".buttonCandidatar")
// console.log(buttonCandidatarEvento)
let spanTrocaDisplayEvento = document.querySelector("#spanTrocaDisplay")
// console.log(spanTrocaDisplayEvento)

if (vagasSelecionadas.length > 0) {   
    spanTrocaDisplayEvento.style.display = 'none'
}

buttonCandidatarEvento.forEach(buttonCandidatar => {
    buttonCandidatar.addEventListener('click', () => {
        if (vagasSelecionadas.length > 0) {   
            spanTrocaDisplayEvento.style.display = 'none'
        } else {
            spanTrocaDisplayEvento.style.display = 'block'
        }
    })
})


//FUNÇÃO DE ADICIONAR E REMOVER OS CARDS DAS VAGAS SELECIONADAS PELO BOTÃO "REMOVER CANDIDATURA"

function renderizaCardSelecionados() {
    let buttonCandidatarSelecionadas = document.querySelectorAll('.buttonCandidatar')
    
    vagasSelecionadas.map(vaga => {
        renderizaCard(vaga)
    })

    buttonCandidatarSelecionadas.forEach(button => {
        button.addEventListener('click', () => {
            let vagaFiltrada = jobsData.find((vaga) =>
                vaga.id == button.id
            )

            if (button.innerText == 'Candidatar') {
                // console.log('apertou')
                let liSelecionadaRemove = document.getElementById(`${vagaFiltrada.id}-card`)
                // console.log(liSelecionadaRemove)
                liSelecionadaRemove.remove()
            } else {
                renderizaCard(vagaFiltrada)
            }
        })
    })
}


//FUNÇÃO PARA RENDERIZAÇÃO DOS CARDS SELECIONADOS E REMOVER CARD DA LISTA PELO BOTÃO DA LIXEIRA

let ulVagasSelecionadas = document.querySelector('#ulVagasSelecionadas')
ulVagasSelecionadas.innerText = ''

function renderizaCard(vagaFiltrada) {
    
    let liSelecionada = document.createElement('li')
    let divH1ButtonRemove = document.createElement('div')
    let h1Selecionada = document.createElement('h1')
    let imgButtonRemove = document.createElement('img')
    let divTags = document.createElement('div')
    let tagEmpresa = document.createElement('p')
    let tagCidade = document.createElement('p')

    h1Selecionada.innerText = vagaFiltrada.title
    imgButtonRemove.src = '../../assets/img/trash.png'
    tagEmpresa.innerText = vagaFiltrada.enterprise
    tagCidade.innerText = vagaFiltrada.location
    liSelecionada.setAttribute('id', `${vagaFiltrada.id}-card`)

    imgButtonRemove.addEventListener('click', () => {
        liSelecionada.remove()
        let button = document.getElementById(`${vagaFiltrada.id}`)
        button.innerText = 'Candidatar'
        
        vagasSelecionadas = vagasSelecionadas.reduce((novaLista, e) => {
            if (e.id != vagaFiltrada.id){
                novaLista.push(e)
            }    
            return novaLista
        }, [])

        localStorage.setItem("vagasSelecionadas", JSON.stringify(vagasSelecionadas))
        
        if (vagasSelecionadas.length > 0) {   
            spanTrocaDisplayEvento.style.display = 'none'
        } else {
            spanTrocaDisplayEvento.style.display = 'block'
        }
    })

    ulVagasSelecionadas.append(liSelecionada)
    liSelecionada.append(divH1ButtonRemove, divTags)
    divH1ButtonRemove.append(h1Selecionada, imgButtonRemove)
    divTags.append(tagEmpresa, tagCidade)
}

renderizaCardSelecionados()