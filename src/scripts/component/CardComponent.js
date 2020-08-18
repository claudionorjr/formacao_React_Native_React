import React from 'react'
import { connect } from 'react-redux'
import USDateToBRDate from './USDateToBRDate.js'
import NewsModel from '../model/NewsModel.js'
import BSN from 'bootstrap.native'
import NoticeModel from '../model/NoticeModel'


/**
 * @description: Exporta por padrão um CardComponent.
 * 
 * @author Claudionor Silva <claudionor.junior1994@gmail.com>
 * @version 3.0.0
 * 
 * @param {Array} props.list
 * @returns {CardComponent}
 */
class CardComponent extends React.Component {
    

    async componentDidMount() {
        const noticeModel = new NoticeModel()
        let endPoint = this.props.endPoint
        const noticiesAPI = (await noticeModel.getJSON(endPoint)).articles
        let fav = await noticeModel.getAll()
        this.props.dispatch({ type: 'notice/add/favorite', list: noticiesAPI, fav: fav })
    }

    /**
     * @description: Método 'isFav' verifica se o atual 'NewsModel' já está favoritado.
     * 
     * @param {NewsModel} notice 
     */
    isFav = (notice) => {
        if(this.props.fav.length > 0) {
            for (let index = 0; index < this.props.fav.length; index++) {
                let retorno = this.props.fav[index]['title'] === notice['_title']
                if (retorno) return retorno
            }
        }
        return false
    }

    /**
     * @description: Recebe um Array da 'ViewController' e faz um '.map' e renderiza cada objeto do array.
     */
    render() {
        return this.props.list.map((e, index) => {
            const newsModel = new NewsModel()
            newsModel.setTitle(e['title'])
            newsModel.setSource(e['source']['name'])
            newsModel.setDescription(e['description'])
            newsModel.setContent(e['content'])
            newsModel.setPublishedAt(e['publishedAt'])
            newsModel.setUrlImage(e['urlToImage'])
            var uSDateToBRDate = new USDateToBRDate(newsModel.getPublishedAt())
            return (
                <div className="col mb-4" key={e.title}>
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
                            {
                                this.isFav(newsModel) ?
                                (<button className="btn btn-light btn-sm ml-2 mb-1" style={{color: "green"}} onClick={() => {}}>
                                    Favorita <i className="fa fa-check"></i>
                                </button>)
                                :
                                (<button className="btn btn-light btn-sm ml-2 mb-1" onClick={async () => {
                                    const noticeModel = new NoticeModel()
                                    await noticeModel.create(newsModel)
                                    var newList = [...this.props.fav]
                                    newList.push(e)
                                    this.props.dispatch({ type: 'notice/add/favorite', fav: newList, list: this.props.list })
                                }}>
                                    Ler Depois <i  className="fa fa-star-o"></i>
                                </button>)
                            }
                        </div>
                    </div>
                </div>
            )
        })
    }
}

const mapStateToProps = (state) => {
    return { list: state.list, fav: state.fav }
}

export default connect(mapStateToProps)(CardComponent)
