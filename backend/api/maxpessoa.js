module.exports = app => {
    
    const getMaxPessoa = (req, res) => {
        app.db('pessoas').max({chave: 'Chave'})
           .first()
           .then(movimentacao => res.json(movimentacao))
           .catch(err => res.status(500).json(err))
    }

    return { getMaxPessoa }
}