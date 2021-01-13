import moment from 'moment'

export default class Util {
    
    static completarZerosEsquerda(str, length){
            const resto = length - String(str).length
            return '0'.repeat(resto > 0 ? resto : '0') + str
    }

    static urlExists(chave){
        return 'http://rgfumigacao.com.br/api/pictures/' + chave + '.png'
    }

    static formataData(data){
        return moment(data).format('yyyy-MM-DD')
    }
}