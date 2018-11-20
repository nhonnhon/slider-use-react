import React, { Component } from "react";
import Dots from './slider/Dots';
import Slider from './slider/Slider';
import ArrowNext from './slider/ArrowNext';
import ArrowPrev from './slider/ArrowPrev';

const arrSliders = [
    {
        background: 'bg-green',
        text: 'Slider 1',
        content: 'This is slider 1'
    },
    {
        background: 'bg-red',
        text: 'Slider 2',
        content: 'This is slider 2'
    },
    {
        background: 'bg-yellow',
        text: 'Slider 3',
        content: 'This is slider 3'
    },
    {
        background: 'bg-pink',
        text: 'Slider 4',
        content: 'This is slider 4'
    }
]

const settings = {
    dot: true,
    loop: true,
    slideToShow: 2,
    slideToScroll: 1,
    arrow: true,
    autoplay: true,
    fade: false
}

class Sliders extends Component {
    render() {
        return (
            <div className="wrapper">
                <Slider arrSliders={arrSliders} settings={settings} />
                <Dots arrSliders={arrSliders} settings={settings} />
                <ArrowPrev settings={settings} />
                <ArrowNext settings={settings} />
            </div>
        );
    }
}

export default Sliders;
