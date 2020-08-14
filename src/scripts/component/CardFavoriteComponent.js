import React from 'react'
import NoticeController from '../controller/NoticeController'
import USDateToBRDate from './USDateToBRDate.js'
import NewsModel from '../controller/model/NewsModel.js'
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
        this.state = {array: props.array}
    }
    
    /**
     * @description: Recebe um Array da 'ViewController' e faz um '.map' e renderiza cada objeto do array.
     */
    render() {
        return this.state.array.map((e, index) => {
            var newsModel = new NewsModel()
            newsModel.setTitle(e['title'])
            newsModel.setSource(e['source'])
            newsModel.setDescription(e['description'])
            newsModel.setContent(e['content'])
            newsModel.setPublishedAt(e['publishedAt'])
            newsModel.setUrlImage(e['urlToImage'])
            var uSDateToBRDate = new USDateToBRDate(newsModel.getPublishedAt())
            return (
                <div className="col mb-4" key={index}>
                    <div className="card">
                        <img src={newsModel.getUrlImage()} className="card-img-top" style={{maxHeight:'200px', width:'auto'}} alt=""/>
                        <div className="card-body">
                            <h5>{newsModel.getTitle()}</h5>
                            <p className="card-text">{newsModel.getDescription()}</p>
                            <p className="text-muted">Publicação: {uSDateToBRDate.date}</p>
                            <p className="text-muted">Fonte: {newsModel.getSource()}</p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-info btn-sm ml-2 mb-1" onClick={() => {
                                let modal = document.getElementById('myModal')
                                let title = document.getElementById('titleModal')
                                let content = document.getElementById('contentModal')
                                title.innerHTML = newsModel.getTitle()
                                content.innerHTML = newsModel.getContent()
                                new BSN.Modal(modal).toggle()
                            }}>
                                Ver Mais <i className="fa fa-plus"></i>
                            </button>
                            <button className="btn btn-light btn-sm ml-2 mb-1" onClick={() => {
                                this.noticeController.deleteNotice(newsModel.getTitle())
                                this.state.array.splice(index, 1)
                                this.setState({
                                    array: this.state.array
                                })
                            }}>
                                Remover Favorito <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
    }
}
