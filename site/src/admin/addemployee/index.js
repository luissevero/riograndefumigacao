import React, {Component} from 'react'
import './styles.css'
import {Formik, Field, Form, isInteger} from 'formik'
import {api} from '../../services/api'
import Header from '../../components/header'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {PRECISA_LOGAR} from '../../config'

const estadoInicial = {
    username: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    id: null,
    redirect: false
}

class AddEmployee extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = async () => {
        window.scrollTo(0, 0)
        var id = await this.props.match.params.id
        await this.setState({id})
        await this.loadData(id)
    }

    loadData = async (produto) => {
        await api.get(`employees/${produto}` , {
            headers: {
                "Authorization": `bearer ${this.props.token}`
            }
        }).then(
            response => { this.setState({name: response.data.name}) },
            response => { this.erroApi(response) }
        )
    }

    carregaEmployees = async () => {
        await api.get(`employees`, {
            headers: {
                "Authorization": `bearer ${this.props.token}`
            }
        }).then(
            response => {this.setState({employees: response.data})}, 
            response => this.erroApi(response)
        ) 
    }

    salvarEmployee = async () => {
        if(this.state.id == 0){
            await api.post(`seaports`, {
                name: this.state.name,
            }).then(response => {
                if(response.status === 204){
                    alert("Porto inserido corretamente!")
                    this.limpaControles()
                }else{
                    alert("Erro na inserção! Tente novamente!")
                }
            })
        }else{
            await api.put(`seaports/${this.state.id}`, {
                name: this.state.name,
            }).then(response => {
                if(response.status === 204){
                    alert("Porto alterado corretamente!")
                    this.limpaControles()
                }else{
                    alert("Erro na alteração! Tente novamente!")
                }
            })
        }
    }
    
    erroApi = async (response) => {
        alert(PRECISA_LOGAR)
        await this.setState({redirect: true})
    }

    limpaControles = async () => {
        await this.setState({name: ''})
    }

    render(){
        const validations = []
        validations.push(this.state.name && this.state.name.trim().length >= 6)
        validations.push(this.state.password && this.state.password.trim().length >= 8)
        validations.push(this.state.password === this.state.confirmPassword)
        validations.push(this.state.email && this.state.email.includes('@'))

        //o formulário só será válido se todas as validações forem verdadeiras, com este reduce implementado
        const validForm = validations.reduce((t, a) => t && a)
        
        return (
            <div>
                {this.state.redirect &&
                    <Redirect to={'/admin'} />
                }
                <section className="page-add">
                    <Header voltarEmployee/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="page-breadcrumb">
                                    <h2 style={{marginBottom: '3%', marginTop: '3%'}}>{this.state.id == 0 ? 'Inserir novo employee' : 'Alterar employee'}</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>

                <div className="contact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Formik 
                                initialValues={{
                                    name: '',
                                }}
                                onSubmit={async values => {
                                    await new Promise(r => setTimeout(r, 1000))
                                    this.salvarEmployee()
                                }}
                                >
                                    <Form className="contact-form">

                                    <div className="row">
                                        
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-left">
                                            <Field name="username" id="username" placeholder="User Name" type="text" value={this.state.username} onChange={async e => { await this.setState({username: e.currentTarget.value})}}/>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-left">
                                            <Field name="name" id="name" placeholder="Name" type="text" value={this.state.name} onChange={async e => { await this.setState({name: e.currentTarget.value})}}/>
                                        </div>

                                    </div>

                                    <div className="row">
                                        
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-left">
                                            <Field name="email" id="email" placeholder="e-mail" type="mail" value={this.state.email} onChange={async e => { await this.setState({email: e.currentTarget.value})}}/>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-left">
                                            <Field name="phone" id="phone" placeholder="Telephone" type="phone" value={this.state.phone} onChange={async e => { await this.setState({phone: e.currentTarget.value})}}/>
                                        </div>
                                        
                                    </div>

                                    <div className="row">
                                        
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-left">
                                            <Field name="password" id="password" placeholder="Password" type="password" value={this.state.password} onChange={async e => { await this.setState({password: e.currentTarget.value})}}/>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-left">
                                            <Field name="confirmpassword" id="confirmpassword" placeholder="Confirm Password" type="password" value={this.state.confirmPassword} onChange={async e => { await this.setState({confirmPassword: e.currentTarget.value})}}/>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-lg-12 text-right">
                                        <button disabled={!validForm} type="submit" style={validForm ? {} : {backgroundColor: '#eee', opacity: 0.3} } >{this.state.id == 0 ? 'Salvar' : 'Alterar'}</button>
                                        </div>
                                    </div>

                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}

const mapStateToProps = ({user}) => {
    return{
        token: user.token
    }
}

export default connect(mapStateToProps, null)(AddEmployee)
