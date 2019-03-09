import React, {Component} from 'react';
import '../css/App.css';

export default class App extends Component {

    state = {
        data: {}
    };

    inputChange = event => {
        this.setState({
            searchString: event.target.value
        });
    };

    search = () => {
        fetch(`/employee/${this.state.searchString}`).then(result => result.json()).then(data => this.setState({ data }));
    };

    keyDown = event => {
        if(event.keyCode === 13) {
            this.search();
        }
    };

    render() {
        const data = JSON.stringify(this.state.data);
        return (
            <div className="App">
                <header className="App-header">
                    <input onChange={this.inputChange} onKeyDown={this.keyDown} />
                    <button onClick={this.search}>Search!</button>
                    <p>
                        { data }
                    </p>
                </header>
            </div>
        );
    }
}
