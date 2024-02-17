import React, { useState } from 'react'
import { writeUserData, readRegistrationData } from './Firebase'
import './RegistrationForm.css'

//load firestore data
const data = await readRegistrationData();

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = data;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit() {
        writeUserData(this.state.firstName, this.state.lastName, this.state.email);
    }

    render () {
        return (
            <>
            <form>
                <div className='column'>
                    <label htmlFor='firstName'>First Name:</label>
                    <label htmlFor='lastName'>Last Name:</label>
                    <label htmlFor='email'>Email:</label>
                </div>
                <div className='column'>
                    <input type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange}/>
                    <input type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange} />
                    <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
                </div>
            </form>
            <div className='center'>
            <button className="submit-button" onClick={this.handleSubmit}>
                Submit
            </button>
            </div>
            </>
        );
    }
}

export {RegistrationForm};