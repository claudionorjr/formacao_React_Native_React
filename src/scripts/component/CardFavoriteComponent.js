import React from 'react'
import NoticeController from '../controller/NoticeController'
import NoticeViewController from '../controller/NoticeViewController'
import USDateToBRDate from './USDateToBRDate.js'
import BSN from 'bootstrap.native'


/**
 * @description: Exporta por padrão um CardFavoriteComponent.
 * 
 * @author Claudionor Silva <claudionor.junior1994@gmail.com>
 * @version 1.0.0
 * 
 * @param {NewsModel} props
 * @returns {CardFavoriteComponent}
 */
export default class CardFavoriteComponent extends React.Component {
    constructor(props) {
        super(props)
        this.noticeController = new NoticeController()
        this.uSDateToBRDate = new USDateToBRDate(props.news.getPublishedAt())
        this.state = {news: props.news}
    }
    
    render() {
        return (
            <div className="col mb-4">
                <div className="card">
                    <img src={this.state.news.getUrlImage()} className="card-img-top" style={{maxHeight:'200px', width:'auto'}} alt=""/>
                    <div className="card-body">
                        <h5>{this.state.news.getTitle()}</h5>
                        <p className="card-text">{this.state.news.getDescription()}</p>
                        <p className="text-muted">Publicação: {this.uSDateToBRDate.date}</p>
                        <p className="text-muted">Fonte: {this.state.news.getSource()}</p>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-info btn-sm ml-2 mb-1" onClick={() => {
                            let modal = document.getElementById('myModal')
                            let title = document.getElementById('titleModal')
                            let content = document.getElementById('contentModal')
                            title.innerHTML = this.state.news.getTitle()
                            content.innerHTML = this.state.news.getContent()
                            new BSN.Modal(modal).toggle()
                        }}>
                            Ver Mais <i className="fa fa-plus"></i>
                        </button>
                        <button className="btn btn-light btn-sm ml-2 mb-1" onClick={() => {
                            this.noticeController.deleteNotice(this.state.news.getTitle())
                        }}>
                            Remover Favorito <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    
}
