/* eslint-disable react/jsx-no-undef */
import React , { Component } from 'react';
import Originals from './ContentTypes/Originals'
import Trending from './ContentTypes/Trending';
import TopRated from './ContentTypes/TopRated';
import Modal from '../Modal/Modal.js';
import './Content.css';

class ContentDisplay extends Component {
    state = {
        originals: [],
        action: [],
        trending: [],
        topRated: [],
        comedy: [],
        horror: [],
        romantic: [],
        isShowing: false,
        movie: {},
        selectedFile: null,
        baseImg: null,
        imgSrc: null,
        imgSrcs: [],
        file: null,
    }
    fileChangedHandler = event => {
        const file = event.target.files[0];
        this.setState({ file: file })
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result],
            })
        }.bind(this);
        console.log(url)
    }



    uploadHandler = () => {        
        const file = this.state.file;
        if(!file){
            alert('Please Select File')
            return false;
        }
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        const preStateValues = this.state.imgSrcs;
        reader.onloadend = function (e) {
            const allValues = [...preStateValues, [reader.result]]
            this.setState({
                imgSrc: null,
                imgSrcs: allValues,
                isShowing: false,
                file: null
            })
        }.bind(this);
    }

    onOpen = () => {
        this.setState({ isShowing: true })
    }

    onClose = () => {
        this.setState({ isShowing: false })
    }
    myChangeHandler = (event) => {
        this.setState({moviename: event.target.value});
    }
    dropDownChanger = (event) => {
        this.setState({category: event.target.value});
    }

    renderForm = () => {
        const { isShowing } = this.state;       
        return (
            <Modal
                show={isShowing}
                close={this.onClose}
                movie={undefined}
            >
                <p>Enter Movie:</p>
                <input
                    type='text'
                    onChange={this.myChangeHandler}
                />
                <input type="file" onChange={this.fileChangedHandler} />
                <button onClick={this.uploadHandler}>Sub Mit</button>
                {this.state.imgSrc ?
                    <model-viewer id="reveal" loading="eager" camera-controls auto-rotate src={this.state.imgSrc} alt="A 3D model of a shishkebab"></model-viewer> : null}
            </Modal>
        )
    }

    render() {
        return (
            <div className="display" >
                <div style={{width:'250px', float: 'left'}}>
                <h1>Upload Movies </h1></div>  
                <div style={{width:'400px', float: 'left'}}> <h1><button onClick={this.onOpen}>Click here to open from</button></h1>
                </div>
                {this.renderForm()}
                <div className="rest" style={{ display: 'flex', overflowX: 'visible', overflowY: 'scroll', }}>
                    {this.state.imgSrcs.map(eachObj => {

                        return <div class="other"><model-viewer id="reveal" loading="eager" camera-controls auto-rotate src={eachObj} alt="A 3D model of a shishkebab"></model-viewer></div>
                    })}
                </div>
               
                <Originals />
                <Trending />
                <TopRated />
            </div>
        )
    }
}

export default ContentDisplay;