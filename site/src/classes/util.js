import moment from 'moment'

export default class Util {
    
    static completarZerosEsquerda(str, length){
            const resto = length - String(str).length
            return '0'.repeat(resto > 0 ? resto : '0') + str
    }

    static urlExists(chave){
        return 'http://192.168.15.150/severo/anamodasreact/frontend/src/img/products/PD' + this.completarZerosEsquerda(chave, 6) + '.jpg'
    }

    static formataData(data){
        return moment(data).format('yyyy-MM-DD')
    }
}