import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import {Formik, Field, Form, isInteger} from 'formik'
import Logo from '../../img/logos/rgf.png'
import {api ,apiLocal} from '../../services/api'
import ReportField from '../../components/reportField'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {PRECISA_LOGAR} from '../../config' 
import {Document, Page} from 'react-pdf'

const estadoInicial = {
    seaports: [],
    feeds: [],
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

class FumigationReport extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = async () => {
        window.scrollTo(0, 0)
        var id = this.props.match.params.id
        //alert(this.props.token)
        await this.setState({id})
        //alert(JSON.stringify(this.props.location.state.ship))
        await this.loadData(this.props.location.state.ship)
        //await this.carregaFeeds(id)
    }

    carregaFeeds = async (id) => {
        if(this.props.online){
            await api.get(`feedpership/${id}`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
                
            }).then(
                response => {this.setState({feeds: response.data})},
                response => this.erroApi(response)
            )
        }else{
            await apiLocal.get(`feedpership/${id}`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
                
            }).then(
                response => {this.setState({feeds: response.data})},
                response => this.erroApi(response)
            )
        } 
    }

    loadData = async (produto) => {
            await this.setState({ship_name: produto.name, id_seaport: produto.id_seaport, seaport_origin: produto.seaport_orig, seaport_destiny: produto.seaport_dest, terminal: produto.terminal, eta: produto.eta, etb: produto.etb, ets: produto.ets, type: produto.type, dosage: produto.dosage, full_shipment: produto.full_shipment, shipment: produto.shipment, cargo: produto.cargo, doomed: produto.doomed, recirculation: produto.recirculation, status: produto.status})
    }

    erroApi = async () => {
        alert(PRECISA_LOGAR)
        await this.setState({redirect: true})
    }

    
    render(){
        return (
            <div>
                {this.state.redirect &&
                    <Redirect to={'/admin'} />
                }

                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                        <Document>
                            <Page>
                                GENERAL INFORMATIONS
                            </Page>
                        </Document>
                    </div>    
                </div>

                
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                        <img className="img img-fluid" src={Logo} style={{alignItems: 'center', justifyContent: 'center'}}/>
                    </div>
                </div>

                <div className="contact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 bordaDireita">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center inicioColuna">
                                    <h5>GENERAL INFORMATIONS</h5>
                                </div>
                                <ReportField titulo="Vessel" subtitulo={this.state.ship_name}/>
                                <ReportField titulo="Grain" subtitulo={this.state.cargo}/>
                                <ReportField titulo="Loading Port" subtitulo={this.state.seaport_origin}/>
                                <ReportField titulo="Discharge Port" subtitulo={this.state.seaport_destiny}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 bordaDireita">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center inicioColuna">
                                    <h5>FUMIGATION PROCESS</h5>
                                </div>
                                <ReportField titulo="Fumigation Team On Board"/>
                                <ReportField titulo="Fumigation Date"/>
                                <ReportField titulo="Start Fumigation"/>
                                <ReportField titulo="Finish Fumigation"/>
                                <ReportField titulo="Method" subtitulo={this.state.type}/>
                                <ReportField titulo="Dosage" subtitulo={this.state.dosage + " GR"}/>
                                <ReportField titulo="Temperature"/>
                                <ReportField titulo="Exposition Time"/>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center inicioColuna">
                                    <h5>CARGO INFORMATIONS</h5>
                                </div>
                                <ReportField titulo="Total Loaded" subtitulo={this.state.shipment ? ((this.state.shipment / 1000).toFixed(3)).toLocaleString('en-US')+ ' MT' : ''}/>
                                <ReportField titulo="Finish The Load"/>
                                <ReportField titulo="Holds"/>
                                <ReportField titulo="Condemned Cargo / MOA" subtitulo={this.state.doomed == 1 ? 'Yes' : 'No'}/>
       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    /*
    render(){
        
        const MeuDocumento = () => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>GENERAL INFORMATIONS</Text>
                        <Text>Vessel: {this.state.ship_name}</Text>
                        <Text>Grain: {this.state.cargo}</Text>
                        <Text>Loading Port: {this.state.seaport_origin}</Text>
                        <Text>Discharge Port: {this.state.seaport_destiny}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Condemned Cargo</Text>
                    </View>
                </Page>
            </Document>
        )
        
        return (
            <PDFViewer>
                <MeuDocumento />
            </PDFViewer>
        )   
    }
    */
}


const mapStateToProps = ({user, servidor}) => {
    return{
        token: user.token,
        online: servidor.online
    }
}

export default connect(mapStateToProps, null)(FumigationReport)
