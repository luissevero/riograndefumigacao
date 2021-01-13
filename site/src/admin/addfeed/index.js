import React, {Component} from 'react'
import './styles.css'
import {Formik, Field, Form, isInteger} from 'formik'
import {api, apiLocal} from '../../services/api'
import Header from '../../components/header'
import axios from 'axios'
import {server, showError} from '../../common'
import InputMask from 'react-input-mask'
import {Redirect} from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import {PRECISA_LOGAR} from '../../config'
import {connect} from 'react-redux'

const estadoInicial = {
    employees: [],
    ships: [],
    employee: 1,
    ship: 4,
    day: null,
    month: null,
    year: null,
    time: '',
    text: '',
    id: null,
    files: [],
    qtdFiles: 1,
    fotos: [],
    thumbs: [],
    redirect: false
}

class AddFeed extends Component {

    state = {
        ...estadoInicial,
    }

    async componentDidMount() {
        window.scrollTo(0, 0)
        var id = this.props.match.params.id
        await this.setState({id})
        await this.loadData(id)       
        await this.carregaEmployees()
        this.carregaShips()
    }

    loadData = async (produto) => {
        try{
            await api.get(`feed/${produto}`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
            }).then(
                response => {this.setState({employee: response.data.id_employee, ship: response.data.id_ship, text: response.data.text, day: response.data.day, month: response.data.month, year: response.data.year, time: response.data.time})},
                res => this.erroApi(res) 
            )
        }catch(e){
            showError(e)
        }
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

    carregaShips = async () => {
        await api.get(`ships`, {
            headers: {
                "Authorization": `bearer ${this.props.token}`
            }
        }).then(
            response => {this.setState({ships: response.data})},
            response => this.erroApi(response)
        ) 
    }

    erroApi = async (res) => {
        alert(PRECISA_LOGAR)
        await this.setState({redirect: true})
    }

    addFoto = async (event) => {
        console.log(event.target.files[0])
        await this.setState({thumbs: [...this.state.thumbs, URL.createObjectURL(event.target.files[0])], fotos: [...this.state.fotos, event.target.files[0]]})
    }

    removeFoto = async (indice) => {
        var atualizado = [...this.state.fotos]
        await atualizado.splice(indice, 1)
        await this.setState({fotos: []})
        await this.setState({fotos: atualizado})
        var atualizadoThumb = [...this.state.thumbs]
        await atualizadoThumb.splice(indice, 1)
        await this.setState({thumbs: []})
        await this.setState({thumbs: atualizadoThumb})
    }

    inserirFeed = async () => {
        await api.post(`feed`, {
            employee: this.state.employee,
            ship: this.state.ship,
            year: this.state.year,
            month: this.state.month,
            day: this.state.day,
            time: this.state.time,
            text: this.state.text
        }).then(response => {
            if(response.status === 204){
                alert("Feed inserido corretamente!")
                this.limpaControles()
            }else{
                alert("Erro na inserção! Tente novamente!")
            }
        })
    }

    limpaControles = async () => {
        await this.setState({employee: null, ship: null, day: null, month: null, year: null, text: '', time: ''})
    }

