module.exports = app => {
    
    const getProdutos = (req, res) => {
        app.db('produtos')
           .where('preco_venda', '>', 0)
           .where('produto_web', '=', 1)
           .where('produto_empresa', '=', req.params.empresa)
           .orderBy('chave')
           .limit(`${req.params.limit}`)
           .offset(`${req.params.limit}`*`${req.params.pag}`)
           .then(produtos => res.json(produtos))
           .catch(err => res.status(500).json(err))
    }

    const pesquisarProduto = (req, res) => {
        app.db('produtos')
        .where('chave', '=', `${req.params.id}`)
        .where('preco_venda', '>', 0)
        .where('produto_web', 1)
           .then(produtos => {
               if(!produtos){
                    const msg = `Produto com descrição ${req.params.id} não encontrado`
                    return res.status(400).send(msg)
                }else{
                    return res.json(produtos)
                }
           })
           .catch(err => res.status(400).json(err))        
    }

    const save = (req, res) => {
        if(!req.body.descricao.trim()){
            return res.status(400).send('Descrição é um campo obrigatório')
        }
        if(!req.body.preco){
            return res.status(400).send('Preço é um campo obrigatório')
        }
        app.db('produtos')
           .insert(req.body)
           .then(_ => res.status(204).send())
           .catch(err => res.status(500).json(err))
    }

    const getProdutosCategoria = (req, res) => {
        app.db('produtos').where(function(){
            //this.where('descricao', 'like', `%${req.params.grupo}%`).orWhere('grupo1', '=', `${req.params.grupo}`)
            this.where('grupo1', '=', `${req.params.grupo}`)
        })
        .where('produto_empresa', '=', req.params.empresa)
        .where('preco_venda', '>', 0)
        .where('produto_web', '=', 1)
        .orderBy('chave')
        .limit(`${req.params.limit}`)
        .offset(`${req.params.limit}`*`${req.params.pag}`)
        .then(produtos => res.json(produtos))
        .catch(err => res.status(500).json(err)) 
    }

    const updateProdutoPreco = (req, res, preco) => {
        app.db('produtos')
           .where({id: req.params.id})
           .update({preco})
           .then(_ => res.status(204).send("Preço atualizado. "))
           .catch(err => res.status(400).json(err))
    }

    const alterarPreco = (req, res) => {
        app.db('produtos')
           .where({ id: req.params.id})
           .first()
           .then(produto => {
               if(!produto){
                    const msg = `Produto com id ${req.params.id} não encontrado`
                    return res.status(400).send(msg)
                }
                const novoPreco = req.params.preco
                updateProdutoPreco(req, res, novoPreco)
           })
           .catch(err => res.status(400).json(err))        
    }

    return { getProdutos, getProdutosCategoria, save, pesquisarProduto, alterarPreco }
}