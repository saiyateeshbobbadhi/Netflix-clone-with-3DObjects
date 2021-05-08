import React from 'react';
import './Modal.css';
import Backdrop from './Backdrop';

const modal = (props) => {
    console.log(props)
    const url = 'https://image.tmdb.org/t/p/original' + (props.movie ?  props.movie.backdrop_path : '');
    const backgroundStyle = {
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover'
    }
    const styleObj = {
        backgroundColor: 'white',
        backgroundSize: 'cover'
    }
    return (
        <>
            <Backdrop show={props.show} toggleBackdrop={props.close} />
            <div
                style={ props.movie ? backgroundStyle : styleObj}
                className={(props.show ? "modal show" : "modal hide")}
            >
                {props.children}
            </div>
        </>
    )
}

export default modal;