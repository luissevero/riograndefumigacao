module.exports = app => {
    const getPessoas = (req, res) => {
        app.db('pessoas')
           .orderBy('chave')
           .then(users => res.json(users))
           .catch(err => res.status(500).json(err))
    }
    const getPessoa = (req, res) => {
        app.db('pessoas')
		.count('chave', {as: 'contador'})
        .where({login: req.params.id})
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
    }

    const buscaCadastro = (req, res) => {
        app.db('pessoas')
        .leftJoin('pessoas_enderecos', 'pessoas.chave', 'pessoas_enderecos.chave_pessoa')
        .where({'pessoas.chave': req.params.chave})
        .first()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
    }

    return { getPessoas, getPessoa, buscaCadastro }
}