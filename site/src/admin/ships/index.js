import React, {Component} from 'react'
import './styles.css'
import {api} from '../../services/api'
import {apiEmployee} from '../../services/apirgfumiga'
import Header from '../../components/header'
import Skeleton from '../../components/skeleton'
import SkeletonPesquisa from '../../components/skeletonpesquisa'

import {Link, useHistory, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

const estadoInicial = {
    name: '',
    ships: [],
    seaports: [],
    seaport: null,
    loading: true,
    loadingPesquisa: false,
    redirect: false,
    pesquisa: ''
}

class Ships extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = () => {
        this.getShips()
        this.getSeaports()
        //this.getPesquisaShips()
        //alert(this.props.token)
        this.setState({loading: false})
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if(this.state.pesquisa !== prevState.pesquisa){
            await this.setState({loadingPesquisa: true}) 
            this.state.pesquisa != '' ? await this.getPesquisaShips(this.state.pesquisa) : await this.getShips()
            await this.setState({loadingPesquisa: false}) 
        }
    }

    
    getShips = async () => {
        await api.get(`ships`, {
            headers: {
                "Content-Type": `application/x-www-form-urlencoded`,
                "Authorization": `bearer ${this.props.token}`
            }
        }).then(
            response => { this.setState({ships: response.data})},
            response => {this.erroApi(response)}
        
            )
    }

    getShipsPerSeaport = async (porto) => {
        if(porto != 0){
            await api.get(`shipsperseaport/${porto}`, {
                headers: {
                    "Content-Type": `application/x-www-form-urlencoded`,
                    "Authorization": `bearer ${this.props.token}`
                }
            }).then(
                response => { this.setState({ships: response.data})},
                response => {this.erroApi(response)}
            
                )
        }
            
    }

    getSeaports = async () => {
        await api.get(`seaports`, {
            headers: {
                "Content-Type": `application/x-www-form-urlencoded`,
                "Authorization": `bearer ${this.props.token}`
            }
        }).then(
            response => { this.setState({seaports: response.data})},
            response => {this.erroApi(response)}
        
            )
    }

    getPesquisaShips = async () => {
        const pesquisa = this.state.pesquisa
        await api.post(`pesquisaships/${pesquisa}`, {seaport: this.state.seaport}, {
            headers: {
                "Content-Type": `application/x-www-form-urlencoded`,
                "Authorization": `bearer ${this.props.token}`
            },
            
        }).then(
            response => { this.setState({ships: response.data})},
            response => {this.erroApi(response)}
        
            )
    }
    
   /*
   getShips = async () => {
    await apiEmployee.post(`getShips.php`, {
        token: this.props.token
    }).then(
        async response => { await this.setState({ships: response.data})},
        response => {this.erroApi(response)}
    
        )
    }
    */
    erroApi = async (res) => {
        await this.setState({isLogado: false})
        alert('Você precisa estar logado para poder acessar esta página!')
        this.setState({redirect: true})
    }

    render(){
        
        return (
            <div>
                {this.state.loading &&
                    <Skeleton />
                }
                {this.state.redirect &&
                    <Redirect to={'/admin'} />
                }
                {!this.state.loading &&
                <div>
                <section className="page-add">
                    <Header voltar/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="page-breadcrumb">
                                    <h2 style={{marginBottom: '3%', marginTop: '3%', textAlign: 'center'}}>Ships</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>

                <div className="contact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-right">
                                <Link to={{pathname: `/admin/addship/0`}}><button style={{backgroundColor: '#eee', opacity: 0.9} } > Adicionar</button></Link>
                            </div>                            
                        </div>
                    </div>
                </div>

                <div className="contact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">
                            <select className="form-control" as="select" name="seaport" id="seasport" value={this.state.seaport} onChange={async e => { await this.setState({seaport: e.currentTarget.value}); await this.getShipsPerSeaport(this.state.seaport)}}>
                                <option value={0}>Escolha um porto...</option>
                                {this.state.seaports.map(seaport => (
                                    <option key={seaport.id} value={seaport.id}>{seaport.name}</option>
                                ))}
                            </select>
                            </div>
                            <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 text-center">
                                <div className="row">
                                    
                                    <div className="col-11 text-right">
                                        <input className="form-control" placeholder="Pesquise aqui..." value={this.state.pesquisa} onChange = {e => { this.setState({pesquisa: e.currentTarget.value})}}/>
                                    </div>
                                    <div className="col-1 text-left">
                                        <FontAwesomeIcon className="lupa" icon={faSearch} />
                                    </div>
                                    
                                </div>
                            </div>    
                             <div className="col-2 text-center">
                               
                            </div>                                
                        </div>
                        
                    </div>
                </div>
                {this.state.loadingPesquisa &&
                    <SkeletonPesquisa />
                }

                <div className="row" id="product-list">
                    <div className="col-lg-12 col-md-12 col-sm-12 mix all dresses bags">
                        <div className="single-product-item">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 text-right">
                                    <h5>Código</h5>   
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 text-right">
                                    <h5>Name</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" id="product-list">
                        {this.state.ships.map(feed => (
                            <div key={feed.id} className="col-lg-12 col-md-12 col-sm-12 mix all dresses bags itemLista">
                                <div className="single-product-item">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-4 text-right">
                                            <Link to={{pathname: `/admin/addship/${feed.id}`, state: feed.id}}>
                                                <p>{feed.id}</p>
                                            </Link>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 text-right">
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

const mapStateToProps = ({ user }) => {
    return {
        token: user.token
    }
} 

export default connect(mapStateToProps, null)(Ships)
