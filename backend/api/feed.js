module.exports = app => {
    
    const getFeeds = (req, res) => {
        app.db('feed')
           .then(produtos => res.json(produtos))
           .catch(err => res.status(500).json(err))
    }

    const getFeed = (req, res) => {
        app.db('feed')
            .where("id", "=", req.params.id)
            .first()
           .then(feed => res.json(feed))
           .catch(err => res.status(500).json(err))
    }

    const getFeedPerShip = (req, res) => {
        app.db('feed')
            .where("id_ship", "=", req.params.id)
            .then(feed => res.json(feed))
            .catch(err => res.status(500).json(err))
    }


    const setFeed = (req, res) => {
        app.db('feed')
        .insert({
            day: req.body.day,
            month: req.body.month,
            year: req.body.year,
            time: req.body.time,
            id_employee: req.body.employee,
            id_ship: req.body.ship,
            text: req.body.text
        })
        .then(_ => res.status(204).send())
    } 


    return {getFeeds, getFeed, setFeed, getFeedPerShip}
}