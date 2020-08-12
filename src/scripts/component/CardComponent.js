import React from 'react'
import NoticeController from '../controller/NoticeController'
import USDateToBRDate from './USDateToBRDate.js'
import BSN from 'bootstrap.native'


/**
 * @description: Exporta por padrão um CardComponent.
 * 
 * @author Claudionor Silva <claudionor.junior1994@gmail.com>
 * @version 1.0.0
 * 
 * @param {NewsModel} props
 * @returns {CardComponent}
 */
export default function CardComponent(props) {
    var uSDateToBRDate = new USDateToBRDate(props.news.getPublishedAt())
    const imgStyle = {maxHeight:'200px', width:'auto'}

    return (
        <div className="col mb-4">
            <div className="card">
                <img src={props.news.getUrlImage()} className="card-img-top" style={imgStyle} alt=""/>
                <div className="card-body">
                    <h5>{props.news.getTitle()}</h5>
                    <p className="card-text">{props.news.getDescription()}</p>
                    <p className="text-muted">Publicação: {uSDateToBRDate.date}</p>
                    <p className="text-muted">Fonte: {props.news.getSource()}</p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-info btn-sm ml-2 mb-1" onClick={() => {
                        let modal = document.getElementById('myModal')
                        let title = document.getElementById('titleModal')
                        let content = document.getElementById('contentModal')
                        title.innerHTML = props.news.getTitle()
                        content.innerHTML = props.news.getContent()
                        new BSN.Modal(modal).toggle()
                    }}>
                        Ver Mais <i className="fa fa-plus"></i>
                    </button>
                    <button className="btn btn-light btn-sm ml-2 mb-1" onClick={() => {
                        const noticeController = new NoticeController()
                        noticeController.sendNoticeToModel(props.news)
                    }}>
                        Ler Depois <i className="fa fa-star-o"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
