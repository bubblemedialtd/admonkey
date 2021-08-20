import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Migrate AdMonkey Tokens</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          
        }}>
          <div className="form-group mr-sm-2">
            
          </div>
          <div className="form-group mr-sm-2">
            
          </div>
          <button type="submit" className="btn btn-primary">Migrate V1 to V2</button>
        </form>
      </div>
    );
  }
}

export default Main;