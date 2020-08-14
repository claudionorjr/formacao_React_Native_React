import React from 'react'
import ReactDOM from 'react-dom'
import CardComponent from '../component/CardComponent'
import CardFavoriteComponent from '../component/CardFavoriteComponent'
import NoticeController from './NoticeController.js'
import EndPoint from './model/EndPoint.js'
import ModalComponent from '../component/ModalComponent'
import NavBarComponent from '../component/NavBarComponent'
import FormComponent from '../component/FormComponent'


/**
 * @class NoticeViewController
 * 
 * @description: Classe modelo para uma view de notícias!
 * 
 * @author Claudionor Junior <claudionor.junior1994@gmail.com>
 * @version 3.0.0
 */
export default class NoticeViewController {
    constructor() {
        this.noticeController = new NoticeController()
        this.endpoint = new EndPoint()
        this.endpoint.setCountry("br")
        this.addAllNoticesNew(this.endpoint)
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
        this.addAllNoticesNew(this.endpoint)
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
        this.addAllNoticesNew(endpoint)
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
        this.addAllNoticesNew(endpoint)
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
    getAllNoticies(endpoint) {
        return this.noticeController.sendJSONToView(endpoint)
    }

    /**
     * @description: Método envia cada objeto de um Array para renderizar.
     * 
     * @param {EndPoint} endPoint
     */
    async addAllNoticesNew(endPoint) {
        var allNoticesArray = endPoint ? (await this.getAllNoticies(endPoint)).articles : await this.getAllNoticiesInDB()
        let favorities = await this.noticeController.getAllFavoritiesNoticies();
        ReactDOM.render(
            <React.StrictMode >
                <header>
                    <NavBarComponent controller={this} />
                </header>
                <main className="container-lg mt-5">
                    <div className="mt-5">
                    {endPoint ? (<FormComponent controller={this}/>) : null}
                    </div>
                    <div className="mt-5">
                        <div className="row justify-content-around row-cols-1 row-cols-md-2" id="cardsArea">
                            {
                                endPoint ?
                                (<CardComponent array={allNoticesArray} favorities={favorities} />)
                                :
                                (<CardFavoriteComponent array={allNoticesArray} />)
                            }
                        </div>
                        <ModalComponent />
                    </div>
                </main>
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
}
