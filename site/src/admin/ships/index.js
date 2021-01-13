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
    ships: [],
    seaports: [],
    loading: true,
    loadingPesquisa: false,
    redirect: false,
    pesquisa: '',
    seaport: 0,
    status: 'all'
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

    /*
    componentDidUpdate = async (prevProps, prevState) => {
        if(this.state.pesquisa !== prevState.pesquisa){
            await this.setState({loadingPesquisa: true}) 
            this.state.pesquisa != '' ? await this.getPesquisaShips() : await this.getShips()
            await this.setState({loadingPesquisa: false}) 
        }
    }
    */
    /*
    getShips = async () => {
        if(this.props.online){
            await api.get(`ships`, {
                headers: {
                    "Content-Type": `application/x-www-form-urlencoded`,
                    "Authorization": `bearer ${this.props.token}`
                }
            })
            .then(
                response => { this.setState({ships: response.data})},
                response => {this.erroApi(response)}
            )
        }else{
            await apiLocal.get(`ships`, {
                headers: {
                    "Content-Type": `application/x-www-form-urlencoded`,
                    "Authorization": `bearer ${this.props.token}`
                }
            })
            .then(
                response => { this.setState({ships: response.data})},
                response => {this.erroApi(response)}
            )

        }
    }
    */
    getShipsPerSeaport = async (porto) => {
        if(porto != 0){
            if(this.props.online){
                await api.get(`shipsperseaport/${porto}`, {
                    headers: {
                        "Content-Type": `application/x-www-form-urlencoded`,
                        "Authorization": `bearer ${this.props.token}`
                    }
                })
                .then(
                    response => { this.setState({ships: response.data})},
                    response => {this.erroApi(response)}
                )
            }else{
                await apiLocal.get(`shipsperseaport/${porto}`, {
                    headers: {
                        "Content-Type": `application/x-www-form-urlencoded`,
                        "Authorization": `bearer ${this.props.token}`
                    }
                })
                .then(
                    response => { this.setState({ships: response.data})},
                    response => {this.erroApi(response)}
                )
            }
        }
            
    }

    /*
    getSeaports = async () => {
        if(this.props.online){
            await api.get(`seaports`, {
                headers: {
                    "Content-Type": `application/x-www-form-urlencoded`,
                    "Authorization": `bearer ${this.props.token}`
                }
            })
            .then(
                response => { this.setState({seaports: response.data})},
                response => {this.erroApi(response)}
            )
        }else{
            await apiLocal.get(`seaports`, {
                headers: {
                    "Content-Type": `application/x-www-form-urlencoded`,
                    "Authorization": `bearer ${this.props.token}`
                }
            })
            .then(
                response => { this.setState({seaports: response.data})},
                response => {this.erroApi(response)}
            )
        }
    }
    */

   getShips = async () => {
        await apiEmployee.post(`getShips.php`, {
            token: this.props.token
        })
        .then(
            async response => { await this.setState({ships: response.data})},
            async response => {this.erroApi(response)}
        )
    }

    getSeaports = async () => {
        try{          
            await apiEmployee.post(`getSeaports.php`, {
                token: this.props.token
            }).then(
                async res => {
                    if(res.data == 'false'){
                       this.erroApi(res)
                    }else{
                        await this.setState({seaports: res.data})                        
                    }
                },
                async res => this.erroApi(res)
            )
        }catch(e){
            alert(e)
        }
    }

    /*
    getPesquisaShips = async () => {
        await this.setState({loadingPesquisa: true})
        const pesquisa = this.state.pesquisa ? this.state.pesquisa : ' '
        //console.log(`pesquisaships/${pesquisa}/${this.state.seaport}/${this.state.status}`)
        if(this.props.online){
            await api.get(`pesquisaships/${pesquisa}/${this.state.seaport}/${this.state.status}`, {
                headers: {
                    "Content-Type": `application/x-www-form-urlencoded`,
                    "Authorization": `bearer ${this.props.token}`
                },
                
            }).then(
                response => { this.setState({ships: response.data})},
                response => {this.erroApi(response)}
            
            )
        }else{
            await apiLocal.get(`pesquisaships/${pesquisa}/${this.state.seaport}/${this.state.status}`, {
                headers: {
                    "Content-Type": `application/x-www-form-urlencoded`,
                    "Authorization": `bearer ${this.props.token}`
                },
                
            }).then(
                response => { this.setState({ships: response.data})},
                response => {this.erroApi(response)}
            
            )
        }
        await this.setState({loadingPesquisa: false})
    }
    */

    erroApi = async (res) => {
        await this.setState({isLogado: false})
        alert('Você precisa estar logado para poder acessar esta página!')
        this.setState({redirect: true})
    }

    filtroSeaport = (navios) => this.state.seaport != 0 ? parseInt(navios.id_seaport) === parseInt(this.state.seaport) : 1
    filtroStatus = (navios) => this.state.status != 'all' ? navios.status == this.state.status : 1
    //filtroName = (navios) => !navios.name.trim().toLowerCase().indexOf(`${this.state.pesquisa.toLowerCase()}`)
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
                                    <h2 style={{marginBottom: '3%', marginTop: '3%', textAlign: 'center'}}>Ships</h2>
                                </div>
                            </div>

                            <div className="col-lg-12 text-right">
                                <Link to={{pathname: `/admin/addship/0`}}><button className="btn btn-primary" > Adicionar</button></Link>
                            </div>                            
                        </div>
                </div>
                </section>

                <div className="contact-section">
                   
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">
                            <select className="form-control" as="select" name="seaport" id="seasport" value={this.state.seaport} onChange={async e => { await this.setState({seaport: e.currentTarget.value})}}>
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
                             <select className="form-control" as="select" name="status" id="status" value={this.state.status} onChange={async e => { await this.setState({status: e.currentTarget.value})}}>
                                <option value={'all'}>All</option>
                                <option value={'Operating'}>Operating</option>
                                <option value={'Foreseen'}>Foreseen</option>
                                <option value={'Finalized'}>Finalized</option>
                              
                            </select>
                               
                            </div>                                
                        </div>
                        
                    
                </div>
                {this.state.loadingPesquisa &&
                    <SkeletonPesquisa />
                }

                <div className="row" id="product-list">
                    <div className="col-2"></div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 mix all dresses bags">
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
                    <div className="col-2"></div>
                </div>

                <div className="row" id="product-list">
                        <div className="col-2"></div>
                        <div className="col-8">
                        {this.state.ships.filter(this.filtroName).filter(this.filtroSeaport).filter(this.filtroStatus).map((feed, index) => (
                            <div key={feed.id} className={index % 2 == 0 ? "col-lg-12 col-md-12 col-sm-12 mix all dresses bags par" : "col-lg-12 col-md-12 col-sm-12 mix all dresses bags itemLista impar"}>
                                
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                            <Link to=
                                                {{
                                                    pathname: `/admin/addship/${feed.id}`, 
                                                    state: {ship: {...feed}}
                                                }}
                                            >
                                                <p>{feed.id} - {moment(`${feed.year}-${feed.month}-${feed.day}`).format('MMM')}/{feed.day} - {feed.time}</p>
                                            </Link>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 text-left">
                                            <Link to=
                                                {{
                                                    pathname: `/admin/addship/${feed.id}`, 
                                                    state: {ship: {...feed}}
                                                }}
                                            >
                                                <h6>{feed.name}</h6>
                                            </Link>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 text-left">
                                            <Link to=
                                                {{
                                                    pathname: `/admin/addship/${feed.id}`, 
                                                    state: {ship: {...feed}}
                                                }}
                                            >
                                                <h6>{feed.status}</h6>
                                            </Link>
                                        </div>
                                    
                                </div>
                            </div>
                        ))}
                        </div>
                        <div className="col-2"></div>
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

export default connect(mapStateToProps, null)(Ships)
