import React, {Component} from 'react'
import './styles.css'
import {api, apiLocal} from '../../services/api'
import {apiEmployee} from '../../services/apirgfumiga'
import Header from '../../components/header'
import Skeleton from '../../components/skeleton'
import SkeletonPesquisa from '../../components/skeletonpesquisa'

import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

const estadoInicial = {
    name: '',
    storages: [],
    loading: true,
    loadingPesquisa: false,
    redirect: false,
    pesquisa: '',
}

class Storage extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = () => {
        this.getStorages()
        this.setState({loading: false})
    }

    getStorages = async () => {
        await apiEmployee.post(`getStorage.php`, {
            token: this.props.token
        })
        .then(
            async response => { await this.setState({storages: response.data})},
            async response => {this.erroApi(response)}
        )
    }

    erroApi = async (res) => {
        await this.setState({isLogado: false})
        alert('Você precisa estar logado para poder acessar esta página!')
        this.setState({redirect: true})
    }

    filtroName = (navios) => navios.name.toLowerCase().includes(this.state.pesquisa.toLowerCase())
    
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
                    <div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="page-breadcrumb">
                                    <h2 style={{marginBottom: '3%', marginTop: '3%', textAlign: 'center'}}>Storage</h2>
                                </div>
                            </div>

                            <div className="col-lg-12 text-right">
                                <Link to={{pathname: `/admin/addstorage/0`}}><button className="btn btn-primary" > Adicionar</button></Link>
                            </div>                            
                        </div>
                </div>
                </section>

                <div className="contact-section">
                   
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">
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
                {this.state.loadingPesquisa &&
                    <SkeletonPesquisa />
                }

                <div className="row" id="product-list">
                    <div className="col-lg-12 col-md-12 col-sm-12 mix all dresses bags">
                        <div className="single-product-item">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                    <h5>Código</h5>   
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 text-left">
                                    <h5>Name</h5>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 text-left">
                                    <h5>Status</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" id="product-list">
                        {this.state.storages.filter(this.filtroName).map((feed, index) => (
                            <div key={feed.id} className={index % 2 == 0 ? "col-lg-12 col-md-12 col-sm-12 mix all dresses bags par" : "col-lg-12 col-md-12 col-sm-12 mix all dresses bags itemLista impar"}>
                                
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                            <Link to={{
                                                pathname: `/admin/addstorage/${feed.id}`, 
                                                state: {
                                                    storage: {...feed}
                                                }
                                            }}>
                                                <p>{feed.id} - {feed.category} - {feed.amount} {feed.unit}</p>
                                            </Link>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 text-left">
                                            <Link to={{pathname: `/admin/addship/${feed.id}`, state: feed.id}}>
                                                <h6>{feed.name}</h6>
                                            </Link>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 text-left">
                                            <Link to={{pathname: `/admin/addship/${feed.id}`, state: feed.id}}>
                                                <h6>{feed.status}</h6>
                                            </Link>
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

const mapStateToProps = ({ user, servidor }) => {
    return {
        token: user.token,
        online: servidor.online
    }
} 

export default connect(mapStateToProps, null)(Storage)
