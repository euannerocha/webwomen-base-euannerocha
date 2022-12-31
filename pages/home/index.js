function renderizaCards(array){
    let ancora = document.querySelector('#ulVagas')
    ancora.innerText = ''

    array.map((element) => {
        console.log(element)
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

        tituloCard.innerText = element.title
        infoEmpresa.innerText = element.enterprise
        infoCidade.innerText = element.location
        descricaoVaga.innerText = element.descrition
        tagModalidade.innerText = element.modalities[0]

        buttonCandidatar.innerText = 'Candidatar'
        buttonCandidatar.classList.add = 'noActive'
        
        const buttonToggle = document.querySelector('.noActive')
        const classButton = buttonToggle.classList

        buttonToggle.addEventListener('click', ()=>{
            const transformation = classButton.toggle('active')
        })

       
    
        //socorro
    
        ancora.append(liCard)
        liCard.append(tituloCard, divInfosEmpresaECidade, descricaoVaga, divModalidadeEButton)
        divInfosEmpresaECidade.append(infoEmpresa, infoCidade)
        divModalidadeEButton.append(tagModalidade, buttonCandidatar)
    });
}


renderizaCards(jobsData)