import React, {Component} from 'react'
import './styles.css'
import {Formik, Field, Form} from 'formik'
import Logo from '../../img/logos/rgf.png'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {login} from '../../store/actions/user'
import { setserver } from '../../store/actions/server'
import {api, apiLocal, onlineUrl, localUrl} from '../../services/api'
import {apiEmployee} from '../../services/apirgfumiga'
import md5 from 'md5'

const estadoInicial = {
    login: 'rgfumigacao',
    senha: 'r10gr4nd3fumig@c@o',
    login2: '',
    nome: '',
    token: '',
    redirect: false,
    token: '',
    online: false
}

class Login extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = () => {

    }

    signin = async () => {
        /*
        await api.post(`criptografar`, {
            senha: this.state.senha
        }).then(
            async res => {
                const sanha = res.data.senha
            */
                await apiEmployee.post(`login.php`, {
                    username: this.state.login,
                    password: md5(this.state.senha),
                }).then(
                    async res2 => {
                        await this.setState({token: res2.data})
                    }
                )
                
             
        
        if(this.state.token == 'false'){
            alert("Falha no acesso!")
        }else{
            alert('Login realizado')
            await this.props.onLogin({...this.state}) 
            this.setState({redirect: true})
        }
        
                
        
        /*
        
        try{
            await api.post(`signin`, {
                login: this.state.login,
                senha: this.state.senha,
            }).then(
                async res => {
                    await api.get(`signin/${this.state.login}`).then(
                    async res2 => {
                        await this.setState({nome: res2.data.nome})
                        await this.setState({login2: res2.data.login})
                        axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
                        await this.setState({token: res.data.token, online: true})
                        await this.props.onSetServidor({...this.state})
                        await this.props.onLogin({...this.state})        
                        this.setState({redirect: true})
                    })
                },
                async resLocal => {
                    await apiLocal.post(`signin`, {
                        login: this.state.login,
                        senha: this.state.senha,
                    }).then(
                        async resLocal2 => {
                            await apiLocal.get(`signin/${this.state.login}`).then(
                                async resLocal3 => {
                                    await this.setState({nome: resLocal3.data.nome})
                                    await this.setState({login2: resLocal3.data.login})
                                    axios.defaults.headers.common['Authorization'] = `bearer ${resLocal2.data.token}`
                                    //console.log(res.data.token)
                                    await this.setState({token: resLocal2.data.token, online: false})
                                    await this.props.onSetServidor({...this.state})
                                    await this.props.onLogin({...this.state})        
                                    this.setState({redirect: true})
                                }
                            )
                        }
                    )
                }
            )
        }catch(e){
            alert(e)
        }
         */  
    }


    render(){
        const validations = []
        validations.push(this.state.login && this.state.login.trim().length >= 4)
        validations.push(this.state.senha && this.state.senha.trim().length >= 4)

         //o formulário só será válido se todas as validações forem verdadeiras, com este reduce implementado
         const validForm = validations.reduce((t, a) => t && a)

        return (
            <section >
                {this.state.redirect &&
                    <Redirect to={'/admin/inicio'} />
                }
                <div>
                    
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                <img src={Logo} />
                                <div className="section-title">
                                    <h2>Administrador</h2>
                                </div>
                            </div>
                        </div>
                    
                    <div id="contender">

                        <Formik 
                            initialValues={{
                                login: '',
                                senha: ''
                            }}
                            onSubmit={async values => {
                                await new Promise(r => setTimeout(r, 500))
                                this.signin()
                            }}
                        >
                            <Form className="contact-form">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                        <Field value={this.state.login} onChange={e => { this.setState({login: e.currentTarget.value})}} id="login" name="login" type="text" placeholder="Login" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                        <Field value={this.state.senha} onChange={e => { this.setState({senha: e.currentTarget.value})}} id="senha" name="senha" type="password" placeholder="Senha" />
                                    </div>
                                </div>
                                <div className="row"></div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-right">
                                        <button disabled={!validForm} type="submit" style={validForm ? {backgroundColor: '#eee', opacity: 0.9} : {backgroundColor: '#eee', opacity: 0.3}} >Entrar</button>
                                    </div>
                            </Form>
                        </Formik>
                    </div>                
                </div>
        </section> 
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin: user => dispatch(login(user)),
        onSetServidor: servidor => dispatch(setserver(servidor))
    }
}

export default connect(null, mapDispatchToProps)(Login)


/****  
<Link to={{pathname: `/admin/inicio`}}><button type="submit" style={{backgroundColor: '#eee', opacity: 0.9}} >Entrar</button></Link> 
****/