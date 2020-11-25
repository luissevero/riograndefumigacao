const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    
    const getEmployees = (req, res) => {
        app.db('employees')
            .then(grupo_icms => res.json(grupo_icms))
            .catch(err => res.status(500).json(err))
    }

    const getEmployee = (req, res) => {
        app.db('employees')
        .where("id", "=", req.params.id)
            .first()
           .then(grupo_icms => res.json(grupo_icms))
           .catch(err => res.status(500).json(err))
    }

    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            app.db('employees')
                .insert({
                    username: req.body.username,
                    name: req.body.name, 
                    email: req.body.email,
                    password: password,
                    phone: req.body.phone
                })
                .then(_ => res.status(204).send()) 
                            
        })
    }


    
    return {getEmployees, getEmployee, save}

}