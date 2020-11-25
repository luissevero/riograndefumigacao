module.exports = app => {
    
    app.post('/signup', app.api.user.save)
	app.put('/signup', app.api.user.atualizaCodigo)
    app.post('/signin', app.api.auth.signin)
    app.post('/signinclient', app.api.auth.signinClient)
    app.get('/signin/:login', app.api.auth.verificaEmployee)
    app.get('/signinclient/:login', app.api.auth.verificaClient)
    app.post('/criptografar', app.api.auth.criptografar)
        
    app.route('/ships')
        .all(app.config.passport.authenticate())
        .get(app.api.ships.getShips)
        .post(app.api.ships.setShip)
    
    app.route('/pesquisaships/:pesquisa/:seaport')
        .get(app.api.ships.getPesquisaShips)

    app.route('/shipspainel')
        .get(app.api.ships.getShipsPainel)
        
    app.route('/ships/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.ships.getShip)
        
    app.route('/feed')
        .all(app.config.passport.authenticate())    
        .get(app.api.feed.getFeeds)
        .post(app.api.feed.setFeed)

    app.route('/feed/:id')
        .all(app.config.passport.authenticate())    
        .get(app.api.feed.getFeed)
    
    app.route('/feedpership/:id')
        .all(app.config.passport.authenticate())    
        .get(app.api.feed.getFeedPerShip)

    app.route('/clients')
        .all(app.config.passport.authenticate())
        .get(app.api.clients.getClients)

    app.route('/clients/:id')
        .all(app.config.passport.authenticate())    
        .get(app.api.clients.getClient)

    app.route('/shipclients/:client')
        .all(app.config.passport.authenticate())
        .get(app.api.ships.getClientShips)
        
    app.route('/clientships')
        .all(app.config.passport.authenticate())
        .get(app.api.clients_ships.getClientsShips)
        
    app.route('/seaports')
        .all(app.config.passport.authenticate())    
        .get(app.api.seaports.getSeaports)
        .post(app.api.seaports.setSeaport)

    app.route('/seaportspainel')   
        .get(app.api.seaports.getSeaportsPainel)

    app.route('/seaports/:id')
        //.all(app.config.passport.authenticate())    
        .get(app.api.seaports.getSeaport)
        .put(app.api.seaports.putSeaport)
    
    app.route('/employees')
        .all(app.config.passport.authenticate())
        .get(app.api.employees.getEmployees)
        .post(app.api.employees.save)
    
    app.route('/employees/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.employees.getEmployee)

    app.route('/shipsperseaport/:seaport')
        .all(app.config.passport.authenticate())
        .get(app.api.seaport_ships.getShipsPerSeaport)
         
}