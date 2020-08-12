/**
 * @class Database
 * 
 * @description: Classe modelo para um objeto 'IndexedDB'!
 * 
 * @version 1.0.0
 * @author Claudionor Junior <claudionor.junior1994@gmail.com>
 */
export default class Database {

    /**
     * @description: Método retorna por callback um objeto 'indexedDB'.
     * 
     * @param {IndexedDB} callback 
     * 
     */
    open(callback) {
        this.request = window.indexedDB.open("noticesDB", 1)
        this.request.onerror = (event) => console.log(`Error to Open DB: ${event}`)

        this.request.onupgradeneeded = (event) => {
            console.log("Creating...")
            this.db = event.target.result
            var objectStore = this.db.createObjectStore("noticesDB", { keyPath : "id",  autoIncrement: true })
            objectStore.createIndex("content", "content", { unique: false })
            objectStore.createIndex("description", "description", { unique: false })
            objectStore.createIndex("publishedAt", "publishedAt", { unique: false })
            objectStore.createIndex("name", "name", { unique: false })
            objectStore.createIndex("title", "title", { unique: true })
            objectStore.createIndex("urlToImage", "urlToImage", { unique: false })
            console.log("New DataBase Created successfully.")
        }

        this.request.onsuccess  = (event) => {
            this.db = event.target.result
            callback(this.db)
        }
    }
}
