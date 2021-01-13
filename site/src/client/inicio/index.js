import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faPersonBooth, faSlidersH, faUserCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import {primary} from '../../commonStyles'
import {Link} from 'react-router-dom'
import Progressbar from 'react-bootstrap/ProgressBar'

import HeaderClient from '../../components/headerclient'
import moment from 'moment'

import './styles.css'
import {apiClient} from '../../services/apirgfumiga'
import ModalFumigator from '../../components/modalfumigator'
import 'bootstrap/dist/css/bootstrap.min.css'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
}

class Inicio extends Component {

    state = {
        token: null,
        ships: [],
        seaports: [],
        seaport: 0,
        status: 'all',
        search: '',
        modal: false
    }

    componentDidMount = async () => {
        await this.setToken()
        await this.carregaShips()
        await this.carregaSeaports()
    }

    setToken = async () => {
        await this.setState({token: this.props.token})
    }

    carregaSeaports = async () => {
        try{          
            await apiClient.post(`filter.php`, {
                token: this.state.token
            }).then(
                async res => {
                     if(res.data == 'false'){
                         alert('Usuário não logado!')
                     }else{
                         await this.setState({seaports: res.data})                        
                     }
                 },
                async res => alert(res.data) 
            )
        }catch(e){
            alert(e)
        }
    }

    carregaShips = async () => {
        try{          
            await apiClient.post(`home.php`, {
                token: this.state.token
            }).then(
                async res => {
                     if(res.data == 'false'){
                         alert('Usuário não logado!')
                     }else{
                         await this.setState({ships: res.data})                        
                     }
                 },
                async res => alert(res.data) 
            )
        }catch(e){
            alert(e)
        }
    }
    
    filtroSeaport = (navios) => this.state.seaport != 0 ? parseInt(navios.id_seaport) === parseInt(this.state.seaport) : 1
    filtroStatus = (navios) => this.state.status != 'all' ? navios.status == this.state.status : 1
    //filtroName = (navios) => !navios.name.trim().toLowerCase().indexOf(`${this.state.search.toLowerCase()}`)
    filtroName = (navios) => navios.name.toLowerCase().includes(this.state.search.toLowerCase())
    
    

    render(){
        return (
            <div>              
                <HeaderClient />
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-3 text-center">
                        <select className="form-control" as="select" name="status" id="status" value={this.state.status} onChange={async e => { await this.setState({status: e.currentTarget.value})}}>
                            <option value={'all'}>All</option>
                            <option value={'Operating'}>Operating</option>
                            <option value={'Foreseen'}>Foreseen</option>
                            <option value={'Finalized'}>Finalized</option>                               
                        </select>
                    </div>
                    <div className="col-4 text-center">
                        <input id='search' value={this.state.search} onChange={async e => { await this.setState({search: e.currentTarget.value}); console.log(this.state.search);}} className="form-control" placeholder="Ship name" />
                    </div>
                    <div className="col-3">
                        <select className="form-control" as="select" name="seaport" id="seaport" value={this.state.seaport} onChange={async e => { await this.setState({seaport: e.currentTarget.value})}}>
                            <option value={0}>Seaport:</option>
                            {this.state.seaports.map((seaport, index) => (
                                <option key={index} value={seaport.id}>{seaport.name}</option>
                            ))}                        
                        </select>
                    </div>
                    <div className="col-1"></div>
                    
                </div>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-3 text-left negrito">Date/Time</div>
                            <div className="col-3 text-left negrito">Status</div>
                            <div className="col-3 text-left negrito">Loading Progress</div>
                            <div className="col-3 text-left negrito">Ship</div>
                        </div>
                    </div>
                    <div className="col-2 negrito">Condemned Cargo</div>
                    <div className="col-1"></div>
                </div>
                {this.state.ships.filter(this.filtroName).filter(this.filtroSeaport).filter(this.filtroStatus).map(navio => (
                    <div key={navio.id} className="row">
                        <div className="col-3"></div>
                        <div className="navios col-6">
                            <div className="row">
                                <div className="col-3 text-left">
                                    <p>{moment(`${navio.year}-${navio.month}-${navio.day}`).format('MMM')}/{navio.day} - {navio.time}</p>
                                </div>
                                <div className="col-3 text-left">
                                    <p style={{color: '#f00', fontWeight: "bold" }}>{navio.status}</p>
                                </div>
                                <div className="col-3 text-center">
                                    <Progressbar
                                       variant="custom"
                                        //variant={navio.shipment / navio.full_shipment * 100 < 100 ? "warning" : "custom"} 
                                        animated={navio.shipment / navio.full_shipment * 100 < 100 ? true : false} 
                                        now={navio.shipment / navio.full_shipment * 100} 
                                        label={`${navio.shipment / navio.full_shipment * 100}%`} 
                                    />
                                </div>
                                <div className="col-3 text-left">
                                    <p>{navio.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="navios col-1 text-center" style={{color: navio.doomed == 1 ? 'green' : navio.doomed == 0 ? 'red' : '#ffc500'}}>
                            {navio.doomed == 1 &&
                                'Yes'
                            }
                            {navio.doomed == 0 &&
                                'No'
                            }
                            {!navio.doomed &&
                                'Under Analisys'
                            }
                            
                        </div>
                        <div className="navios col-1">
                            <Link to={{
                                pathname: `/client/shipstatus/${navio.id}`, 
                                query: {...navio}
                            }}>
                                <FontAwesomeIcon icon={faEye} size='2x' color={primary} />
                            </Link>
                        </div>
                        <div className="col-1"></div>
                    </div>
                ))}         
            </div>
        )
    }
}

const mapStateToProps = ({user}) => {
    return{
        token: user.token
    }
}

export default connect(mapStateToProps, null)(Inicio)
