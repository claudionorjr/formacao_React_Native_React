/**
 * @description: Reducer recebe dados do Action do Component e envia um novo estado.
 * 
 * @param {State} state 
 * @param {Action} action 
 */
export default function reducer (state = { list: [] , fav: []}, action){
    
    switch (action.type) {
        case 'notice/add/favorite':
            return {
                ...state,
                list: action.list,
                fav: action.fav
            }
        case 'notice/remove/favorite':
            return {
                ...state,
                list : action.list,
                fav: action.fav
            }
        default:
            return state;
    }
  }