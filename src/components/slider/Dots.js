import React, { Component } from "react";

class Dots extends Component {
    renderDot = (arrSliders) => {
        var result = null;
        if (arrSliders) {
            result = arrSliders.map((slider, index) => {
                return (
                    <li key={index} data-index={index}>dot {index}</li>
                )
            })
        }
        return result;
    }

    render() {
        return (
            <ul>
                { this.renderDot(this.props.arrSliders) }
            </ul>
        );
    }
}

export default Dots;
