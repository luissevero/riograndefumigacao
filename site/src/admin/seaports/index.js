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
    seaports: [],
    loading: true,
    redirect: false
}

class Seaports extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = () => {
        this.getSeaports()
    }

    /*
    getSeaports = async () => {
        if(this.props.online){
            await api.get(`seaports`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
            })
            .then(
                response => {this.setState({seaports: response.data})},
                response => this.erroApi(response)
            )
        }else{
            await apiLocal.get(`seaports`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
            })
            .then(
                response => {this.setState({seaports: response.data})},
                response => this.erroApi(response)
            )
        }
        await this.setState({loading: false}) 
    }
    */

    
   getSeaports = async () => {
    await apiEmployee.post(`getSeaports.php`, {
        token: this.props.token
    }).then(
        async response => { 
            await this.setState({seaports: response.data})
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
                            <div className="col-lg-12">
                                <div className="page-breadcrumb">
                                    <h2 style={{marginBottom: '3%', marginTop: '3%', textAlign: 'center'}}>Seaports</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="contact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-right">
                                <Link to={{pathname: `/admin/addseaport/0`}}><button style={{backgroundColor: '#eee', opacity: 0.9} } > Adicionar</button></Link>
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
                        {this.state.seaports.map(feed => (
                            <div key={feed.id} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 all dresses bags itemLista">
                                <div className="single-product-item">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 text-right">
                                            <Link to={{pathname: `/admin/addseaport/${feed.id}`, state: feed.id}}>
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

export default connect(mapStateToProps, null)(Seaports)