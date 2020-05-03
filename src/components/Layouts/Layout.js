import React, { Component } from 'react';
import './Layout.css'
import { Div } from '../Common/Common';
import { MENU } from '../Validator/Validator';

export default class Layout extends Component {
    state = {
        heading: ""
    }

    componentWillReceiveProps() {
        const active = this.props.children.find(e=> e.props.path === window.location.pathname);
        if(active && this.state.active !== active.props.title) {
            this.setState({ heading: active.props.title });
        }
    }

    render() {
        return (
            <>
                {this.state.heading && (<Div cName="heading">{this.state.heading}</Div>)}
                <Div cName="main-container">
                    <Div cName="main-content">{this.props.children}</Div>
                </Div>
            </>
        );
    }
}