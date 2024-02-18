import React, { useState } from 'react'
import { writeUserData, readRegistrationData, autoLogIn } from './Firebase'
import './RegistrationForm.css'


class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: ""
        };      

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        ;(async () => {
            await autoLogIn();
            this.setState(this.state = await readRegistrationData());
            console.log(this.state);
          })()
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