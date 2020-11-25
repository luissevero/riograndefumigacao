const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.senha, hash => {
            const password = hash
            var cidadeCodigo = app.db('cidades').column(['Codigo'])
                                .select()
                                .where("descricao", "LIKE", `${req.body.cidade}`)
                                .first()

            app.db('pessoas')
                .insert({
                    Nome: req.body.Nome,
                    Codigo: req.body.codigo, 
                    login: req.body.login.toLowerCase(),
                    senha: password,
                    Cnpj_Cpf: req.body.Cnpj_Cpf,
					Inclusao: req.body.inclusao,
					Categoria: '10000000'
                })
                .then(maxchave = app.db('pessoas').max({chave: 'Chave'}))

            app.db('pessoas')
                .where('chave', '=', maxchave)
                .update({
                    Codigo: maxchave
                })

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
                            
        })
    }

    const update = (req, res) => {
        
        var maxchave = app.db('pessoas').max({chave: 'Chave'})
         
        /*
        app.db('pessoas')
            .select({chave: 'Chave'})
            .where('Chave', '=', maxchave)
            .then(pessoa => res.json(pessoa))
            .catch(err => res.status(500).json(err))
        */
        
        app.db('pessoas_enderecos')
            .update({codigo: maxchave})
            .then(pessoa => res.json(pessoa))
            .catch(err => res.status(500).json(err))
        
    }
	
	const atualizaCodigo = (req, res) => {
		app.db('pessoas')
		.where('Chave', '=', req.body.chave)
		.update({codigo: req.body.codigo})
		.then(_ => res.status(204).send())
	}
	
    return { save, update, atualizaCodigo }
}