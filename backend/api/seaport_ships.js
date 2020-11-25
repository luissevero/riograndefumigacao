module.exports = app => {
    
    const getShipsPerSeaport = (req, res) => {
        app.db('ships')
            .where('id_seaport', '=', req.params.seaport)
            .then(ships => res.json(ships))
            .catch(err => res.status(500).json(err))
    }

    return {getShipsPerSeaport}

}