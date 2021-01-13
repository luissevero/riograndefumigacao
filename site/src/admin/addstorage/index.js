import React, {Component} from 'react'
import './styles.css'
import {Formik, Field, Form, isInteger} from 'formik'
import {api ,apiLocal} from '../../services/api'
import Header from '../../components/header'
import {PRECISA_LOGAR} from '../../config'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

const estadoInicial = {
    name: '',
    id: null,
    category: '',
    amount: '',
    unit: '',
    redirect: false,
    token: '',
    storage: [],
}

class AddStorage extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = async () => {
        window.scrollTo(0, 0)
        var id = await this.props.match.params.id
        await this.setState({token: this.props.token, storage: this.props.location.state.storage})
        await this.setState({id})
        await this.loadData(this.state.storage)
        console.log(JSON.stringify(this.state.storage))
    }

    loadData = async (produto) => {
        await this.setState({unit: produto.unit})
    }

    salvarPorto = async () => {
        if(this.state.id == 0){
            if(this.props.online){
                await api.post(`seaports`, {name: this.state.name}, {
                    headers: {
                        "Authorization": `bearer ${this.props.token}`
                    }
                }
                ).then(
                    response => {
                        if(response.status === 204){
                            alert("Porto inserido corretamente!")
                            this.limpaControles()
                        }else{
                            alert("Erro na inserção! Tente novamente!")
                        }
                    },
                    response => {
                        this.erroApi(response)
                    }
                )
            }else{
                await apiLocal.post(`seaports`, {name: this.state.name}, {
                    headers: {
                        "Authorization": `bearer ${this.props.token}`
                    }
                }
                ).then(
                    response => {
                        if(response.status === 204){
                            alert("Porto inserido corretamente!")
                            this.limpaControles()
                        }else{
                            alert("Erro na inserção! Tente novamente!")
                        }
                    },
                    response => {
                        this.erroApi(response)
                    }
                )
            }
        }else{
            if(this.props.online){
                await api.put(`seaports/${this.state.id}`, {
                    name: this.state.name,
                }, {
                    headers: {
                        "Authorization": `bearer ${this.props.token}`
                    }
                }).then(response => {
                    if(response.status === 204){
                        alert("Porto alterado corretamente!")
                    }else{
                        alert("Erro na alteração! Tente novamente!")
                    }
                })
            }else{
                await apiLocal.put(`seaports/${this.state.id}`, {
                    name: this.state.name,
                }, {
                    headers: {
                        "Authorization": `bearer ${this.props.token}`
                    }
                }).then(response => {
                    if(response.status === 204){
                        alert("Porto alterado corretamente!")
                    }else{
                        alert("Erro na alteração! Tente novamente!")
                    }
                })
            }
        }
    }

    erroApi = async (res) => {
        alert(PRECISA_LOGAR)
        await this.setState({redirect: true})
    }

    limpaControles = async () => {
        await this.setState({name: ''})
    }

    render(){
        
        const validations = []
        validations.push(this.state.name && this.state.name.trim().length >= 8)

        //o formulário só será válido se todas as validações forem verdadeiras, com este reduce implementado
        const validForm = validations.reduce((t, a) => t && a)
        
        return (
            <div>
                {this.state.redirect &&
                    <Redirect to={'/admin'} />
                }
                <section className="page-add">
                    <Header voltarStorage/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="page-breadcrumb">
                                    <h2 style={{marginBottom: '3%', marginTop: '3%'}}>{this.state.id == 0 ? 'Inserir novo storage' : 'Alterar storage'}</h2>
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
                                    this.salvarPorto()
                                }}
                                >
                                    <Form className="contact-form">

                                    <div className="row">
                                        <div className="col-lg-12 text-left">
                                            <Field name="name" id="name" placeholder="Seaport Name" type="text" value={this.state.name} onChange={async e => { await this.setState({name: e.currentTarget.value})}}/>
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

const mapStateToProps = ({user, servidor}) => {
    return{
        token: user.token,
        online: servidor.online
    }
}

export default connect(mapStateToProps, null)(AddStorage)
