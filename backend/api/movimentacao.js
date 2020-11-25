module.exports = app => {
    
    const getMovimentacao = (req, res) => {
        app.db('movimentacao').max({chave: 'Chave'})
           .first()
           .then(movimentacao => res.json(movimentacao))
           .catch(err => res.status(500).json(err))
    }

    const finalizaCompra = (req, res) => {
        
        var maxchave
        app.db('movimentacao')
        .insert({
            Tipo: req.body.tipo, 
            Nota_Fiscal: req.body.notaFiscal,
            Dados_Adic: req.body.dadosAdic,
            Sub_Total: req.body.subTotal,
            Total: req.body.total,
            Serie: 'WE',
            Cfop: '9.998',
            Nome_Pessoa: req.body.nomePessoa,
            Pessoa: req.body.pessoa,
            CondPag: req.body.condicao,
			Empresa: req.body.empresa,
            Emissao: req.body.emissao,
            Lancamento: req.body.lancamento,
            Data_saida: req.body.dataSaida,
            tipo_entrega: req.body.tipoEntrega,
			ValorFrete: req.body.valorFrete,
			ValorProdutos: req.body.valorProdutos
            })
        .then(res.status(204).send())                     
    }

    return { getMovimentacao, finalizaCompra }
}

//.max({chave: 'Chave'}) dascwq