const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto-js')

module.exports = app => {
    
    const criptografar = async (req, res) => {
        let senha = crypto.MD5(req.body.senha).toString()
        res.json({
            senha
        })
    }
    
    const signinClient = async (req, res) => {
        if(!req.body.login || !req.body.senha){
            return res.status(400).send('Dados incompletos')
        }

        const user = await app.db('clients')
                              .whereRaw("LOWER(username) = LOWER(?)", req.body.login)
                              .first()


        if(user){
            //res.status(200).send(user)
            let senha = crypto.MD5(req.body.senha).toString()
            if(user.password === senha){
                const payload = {id: user.id}
                res.json({
                    nome: user.name,
                    login: user.username,
                    token: jwt.encode(payload, authSecret)
                })
            }else{
                return res.status(401).send('Senha incorreta!')
            }
        }else{
            res.status(400).send('Usuário não cadastrado')
        }

    }

    const signin = async (req, res) => {
        if(!req.body.login || !req.body.senha){
            return res.status(400).send('Dados incompletos')
        }

        const user = await app.db('employees')
                              .whereRaw("LOWER(username) = LOWER(?)", req.body.login)
                              .first()

        if(user){
                                //res.status(200).send(user)
            let senha = crypto.MD5(req.body.senha).toString()
            if(user.password === senha){
                const payload = {id: user.id}
                res.json({
                    nome: user.name,
                    login: user.username,
                    token: jwt.encode(payload, authSecret)
                })
            }else{
                return res.status(401).send('Senha incorreta!')
            }
        }else{
            res.status(400).send('Usuário não cadastrado')
        }
        /*
        if(user){
            //res.status(200).send(user)
            
            bcrypt.compare(req.body.senha, user.password, (err, isMatch) => {
                if(err || !isMatch){
                    return res.status(401).send('Usuário ou senha incorreta!')
                }

                const payload = {id: user.id}
                res.json({
                    nome: user.name,
                    login: user.username,
                    token: jwt.encode(payload, authSecret)
                })
            })
            
        }else{
            res.status(400).send('Usuário não cadastrado')
        }
        */
    }
	
	const verificaEmployee = async (req, res) => {
		app.db('employees')
		.where("username", '=', req.params.login)
		.first()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
    }
    
    const verificaClient = async (req, res) => {
		app.db('clients')
		.where("username", '=', req.params.login)
		.first()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
    }
    

    return {signin, signinClient, verificaEmployee, verificaClient, criptografar }
}