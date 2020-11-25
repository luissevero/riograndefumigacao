module.exports = app => {
    
    const getRotas = (req, res) => {
        app.db('rotas')
           .then(rotas => res.json(rotas))
           .catch(err => res.status(500).json(err))
    }

    return {getRotas}
}