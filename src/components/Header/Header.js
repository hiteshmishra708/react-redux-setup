import React, { Component } from 'react';
import './Header.css';
import { Link, Div } from '../Common/Common';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/action';
import { action_types } from '../../actions/constants';
import { MENU, removeToken, getToken } from '../Validator/Validator';

class Header extends Component {
    state = {
        menu: [],
        active: '/counter_list',
    }

    componentDidMount() {
        if (getToken() && this.props.auth && this.props.auth.data) {
            const menu = MENU.filter(e => e.when.indexOf(this.props.auth.data.role_name) !== -1);
            if (menu.length) {
                this.setState({ menu: menu, active: menu[0].url });
            }
        } else {
            this.props.updateReducer(action_types.CLEAR_DATA);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.auth !== nextProps.auth && nextProps.auth && nextProps.auth.data) {
            const menu = MENU.filter(e => e.when.indexOf(nextProps.auth.data.role_name) !== -1);
            if (menu.length) {
                this.setState({ menu: menu, active: menu[0].url });
            }
        }
    }

    logout = () => {
        this.setState({ menu: [], active: '' });
        removeToken();
        this.props.updateReducer(action_types.LOGOUT);
    }

    onClick = (e) => {
        if (e.target.id === '/login') this.logout();
        else {
            this.setState({ active: e.target.id })
        }
    }

    render() {
        return (
            <Div cName="login-header">
                <Div cName="row">
                    <Div cName="top-navbar">
                    {/* <div className="mobile-heading">Blocked Users</div> */}
                    <Div cName="mobile-nav vertically-center">
                        <Div cName="mobile-links">
                            <span className="fa fa-bars" />
                        </Div>
                    </Div>
                    <Div cName="links menu-links">
                            {this.state.menu.map((val, idx) => {
                                return (
                                    <Link key={idx} cName={this.state.active === val.url ? "active" : ""} id={val.url} to={val.url} title={val.option} onClick={this.onClick} />
                                )
                            })}
                        </Div>
                    </Div>
                </Div>
            </Div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.store.auth,
    };
};
export default connect(mapStateToProps, actions)(withRouter(Header));