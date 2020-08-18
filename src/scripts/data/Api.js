/**
 * @class Api
 * 
 * @description: Classe modelo para buscar natícias na API!
 * 
 * @version 2.0.0
 * @author Claudionor Junior <claudionor.junior1994@gmail.com>
 * 
 * @see https://newsapi.org/docs
 */
export default class Api {
    baseURL = 'https://newsapi.org/v2/';
    apiKey = "06e42da03f0044469b0ea3844b845745";

    /**
     * @description: Acessa a API e retorna um Array de notícias.
     * 
     * @param {EndPoint} endpoint
     * @see NoticeModel.getJson()
     */
    init(endpoint) {
        let url = `${this.baseURL}${endpoint.getFunction()}?${endpoint.getQuery()}&apikey=${this.apiKey}`;
        return fetch(url);
    }
}
