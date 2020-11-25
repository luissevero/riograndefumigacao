module.exports = app => {
    
    const getClientsShips = (req, res) => {
        app.db('clients_ships')
           .then(codigos => res.json(codigos))
           .catch(err => res.status(500).json(err))
    }

    return {getClientsShips}
}