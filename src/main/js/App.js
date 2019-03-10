import React, { Component } from 'react';
import '../css/App.css';
import { getEmployeeById } from "./employeeService";

export default class App extends Component {

    state = {
        data: '',
    };

    componentDidMount() {
        this.initialize()
    }

    initialize = async () => {
        const data = await getEmployeeById(1).then(JSON.stringify);
        this.setState({ data });
    };

    render() {
        const { data } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        { data }
                    </p>
                </header>
            </div>
        );
    }
}