    render(){
        const validations = []
        validations.push(this.state.ship)
        validations.push(this.state.employee)
        validations.push(this.state.day && Math.ceil(this.state.day) <= 31)
        validations.push(this.state.month && Math.ceil(this.state.month) <= 12)
        validations.push(this.state.year && Math.ceil(this.state.year) <= 9999)
        validations.push(this.state.text && this.state.text.trim().length >= 10)
        validations.push(this.state.time && this.state.time.trim().length >= 5)


        //o formulário só será válido se todas as validações forem verdadeiras, com este reduce implementado
        const validForm = validations.reduce((t, a) => t && a)
        
        return (
            <div>
                {this.state.redirect &&
                    <Redirect to={'/admin'} />
                }
                
                <section className="page-add">
                    <Header voltarFeed/>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12-col-sm-12 col-12">
                                <div className="page-breadcrumb">
                                    <h2 style={{marginBottom: '3%', marginTop: '3%', textAlign: 'center'}}>{this.state.id == 0 ? 'Inserir novo feed' : 'Alterar feed'}</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>

                <div className="contact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12-col-sm-12 ">
                                <Formik 
                                initialValues={{
                                    ship: null,
                                    employee: null,
                                    day: null,
                                    month: null,
                                    year: null,
                                    time: null,
                                    text: ''
                                }}
                                onSubmit={async values => {
                                    await new Promise(r => setTimeout(r, 2000))
                                    this.inserirFeed()
                                }}
                                >
                                    <Form className="contact-form">

                                    <div className="row">
                                        <div className="col-3 col-xl col-lg-1 col-md-1 col-sm-3 text-left">
                                            <label htmlFor="seaport_origin">Employee</label>
                                        </div>
                                        <div className="col-9 col-xl-5 col-lg-5 col-md-5 col-sm-9 text-left">
                                            <Field as="select" name="employee" id="employee" value={this.state.employee} onChange={async e => { await this.setState({employee: e.currentTarget.value, ship: null}); await this.carregaShips();}}>
                                                {this.state.employees.map(seaport => (
                                                    <option key={seaport.id} value={seaport.id}>{seaport.name}</option>
                                                ))}
                                            </Field>
                                        </div>
                                        <div className="col-3 col-xl-1 col-lg-1 col-md-1 col-sm-3 text-left">
                                            <label htmlFor="seaport_destiny">Ship</label>
                                        </div>
                                        <div className="col-9 col-xl-5 col-lg-5 col-md-5 col-sm-9 text-left">
                                            <Field as="select" name="ship" id="ship" value={this.state.ship} onChange={async e => { await this.setState({ship: e.currentTarget.value})}}>
                                                {this.state.ships.map(ship => (
                                                    <option key={ship.id} value={ship.id}>{ship.name}</option>
                                                ))}
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-3 col-xl-1 col-lg-1 col-md-2 col-sm-3 text-left">
                                            <label htmlFor="day">Day: </label>
                                        </div>
                                        <div className="col-9 col-xl-2 col-lg-2 col-md-4 col-sm-9">
                                            <Field min={1} max={31} value={this.state.day} onChange={e => { this.setState({day: e.currentTarget.value})}} id="day" name="day" type="number"/>
                                        </div>
                                        <div className="col-3 col-xl-1 col-lg-1 col-md-2 col-sm-3 text-left">
                                            <label htmlFor="month">Month: </label>
                                        </div>
                                        <div className="col-9 col-xl-2 col-lg-2 col-md-4 col-sm-9">
                                            <Field value={this.state.month} onChange={e => { this.setState({month: e.currentTarget.value})}} id="month" name="month" type="number"  min={1} max={12}  />
                                        </div>
                                        <div className="col-3 col-xl-1 col-lg-1 col-md-2 col-sm-3 text-left">
                                            <label htmlFor="year">Year: </label>
                                        </div>
                                        <div className="col-9 col-xl-2 col-lg-2 col-md-4 col-sm-9">
                                            <Field value={this.state.year} onChange={e => { this.setState({year: e.currentTarget.value})}} id="year" name="year" type="number" />
                                        </div>
                                        <div className="col-3 col-xl-1 col-lg-1 col-md-2 col-sm-3 text-left">
                                            <label htmlFor="time">time: </label>
                                        </div>
                                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-9 col-9">
                                            <InputMask mask="99:99" value={this.state.time} onChange={e => { this.setState({time: e.currentTarget.value})}} id="time" name="time" type="text" />
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12-col-sm-12 text-right">
                                            <textarea value={this.state.text} name="text" id="text" placeholder="status" onChange={e => { this.setState({text: e.currentTarget.value})}}/>
                                        </div>                                                                                                                  
                                    </div>

                                    <div className="col-lg-12 col-md-12-col-sm-12 text-left">
                                        <label>Fotos: </label>
                                        <input type="file" name="file" className="form-control-lg" accept="image/png" onChange={this.addFoto}/>
                                    </div>   

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12-col-sm-12 text-right">
                                            <button disabled={!validForm} type="submit" style={validForm ? {backgroundColor: '#eee', opacity: 0.9} : {backgroundColor: '#eee', opacity: 0.3} } >{this.state.id == 0 ? 'Adicionar' : 'Alterar'}</button>
                                        </div>
                                    </div>                              

                                    </Form>
                                </Formik>
                            </div>
                            {this.state.fotos.map((foto, index) => (
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                        <p>Nome: {foto.name}</p>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                    <Image src={this.state.thumbs[index]} thumbnail fluid style={{maxHeight: 200, maxWidth: 200}}/> 
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                        <button className="btn btn-danger" onClick={() => this.removeFoto(index)}>Remover foto</button>
                                    </div>
                                </div>
                            ))}
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

export default connect(mapStateToProps, null)(AddFeed)
