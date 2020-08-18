import Api from '../data/Api.js'
import Database from '../data/DB.js'


/**
 * @class NoticeModel
 * 
 * @description: Modelo para gerenciar as notícias!
 * 
 * @author Claudionor Junior <claudionor.junior1994@gmail.com>
 * @version 3.0.0
 * 
 * @see https://www.fabricadecodigo.com/usando-indexeddb-em-apps-web/ //caso de dúvidas com os métodos.
 */
export default class NoticeModel {
    /**
     * @description: Busca na API todas as 20 ultimas notícias do Brasil.
     * 
     * @param {EndPoint} endpoint 
     */
    async getJSON(endpoint) {
        var api = new Api()
        let response = await api.init(endpoint)
        const data = await response.json()
        return data;
    }

    /**
     * @description: Busca no indexedDB todos os objetos favoritados pelos usuários.
     * 
     * @see NoticeController.getAllFavoritiesNoticies()
     */
    getAll() {
        return new Promise((resolve, reject) => {
            var database = new Database()
            database.open((db) => {
                var transaction = db.transaction('noticesDB', "readonly")
                var store = transaction.objectStore('noticesDB')
                var request = store.getAll()
                request.onsuccess = () => resolve(request.result)
                request.onerror = () => console.log(`Error in get All Tasks!`)
            })
        })
    }

    /**
     * @description: Cria no indexedDB um notícia favoritada pelo usuário.
     * @param {NewsModel} news
     */
    create(news) {
        return new Promise((resolve) => {
            var database = new Database()
            database.open((db) => {
                var transaction = db.transaction('noticesDB', "readwrite")
                var store = transaction.objectStore('noticesDB')
                var add = store.add({content: news.getContent(), description: news.getDescription(),
                    publishedAt: news.getPublishedAt(), name: news.getSource(), title: news.getTitle(),
                    urlToImage: news.getUrlImage()
                })
                add.onsuccess = (event) => resolve(event.target.result)
                add.onerror = () => {}
            })
        })
        
    }

    /**
     * @description: Recebe um valor unico do 'title' e enviar o 'id' para deletar.
     * 
     * @param {String} value 
     */
    getToDelete(value) {
        var database = new Database()
        database.open((db) => {
            var transaction = db.transaction('noticesDB', "readonly")
            var store = transaction.objectStore('noticesDB')
            var index = store.index("title")
            var filtro = IDBKeyRange.only(value)
            var request = index.openCursor(filtro)
            request.onsuccess = (event) => {
                var cursor = event.target.result
                if (cursor) {
                    this.delete(cursor['primaryKey'])
                }
            }
            request.onerror = () => console.log(`Error to get and Delete!`)
        })
    }
    
    /**
     * @description: Recebe um 'id' que será deletado no indexedDB.
     * 
     * @param {PrimaryKey} id 
     */
    delete(id){
        var database = new Database()
        database.open((db) => {
            var transaction = db.transaction('noticesDB', "readwrite")
            var store = transaction.objectStore('noticesDB')
            var request = store.delete(id)
            request.onsuccess = () => {}
            request.onerror = (event) => console.log(`Error to delete Task: ${event}`)
        })
    }
}
