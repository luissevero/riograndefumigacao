module.exports = app => {
    
    const getShipsPainel = (req, res) => {
        app.db('ships')
            //.column('clients.name as clientname').select().from('clients')
            //.column('ships.*').select().from('ships')
            //.leftJoin('clients', 'ships.id_client', 'clients.id')
            .where('status', 'not like', '%finaliz%')
            .orderBy('ships.etb', 'desc')
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).json(err))
    }

    const getShips = (req, res) => {
        app.db('ships')
            .then(ships => res.json(ships))
            .catch(err => res.status(500).json(err))
    }

    const getPesquisaShips = (req, res) => {
        const pesquisa = req.params.pesquisa
        const seaport = req.params.seaport
        if(seaport == 0){
            seaport = '' 
        } 
        app.db('ships')
            .where('name', 'like', '%' + pesquisa + '%')
            .where('id_seaport', '=', seaport)        
            .then(ships => res.json(ships))
            .catch(err => res.status(500).json(err))
    }

    const getShip = (req, res) => {
        app.db('ships')
           .where('id', '=', req.params.id)
           .first()
           .then(produtos => res.json(produtos))
           .catch(err => res.status(500).json(err))
    }

    const getClientShips = (req, res) => {
        app.db('ships')
            .innerJoin('clients_ships', 'clients_ships.id_ship', 'ships.id')
            .where('id_client', '=', req.params.client)
            .then(ships => res.json(ships))
            .catch(err => res.status(500).json(err))
    }

    const setShip = (req, res) => {
        app.db('ships')
        .insert({
            name: req.body.ship_name,
            seaport_orig: req.body.seaport_origin,
            id_seaport: req.body.id_seaport,
            seaport_dest: req.body.seaport_destiny,
            terminal: req.body.terminal,
            agent: req.body.agent,
            eta: req.body.eta,
            etb: req.body.etb,
            ets: req.body.ets,
            type: req.body.type,
            dosage: req.body.dosage,
            full_shipment: req.body.full_shipment,
            shipment: req.body.shipment,
            cargo: req.body.cargo,
            doomed: req.body.doomed,
            recirculation: req.body.recirculation,
            status: req.body.status,
            book: -1
        })
        .then(_ => res.status(204).send())
    } 

    return {getShips, getPesquisaShips, getShipsPainel, getShip, getClientShips, setShip}
}

/*
            

*/