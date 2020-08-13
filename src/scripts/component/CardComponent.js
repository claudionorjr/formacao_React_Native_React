import React from 'react'
import NoticeController from '../controller/NoticeController'
import USDateToBRDate from './USDateToBRDate.js'
import BSN from 'bootstrap.native'


/**
 * @description: Exporta por padrão um CardComponent.
 * 
 * @author Claudionor Silva <claudionor.junior1994@gmail.com>
 * @version 2.0.0
 * 
 * @param {NewsModel} props
 * @returns {CardComponent}
 */
export default class CardComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {news: props.news}
        this.uSDateToBRDate = new USDateToBRDate(props.news.getPublishedAt())
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
                            const noticeController = new NoticeController()
                            noticeController.sendNoticeToModel(this.state.news)
                        }}>
                            Ler Depois <i className="fa fa-star-o"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
