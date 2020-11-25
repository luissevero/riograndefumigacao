module.exports = app => {
    
    const getClients = (req, res) => {
        app.db('clients')
           .then(produtos => res.json(produtos))
           .catch(err => res.status(500).json(err))
    }

    const getClient = (req, res) => {
        app.db('clients')
           .where('id', '=', req.params.id)
           .first()
           .then(produtos => res.json(produtos))
           .catch(err => res.status(500).json(err))
    }

    return {getClients, getClient}
}