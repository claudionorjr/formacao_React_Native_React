import NoticeModel from '../model/NoticeModel.js'


/**
 * @class NoticeController
 * 
 * @description: Classe modelo para controllar informações entre VIEW e MODEL!
 * 
 * @author Claudionor Junior <claudionor.junior1994@gmail.com>
 * @version 2.0.0
 */
export default class NoticeController {
    constructor(news) {
        this.noticeModel = new NoticeModel(news)
    }

    /**
     * @description: Executa o método create do model.
     */
    sendNoticeToModel(news) {
        this.noticeModel.create(news)
    }

    /**
     * @description: Envia um array para o ViewController
     * 
     * @param {Array} callback 
     */
    sendJSONToView(endpoint) {
       return this.noticeModel.getJSON(endpoint)
    }

    /**
     * @description: Envia um array de notícias favoritas para o ViewController
     * 
     * @param {Array} callback 
     * @see NoticeViewController.getAllNoticiesInDB()
     */
    async getAllFavoritiesNoticies() {
        return await this.noticeModel.getAll()
    }

    /**
     * @description: Recebe um 'titulo' das notícias favoritas e enviar para o model.
     * 
     * @param {String} value 
     */
    deleteNotice(value) {
        this.noticeModel.getToDelete(value)
    }
}
