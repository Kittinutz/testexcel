import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as XLSX from 'xlsx';

const reader = new FileReader();

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            excel: [{name: "kittinut", surname: "pramhan"}]
        }
    }

    ReceiveFile = (event) => {
        const data = event.target.files[0];

        reader.onloadend = function (e) {
            let file = e.target.result;
            const workbook = XLSX.read(file, {
                type: 'binary'
            });

        workbook.SheetNames.forEach( sheetName => {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                console.log(json_object);

            });


        }
        ;
        reader.onerror = function (ex) {
            console.log(ex);
        };

     reader.readAsBinaryString(data);



    };

    render() {
        if (this.state.excel) {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                    <input type="file" onChange={this.ReceiveFile}/>
                    {
                        this.state.excel.map((data, index) => {
                            return (

                                <p key={index}>{data.name + " " + data.surname}</p>
                            )
                        })
                    }
                </div>
            );
        } else {
            return (
                <div>
                    Loading .... naja
                </div>
            )
        }
    }
}

export default App;
