module.exports = app => {
    
    const getSeaports = (req, res) => {
        app.db('seaports')
           .then(grupo_icms => res.json(grupo_icms))
           .catch(err => res.status(500).json(err))
    }

    const getSeaportsPainel = (req, res) => {
        app.db('seaports')
           .then(grupo_icms => res.json(grupo_icms))
           .catch(err => res.status(500).json(err))
    }

    const getSeaport = (req, res) => {
        app.db('seaports')
        .where("id", "=", req.params.id)
            .first()
           .then(grupo_icms => res.json(grupo_icms))
           .catch(err => res.status(500).json(err))
    }

    const setSeaport = (req, res) => {
        app.db('seaports')
        .insert(
            {
                name: req.body.name,
            }
        )
        .then(_ => res.status(204).send())
    }

    const putSeaport = (req, res) => {
        app.db('seaports')
        .where("id", "=", req.params.id)
            .first()
            .update({name: req.body.name})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).json(err))
    }

    return {getSeaports, getSeaportsPainel, getSeaport, setSeaport, putSeaport}
}
/*
grupo_icms->chave === produto->g_icms
movitens->st === grupo_icms->situacao_tributaria
*/