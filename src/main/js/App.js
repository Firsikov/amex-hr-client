import _ from 'lodash';
import React, {Component} from 'react';
import '../css/App.css';

export default class App extends Component {

    state = {
        data: {},
    };

    componentDidMount() {
        this.initialize()
    }

    initialize = async () => {
        const data = await this.transform(1);
        this.setState({ data });
    };

    transform = id =>
        new Promise(async resolve => {
            const employee = await this.fetchEmployeeById(id)
                .then(this.processServerReponse)
                .then(this.processJson(id))
                .catch(console.error);

            if(!employee) return;

            const reports = _.map(employee.reports,
                async reportId => await this.transform(reportId));

            Promise.all(reports)
                .then(this.transformReports(employee))
                .then(resolve);
        });

    transformReports = ({ name, id }) => reports =>
        ({ [name]: { id, reports } });

    processServerReponse = response => {
        if(response.ok)
            return response.text();

        return Promise.reject(`Failed to fetch data from the server: Error code ${response.status}`)
    };

    processJson = employeeId => response => {
        if(_.isEmpty(response))
            return Promise.reject(`Employee with id ${employeeId} not found`);

        try {
            return JSON.parse(response);
        } catch (e) {
            return Promise.reject(`Failed to parse response from the server for id ${employeeId}`);
        }
    };

    fetchEmployeeById = id => fetch(`/employee/${id}`);

    render() {
        const data = JSON.stringify(this.state.data);
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
