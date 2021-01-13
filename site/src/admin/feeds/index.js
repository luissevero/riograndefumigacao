import React, {Component} from 'react'
import './styles.css'
import {api, apiLocal} from '../../services/api'
import {apiEmployee} from '../../services/apirgfumiga'
import Header from '../../components/header'
import Skeleton from '../../components/skeleton'
import {Link, useHistory, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {PRECISA_LOGAR} from '../../config'

const estadoInicial = {
    name: '',
    feeds: [],
    ships: [],
    ship: null,
    loading: true,
    isLogado: true
}

class Feeds extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = () => {
        //this.getFeeds()
        this.getShips()
        this.setState({loading: false})
    }

    inserirPorto = async () => {
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
    }

    limpaControles = async () => {
        await this.setState({name: ''})
    }

    getShips = async () => {
        await apiEmployee.post(`getShips.php`, {
            token: this.props.token
        })
        .then(
            async response => { await this.setState({ships: response.data})},
            async response => {this.erroApi(response)}
        )
    }

    getFeedsPerShip = async (ship) => {
        await this.setState({loading: true})
        await apiEmployee.post(`getFeed.php`, {
            token: this.props.token,
            id_ship: ship
        })
        .then(
            async response => { await this.setState({feeds: response.data})},
            async response => {this.erroApi(response)}
        )
        await this.setState({loading: false}) 
    }

    erroApi = async res => {
        await this.setState({isLogado: false})
        alert(PRECISA_LOGAR)
        
    }

    render(){
        
        return (
            <div>
                {!this.state.isLogado &&
                    <Redirect to={'/admin'} />
                }

                {this.state.loading &&
                    <Skeleton />
                }

                {!this.state.loading &&
                <div>    
                <section className="page-add">
                    <Header voltar/>
                    <div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="page-breadcrumb">
                                    <h2 style={{marginBottom: '3%', marginTop: '3%', textAlign: 'center'}}>Feeds</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>

                <div className="contact-section">
                    
                        <div className="row">
                            <div className="col-lg-12 text-right">
                                <Link to={{pathname: `/admin/addfeed/0`}}><button style={{backgroundColor: '#eee', opacity: 0.9} } > Adicionar</button></Link>
                            </div>                            
                        </div>
                   
                </div>

                <div className="col-12 text-center">
                    <div className="row">
                        <div className="col-3 text-right">
                            <label for="ship" className="form-check-label">Selecione o navio</label>
                        </div>
                        <div className="col-6 text-center">
                            <select className="form-control" as="select" name="ship" id="ship" value={this.state.ship} onChange={async e => { await this.setState({ship: e.currentTarget.value}); await this.getFeedsPerShip(this.state.ship)}}>
                                {this.state.ships.map(seaport => (
                                    <option key={seaport.id} value={seaport.id}>{seaport.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-3 text-center"></div>
                    </div>
                </div>

                <div className="row" id="product-list">
                    <div className="col-lg-12 col-sm-12 mix all dresses bags">
                        <div className="single-product-item">
                            <div className="row">
                                <div className="col-xl-3 -lg-3 col-md-3 col-sm-3 col-3 text-right">
                                    <h5>Código</h5>   
                                </div>
                                <div className="col-xl-3 -lg-3 col-md-3 col-sm-3 col-3 text-right">
                                    <h5>Data</h5>
                                </div>
                                <div className="col-xl-4 -lg-4 col-md-4 col-sm-4 col-4 text-right">
                                    <h5>Text</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               {this.state.feeds.length > 0 &&
                   <div className="row" id="product-list">
                        {this.state.feeds.map(feed => (
                            <div key={feed.id} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mix all itemLista">
                                <div className="single-product-item">
                                    <div className="row">
                                        <div className="col-xl-3 -lg-3 col-md-3 col-sm-3 col-3 text-right">
                                            <Link to={{pathname: `/admin/addfeed/${feed.id}`, state: feed.id}}>
                                                <p>{feed.id}</p>
                                            </Link>
                                        </div>
                                        <div className="col-xl-3 -lg-3 col-md-3 col-sm-3 col-3 text-right">
                                            <h6>{feed.day}/{feed.month}/{feed.year} {feed.time}</h6>
                                        </div>
                                        <div className="col-xl-4 -lg-4 col-md-4 col-sm-4 col-4 text-right">
                                            <h6>{feed.text}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
               
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

export default connect(mapStateToProps, null)(Feeds)
