import React, { Component } from "react";

class Dots extends Component {
    onClickDot = index => {
        this.props.onClickDot(index);
    };

    renderDot = arrSliders => {
        var result = null;
        if (arrSliders) {
            result = arrSliders.map((slider, index) => {
                return (
                    <li
                        key={index}
                        className={
                            this.props.slideIndex === index ? "active" : ""
                        }
                        data-index={index}
                        onClick={() => this.onClickDot(index)}
                    >
                        dot {index}
                    </li>
                );
            });
        }
        return result;
    };

    render() {
        return (
            <ul className="slider-dots">
                {this.renderDot(this.props.arrSliders)}
            </ul>
        );
    }
}

export default Dots;
