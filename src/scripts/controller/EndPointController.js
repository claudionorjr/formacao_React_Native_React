import NoticeController from './NoticeController.js'
import EndPoint from '../model/EndPoint.js'


/**
 * @class EndPointController
 * 
 * @description: Classe EndPointController !
 * 
 * @author Claudionor Junior <claudionor.junior1994@gmail.com>
 * @version 3.0.0
 * 
 * @returns {EndPoint} endPoint
 */
export default class EndPointController {
    constructor() {
        this.noticeController = new NoticeController()
        this.endpoint = new EndPoint()
        this.endpoint.setCountry("br")
        this.getEndPoint(this.endpoint)
    }

    /**
     * @description: Função de click do submit em relação ao formulário de pesquisa.
     */
    clickSubmit() {
        let select = document.getElementById("select-news")
        let option = select.options[select.selectedIndex]
        let selected = option.value
        if(selected === 'top-headlines') this.searchTopHeadLines() 
        else if(selected === 'everything') this.searchEveryThing(selected)
        else if(selected === 'country') this.searchCountry()

    }

    /**
     * @description: Espera a mudançã de seleção da tag <select>,
     * faz a manipulação do html.
     * 
     * @param {Event} e - Passar como paramentro o evento
     */
    clickSelected(e) {
        let divSearch = document.getElementById("search")
        let divCountries = document.getElementById("div-countries")
        let select  = e.target
        let option = select.options[select.selectedIndex]
        let selected = option.value
        if (selected === "everything") {
            divSearch.style.display = "inline"
            divCountries.style.display = "none"
        }else if(selected === "country") {
            divCountries.style.display = "inline"
            divSearch.style.display = "none"
        }else if(selected === "top-headlines") {
            divCountries.style.display = "none"
            divSearch.style.display = "none"
        }
    }

    /**
     * @description: Procura todos os dados no 'top-headlines'.
     * Por padrão pega as noticias do Brasil.
     * 
     * @see EndPoint
     */
    searchTopHeadLines() {
        this.getEndPoint(this.endpoint)
    }

    /**
     * @description: Procura pela função 'everything' e a cunsulta personalizada, 
     * passada no campo input.
     * 
     * @param {String} selected 
     * @see EndPoint
     */
    searchEveryThing(selected) {
        let inputSearch = document.getElementById("input-search")
        let endpoint = new EndPoint()
        endpoint.setFuntion(selected)
        endpoint.setQuery('q='+inputSearch.value)
        this.getEndPoint(endpoint)
    }

    /**
     * @description: Procura as notícias conforme o país selecionado.
     * 
     * @see EndPoint
     */
    searchCountry() {
        let countriesSelect = document.getElementById("select-countries")
        let option = countriesSelect.options[countriesSelect.selectedIndex]
        let selected = option.value
        let endpoint = new EndPoint()
        endpoint.setCountry(selected)
        endpoint.setQuery('country=')
        this.getEndPoint(endpoint)
    }

    /**
     * @description: método retorna um Array de notícias favoritas.
     */
    getAllNoticiesInDB() {
        return this.noticeController.getAllFavoritiesNoticies()
    }

    /**
     * @description: método recebe um Array de notícias vindas da API.
     * 
     * @param {EndPoint} endpoint
     * @see EndPoint 
     */
    async getEndPoint(endpoint) {
        this.endpoint = endpoint
    }
}
