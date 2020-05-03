import React, { Component } from 'react';
import './Login.css';
import { Link, Input, Button, Label, Span, Div, Checkbox, H1, Modal, Select } from '../Common/Common';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { action_types } from '../../actions/constants';
import { isEmpty, setToken, getToken } from '../Validator/Validator';
import * as actions from '../../actions/action';

class Login extends Component {
    state = {
        username_mobile: "",
        password: "",
        showError: false,
        showModal: false,
        modalMsg: "",
        showinnerModal: false,
        options: [
            { option: "Select Role", value: "" }
        ],
        comp_id: "",
        showPass: false,
        roles: {
            'OrgAdmin': '/shop_list',
            'ShopAdmin': '/counter_list',
            'Cashier': '/queue',
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onCheckChange = (e) => {
        this.setState({ [e.target.id]: e.target.checked })
    }

    onShowPass = (e) => {
        this.setState({ showPass: !this.state.showPass })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ showError: true })
        if (this.isValid()) {
            this.props.callApi(action_types.LOGIN, {
                username_mobile: this.state.username_mobile,
                password: this.state.password
            });
            this.setState({ showError: false, modalMsg: "" });
        }
    }

    isValid() {
        return isEmpty(this.state.username_mobile) && isEmpty(this.state.password);
    }

    componentDidMount() {
        if (this.props.auth && this.props.auth.token) {
            this.props.history.push(this.state.roles[this.props.auth.data[0].role]);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.auth !== nextProps.auth && nextProps.auth) {
            if (nextProps.auth.status === 99) {
                if (nextProps.auth.data.length > 1) {
                    this.setState({ showinnerModal: true })
                }
            } else if (nextProps.auth.status === 200 && nextProps.auth.data) {
                setToken(nextProps.auth.data.token, this.state.isLocal)
                this.props.history.push(this.state.roles[nextProps.auth.data.role_name]);
            } else if(nextProps.auth.message) {
                this.setState({ showModal: true, modalMsg: nextProps.auth.message, isSuccess: false })
            }
        }
    }

    closeModal = () => {
        this.setState({ showModal: false, modalMsg: "", showError: false });
    }

    render() {
        return (
            <Div cName="login">
                {this.state.showModal && !this.props.loading && (<Modal width="400px" height="200px" closeModal={this.closeModal} title={this.state.modalMsg} isSuccess={!this.state.showError} />)}
                <Div cName="login-wrapper">
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <Div cName="row form-group">
                            <Input type="text" label="Email/Mobile" id="username_mobile" value={this.state.username_mobile} required={true} onChange={this.onChange} showError={this.state.showError} autoFocus={true} />
                        </Div>
                        <Div cName="row form-group">
                            <Input type={this.state.showPass ? "text" : "password"} label="Password" id="password" value={this.state.password} required={true} onChange={this.onChange} showError={this.state.showError} />
                            <Span cName={this.state.showPass ? "fa fa-fw field-icon toggle-password fa-eye-slash" : "fa fa-fw fa-eye field-icon toggle-password"} onClick={this.onShowPass} />
                        </Div>
                        <Div cName="row additional-row">
                            <Div cName="login-remember-me col-6 col-sm-6 col-md-6">
                                <label>
                                    {/* <input type="checkbox" className="remember-me" /> */}
                                    <Checkbox type="checkbox" cName="login-checkbox" id="isLocal" onChange={this.onCheckChange} />
                                    <Span className="remember-me-text">
                                        &nbsp;Keep me logged in
                            </Span>
                                </label>
                            </Div>
                            <Div cName="login-forgot-pw col-6 col-sm-6 col-md-6">
                                <a style={{ textDecoration: "none" }} href="#">
                                    Forgot Password?
                            </a>
                            </Div>
                        </Div>
                        <Div cName="row submit-row">
                            <Button cName="form-control submit-button-md" title="Log In" />
                        </Div>
                    </form>
                </Div>
            </Div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.store.auth,
        loading: state.store.loader,
    };
};
export default connect(mapStateToProps, actions)(withRouter(Login));
