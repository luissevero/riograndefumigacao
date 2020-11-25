module.exports = app => {
    const getPessoasEnderecos = (req, res) => {
        app.db('pessoas_enderecos')
           .orderBy('chave')
           .then(users => res.json(users))
           .catch(err => res.status(500).json(err))
    }

    const insereEndereco = (req, res) => {
        
        var maxchave = app.db('pessoas').max({chave: 'Chave'})
        var cidadeCodigo = app.db('cidades').column(['Codigo'])
                            .select()
                            .where("descricao", "LIKE", `${req.body.cidade}`)
                            .first()

        app.db('pessoas_enderecos')
                .insert({
                    Chave_Pessoa: maxchave, 
                    Endereco: req.body.endereco,
                    Numero: req.body.numero,
                    Complemento: req.body.complemento,
                    Cidade_Descricao: req.body.cidade,
                    cidade: cidadeCodigo,
                    UF: req.body.uf,
                    bairro: req.body.bairro,
                    Cep: req.body.cep 
                })
                .then(_ => res.status(204).send())   
    }

    return { getPessoasEnderecos, insereEndereco }
}