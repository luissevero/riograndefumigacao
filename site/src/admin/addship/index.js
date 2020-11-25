import React, {Component} from 'react'
import './styles.css'
import {Formik, Field, Form, isInteger} from 'formik'
import Logo from '../../img/logos/rgf.png'
import {api} from '../../services/api'
import Header from '../../components/header'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {PRECISA_LOGAR} from '../../config'
import moment from 'moment'
import Util from '../../classes/util'

const estadoInicial = {
    seaports: [],
    ship_name: '',
    seaport_origin: undefined,
    id_seaport: undefined,
    seaport_destiny: undefined,
    terminal: '',
    agent: '',
    eta: '',
    etb: '',
    ets: '',
    type: '',
    dosage: null,
    full_shipment: null,
    shipment: null,
    cargo: '',
    doomed: false,
    doomedBanco: null,
    recirculation: false,
    status: '',
    id: null,
    redirect: false
}

class AddShip extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = async () => {
        window.scrollTo(0, 0)
        var id = this.props.match.params.id
        await this.setState({id})
        await this.loadData(id)
        this.carregaPortos()
    }

    carregaPortos = async () => {
        await api.get(`seaports`, {
            headers: {
                "Authorization": `bearer ${this.props.token}`
            }
        }).then(
            response => {this.setState({seaports: response.data})},
            response => this.erroApi(response)
            ) 
    }

    loadData = async (produto) => {
        try{
            await api.get(`ships/${produto}`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
            }).then(async res => {
                await this.setState({ship_name: res.data.name, id_seaport: res.data.id_seaport, terminal: res.data.terminal, eta: Util.formataData(res.data.ETA), etb: Util.formataData(res.data.ETB), ets: Util.formataData(res.data.ETS), type: res.data.type, dosage: res.data.dosage, full_shipment: res.data.full_shipment, shipment: res.data.shipment, cargo: res.data.cargo, doomed: res.data.doomed, recirculation: res.data.recirculation, status: res.data.status})
            })

        }catch(e){
            alert(e)
        }
    }

    inserirNavio = async () => {
        await api.post(`ships`, {
            ship_name: this.state.ship_name,
            seaport_origin: this.state.seaport_origin,
            id_seaport: this.state.id_seaport,
            seaport_destiny: this.state.seaport_destiny,
            terminal: this.state.terminal,
            agent: this.state.agent,
            eta: this.state.eta,
            etb: this.state.etb,
            ets: this.state.ets,
            type: this.state.type,
            dosage: this.state.dosage,
            full_shipment: this.state.full_shipment,
            shipment: this.state.shipment,
            cargo: this.state.cargo,
            doomed: this.state.doomed,
            recirculation: this.state.recirculation,
            status: this.state.status
        }).then(response => {
            if(response.status === 204){
                alert("Cadastro realizado corretamente!")
            }else{
                alert("Erro no cadastro! Tente novamente!")
            }
        })
    }

    erroApi = async (res) => {
        alert(PRECISA_LOGAR)
        await this.setState({redirect: true})
    }

    render(){
        const validations = []
        validations.push(this.state.ship_name && this.state.ship_name.trim().length >= 3)
        validations.push(this.state.seaport_destiny && this.state.seaport_destiny.trim().length >= 4)
        validations.push(this.state.seaport_origin && this.state.seaport_origin.trim())
        validations.push(this.state.eta && this.state.eta.trim().length >= 8)
        validations.push(this.state.etb && this.state.etb.trim().length >= 8)
        validations.push(this.state.ets && this.state.ets.trim().length >= 8)
        validations.push(Math.ceil(this.state.full_shipment) >=  Math.ceil(this.state.shipment))
        //o formulário só será válido se todas as validações forem verdadeiras, com este reduce implementado
        const validForm = validations.reduce((t, a) => t && a)
        
        return (
            <div>
                
                <section className="page-add">
                    <Header voltarShips/>
                    {this.state.redirect &&
                        <Redirect to={'/admin'} />
                    }
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="page-breadcrumb">
                                    <h2 style={{marginBottom: '3%', marginTop: '3%', textAlign: 'center'}}>{this.state.id == 0 ? 'Inserir navio' : 'Alterar navio'}</h2>
                                </div>
                            </div>
                            {this.state.id > 0 &&
                            <div className="col-lg-12 text-right">
                                <Link to={{pathname: `/admin/fumigationreport/${this.state.id}`}} target="blank" >
                                    <button className="btn btn-secondary">Gerar Relatório de Fumigação</button>
                                </Link>
                            </div>
                            }
                        </div>

                    </div>

                </section>

                <div className="contact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Formik 
                                initialValues={{
                                    ship_name: '',
                                    seaport_origin: '',
                                    id_seaport: undefined,
                                    seaport_destiny: '',
                                    terminal: '',
                                    agent: '',
                                    eta: '',
                                    etb: '',
                                    ets: '',
                                    type: '',
                                    dosage: null,
                                    full_shipment: null,
                                    shipment: null,
                                    cargo: '',
                                    doomed: false,
                                    status: '',
                                    recirculation: false
                                }}
                                onSubmit={async values => {
                                    await new Promise(r => setTimeout(r, 2000))
                                    this.inserirNavio()
                                }}
                                >
                                    <Form className="contact-form">
                                    <div className="row">
                                        <div className="col-lg-12 text-right">
                                            <Field value={this.state.ship_name} onChange={e => { this.setState({ship_name: e.currentTarget.value})}} id="ship_name" name="ship_name" type="text" placeholder="Ship name" />
                                        </div>
                                        <div className="col-lg-12 text-right">
                                            <Field value={this.state.terminal} onChange={e => { this.setState({terminal: e.currentTarget.value})}} id="terminal" name="terminal" type="text" placeholder="Terminal" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-1 text-left">
                                            <label htmlFor="seaport_origin">Seaport Origin</label>
                                        </div>
                                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 text-left">
                                            <Field 
                                                as="select" 
                                                name="seaport_origin" 
                                                id="seaport_origin" 
                                                value={this.state.id_seaport} 
                                                onChange={async e => { 
                                                    var doc =  document.getElementById('seaport_origin') 
                                                    var value = doc.options[doc.selectedIndex].value
                                                    var text = doc.options[doc.selectedIndex].text
                                                    await this.setState({seaport_origin: text, id_seaport: value})
                                                    await alert('Value: ' + this.state.id_seaport + ' e label: ' + this.state.seaport_origin)
                                                }}
                                            >
                                                {this.state.seaports.map(seaport => (
                                                    <option value={seaport.id} key={seaport.id}>{seaport.name}</option>
                                                ))}
                                            </Field>
                                        </div>
                                        <div className="col-lg-1 text-left">
                                            <label htmlFor="seaport_destiny">Seaport Destiny</label>
                                        </div>
                                        <div className="col-lg-5 text-left">
                                            <Field as="select" name="seaport_destiny" id="seaport_destiny" value={this.state.seaport_destiny} onChange={e => { this.setState({seaport_destiny: e.currentTarget.value})}}>
                                                {this.state.seaports.map(seaport => (
                                                    <option key={seaport.id}>{seaport.name}</option>
                                                ))}
                                            </Field>
                                        </div>
                                        <div className="col-lg-12 text-right">
                                            <Field value={this.state.agent} onChange={e => { this.setState({agent: e.currentTarget.value})}} id="agent" name="agent" type="text" placeholder="Agent" />
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-lg-1 text-left">
                                            <label htmlFor="eta">ETA: </label>
                                        </div>
                                        
                                        <div className="col-lg-3">
                                            
                                            <Field value={this.state.eta} onChange={e => { this.setState({eta: e.currentTarget.value})}} id="eta" name="eta" type="date" placeholder="ETA" />
                                        </div>
                                        <div className="col-lg-1 text-left">
                                            <label htmlFor="etb">ETB: </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <Field value={this.state.etb} onChange={e => { this.setState({etb: e.currentTarget.value})}} id="etb" name="etb" type="date" placeholder="ETB" />
                                        </div>
                                        <div className="col-lg-1 text-left">
                                            <label htmlFor="ets">ETS: </label>
                                        </div>
                                        <div className="col-lg-3 text-left">
                                            <Field value={this.state.ets} onChange={e => { this.setState({ets: e.currentTarget.value})}} id="ets" name="ets" type="date" placeholder="ETS" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 text-right">
                                            <Field value={this.state.type} name="type" id="type" type="text" placeholder="Type" onChange={e => { this.setState({type: e.currentTarget.value})}}/>
                                        </div>                                                                                                         
                                            
                                        <div className="col-lg-6 text-right">
                                            <Field value={this.state.dosage} onChange={e => {this.setState({dosage: e.currentTarget.value})}} name="dosage" id="dosage" type="number" placeholder="Dosage" />
                                        </div>
                                        <div className="col-lg-6 text-right">
                                            <Field value={this.state.full_shipment} onChange={e => { this.setState({full_shipment: e.currentTarget.value})}} name="full_shipment" id="full_shipment" type="number" placeholder="Full Shipment" />
                                        </div>
                                        <div className="col-lg-6 text-right">
                                            <Field value={this.state.shipment} onChange={e => { this.setState({shipment: e.currentTarget.value})}} name="shipment" id="shipment" type="number" placeholder="Shipment" />
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-lg-6 text-right">
                                            <Field value={this.state.cargo} onChange={e => { this.setState({cargo: e.currentTarget.value})}} name="cargo" id="cargo" type="text" placeholder="Cargo" />
                                        </div>

                                        <div className="col-lg-1 text-left">
                                            <label htmlFor="doomed" className="form-check-label">Doomed</label>
                                        </div>
                                        <div className="col-lg-5">
                                            <Field  onClick={async (e) => { await this.setState({doomed: !this.state.doomed}) } } checked={this.state.doomed} name="doomed" id="doomed" type="checkbox" />
                                        </div>
                                        <div className="col-lg-6 text-right">
                                            <Field value={this.state.status} onChange={e => { this.setState({status: e.currentTarget.value})}} name="status" id="status" type="text" placeholder="Status" />
                                        </div>
                                        <div className="col-lg-1 text-left">
                                            <label htmlFor="recirculation" className="form-check-label">Recirculation</label>
                                        </div>
                                        <div className="col-lg-5">
                                            <Field  onClick={async (e) => { await this.setState({recirculation: !this.state.recirculation}) } } checked={this.state.recirculation} name="recirculation" id="recirculation" type="checkbox" />
                                        </div>
                                        <div className="col-lg-12 text-right">
                                            <button disabled={!validForm} type="submit" style={validForm ? {} : {backgroundColor: '#eee', opacity: 0.3} } >Salvar</button>
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
        
    /*

    className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')}
    
       return (
        <section className="latest-products spad">
            <div className="container">
                <div className="product-filter">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title">
                                <h2>Administrador</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contender">
                    <p>Login</p>
                    <p>Senha</p>
                </div>                
            </div>
    </section> 
    )
    */
    }
}

const mapStateToProps = ({user}) => {
    return{
        token: user.token
    }
}

export default connect(mapStateToProps, null)(AddShip)
