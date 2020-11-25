import React, {Component} from 'react'
import Styles from './styles.css'
import Logo from '../../img/logos/rgf.png'
import {Link, Redirect} from 'react-router-dom'
import {logout} from '../../store/actions/user'
import {connect} from 'react-redux'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

class Header extends Component {
 
    state = {
        token: '',
        nome: '',
        redirect: false
    }

    fazerLogout = async () => {
        await this.props.onLogout()
        alert('Logout  realizado!')
        await this.setState({redirect: true})
    }

    render(){
        return (
            <div className="container">
                {this.state.redirect &&
                    <Redirect to={'/admin'} />
                }
                <div className="row">
                    <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 text-center">
                        {this.props.voltar &&
                            <Link to={{pathname: `/admin/inicio`}}>
                                <FontAwesomeIcon cursor="pointer" icon={faArrowLeft} color="#17386b" size="3x" />
                            </Link>
                        }
                        {this.props.voltarShips &&
                            <Link to={{pathname: `/admin/ships`}}>
                                <FontAwesomeIcon cursor="pointer" icon={faArrowLeft} color="#17386b" size="3x" />
                            </Link>
                        }
                        {this.props.voltarClient &&
                            <Link to={{pathname: `/admin/clients`}}>
                                <FontAwesomeIcon cursor="pointer" icon={faArrowLeft} color="#17386b" size="3x" />
                            </Link>
                        }
                        {this.props.voltarEmployee &&
                            <Link to={{pathname: `/admin/employees`}}>
                                <FontAwesomeIcon cursor="pointer" icon={faArrowLeft} color="#17386b" size="3x" />
                            </Link>
                        }
                        {this.props.voltarFeed &&
                            <Link to={{pathname: `/admin/feeds`}}>
                                <FontAwesomeIcon cursor="pointer" icon={faArrowLeft} color="#17386b" size="3x" />
                            </Link>
                        }
                        {this.props.voltarSeaport &&
                            <Link to={{pathname: `/admin/seaports`}}>
                                <FontAwesomeIcon cursor="pointer" icon={faArrowLeft} color="#17386b" size="3x" />
                            </Link>
                        }
                    </div>
                    <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 text-center">
                        <Link to={{pathname: `/admin/inicio`}}>
                            <img className="img img-fluid thumbnail" src={Logo} style={{alignItems: 'center', justifyContent: 'center'}}/>
                        </Link>
                    </div>
                    <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 text-center">
                        <FontAwesomeIcon cursor="pointer" onClick={() => this.fazerLogout()} icon={faSignOutAlt} color="#17386b" size="3x">
                        </FontAwesomeIcon>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout: user => dispatch(logout(user))
    }
}

export default connect(null, mapDispatchToProps)(Header)