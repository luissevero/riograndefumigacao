module.exports = app => {
    
    const getCondicoes = (req, res) => {
        app.db('condicoes')
           .where('condicao_web', '=', 1)
           .then(condicoes => res.json(condicoes))
           .catch(err => res.status(500).json(err))
    }

    return {getCondicoes}
}