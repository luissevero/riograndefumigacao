import React, {Component} from 'react'
import './styles.css'
import {api ,apiLocal} from '../../services/api'
import {apiEmployee} from '../../services/apirgfumiga'
import Header from '../../components/header'
import Skeleton from '../../components/skeleton'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {CLIENTES, PRECISA_LOGAR} from '../../config'

const estadoInicial = {
    name: '',
    clients: [],
    loading: true,
    redirect: false
}

const urlFoto = 'http://rgfumigacao.com.br/api/pictures/'

class Clients extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = () => {
        //this.getSeaports()
        this.getClients()
    }

    getSeaports = async () => {
        if(this.props.online){
            await api.get(`clients`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
            })
            .then(
                response => this.setState({clients: response.data}),
                response => this.erroApi(response)
            )
        }else{
            await apiLocal.get(`clients`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
            })
            .then(
                response => this.setState({clients: response.data}),
                response => this.erroApi(response)
            )
        }
        await this.setState({loading: false}) 
    }

    getClients = async () => {
        await apiEmployee.post(`getClients.php`, {
            token: this.props.token
        }).then(
            async response => {
                if(response.data == 'false'){
                    this.erroApi(response)
                }
                await this.setState({clients: response.data})
                await this.setState({loading: false})
            },
            response => {this.erroApi(response)}
        
            )
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
                {this.state.loading &&
                    <Skeleton />
                }

                {!this.state.loading &&
                <div>
                <section className="page-add">
                    <Header voltar/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="page-breadcrumb">
                                    <h2 style={{marginBottom: '3%', marginTop: '3%', textAlign: 'center'}}>{CLIENTES}</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>

                <div className="contact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-right">
                                <Link to={{pathname: `/admin/addclient/0`}}><button style={{backgroundColor: '#eee', opacity: 0.9} } > Adicionar</button></Link>
                            </div>                            
                        </div>
                    </div>
                </div>

                <div className="row" id="product-list">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mix all dresses bags">
                        <div className="single-product-item">
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 text-right">
                                    <h5>Código</h5>   
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 text-right">
                                    <h5>Name</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" id="product-list">
                        {this.state.clients.map(feed => (
                            <div key={feed.id} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 all dresses bags">
                                <div className="single-product-item">
                                    <div className="row">
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 text-right">
                                            <img 
                                                src={`${urlFoto}${feed.username}.png`}
                                                className="img img-fluid thumbnail"
                                            />
                                        </div>
                                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 text-right">
                                            <Link to={{pathname: `/admin/addclient/${feed.id}`, state: feed.id}}>
                                                <p>{feed.id}</p>
                                            </Link>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 text-right">
                                            <h6>{feed.name}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
               </div>
            }
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

export default connect(mapStateToProps, null)(Clients)
