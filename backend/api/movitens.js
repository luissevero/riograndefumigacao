module.exports = app => {
    
    const getMovItens = (req, res) => {
        app.db('movitens')
           .limit(5)
           .orderBy("Chave", "desc")
           .then(movitens => res.json(movitens))
           .catch(err => res.status(500).json(err))
    }

    const insereItem = (req, res) => {
        var moment = require("moment");
		var dateStr = moment().utc().format();
        app.db('movitens')
        .insert({
            ChaveMov: req.body.chavemov, 
            Codigo_Produto: req.body.codigoProduto,
            Descricao: req.body.descricao,
            Quantidade: req.body.quantidade,
            Valor_Unitario: req.body.valorUnitario,
            Valor_Total: req.body.valorTotal,
            Preco_Real: req.body.valorTotal,
            ST: req.body.situacaoTributaria,
            Unidade: req.body.un,
            Lancamento: dateStr
            })
        .then(_ => res.status(204).send())             
    }

    return { getMovItens, insereItem }
}