import React, {Component} from 'react'
import './styles.css'
import {Formik, Field, Form} from 'formik'
import Logo from '../../img/logos/rgf.png'
import {Link, Redirect} from 'react-router-dom'
import api from '../../services/api'
import axios from 'axios'
import {server, showError, showSuccess} from '../../common'
import {connect} from 'react-redux'
import {login} from '../../store/actions/user'

const estadoInicial = {
    login: 'agrex',
    senha: 'rgf10',
    login2: '',
    nome: '',
    token: '',
    redirect: false
}

class Login extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = () => {

    }

    signin = async () => {
        
        try{
            const res = await axios.post(`${server}/signinclient`, {
                login: this.state.login,
                senha: this.state.senha,
            })
            //alert(JSON.stringify(res))
            // return 1
            const res2 = await axios.get(`${server}/signinclient/${this.state.login}`)
            //alert(JSON.stringify(res2))
            await this.setState({nome: res2.data.name})
            await this.setState({login2: res2.data.username})
            await this.setState({token: res.data.token})
            await this.props.onLogin({...this.state})
            //alert(this.state.token)            
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`

            //alert(this.state.nome)
            this.setState({redirect: true})
        }catch(e){
            showError(e)
        }     
    }


    render(){
        return (
            <section className="latest-products spad">
                
                {this.state.redirect &&
                    <Redirect to={'/admin/inicio'} />
                }

                <div className="container">
                    <div className="product-filter">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                <img src={Logo} />
                                <div className="section-title">
                                    <h2>Rio Grande Fumigação</h2>
                                </div>
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
                                        <button type="submit" style={{backgroundColor: '#eee', opacity: 0.9}} >Entrar</button>
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
        onLogin: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)


/****  
<Link to={{pathname: `/admin/inicio`}}><button type="submit" style={{backgroundColor: '#eee', opacity: 0.9}} >Entrar</button></Link> 
****/