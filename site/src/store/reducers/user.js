import { USER_LOGGED_IN, USER_LOGGED_OUT} from '../actions/actionTypes'

const initialState = {
    nome: '',
    email: '',
    chave: null,
    token: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGGED_IN:
            return{
                ...state,
                nome: action.payload.nome,
                email: action.payload.login,
                chave: action.payload.chave,
                token: action.payload.token
            } 
        case USER_LOGGED_OUT:
            return{
                ...state,
                nome: null,
                email: null,
                chave: null,
                token: ''
            }
        default:
            return state
    }
}

export default reducer
/*
http://tacharrg.ddns.net/siacweb/web.php/ecommerce/venda_detalhe/57180011
*/ 