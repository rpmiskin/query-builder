import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import './App.css';
import VennDiagram from './VennDiagram';

function nextLetter(terms) {
    let code = 65;
    let letter = '"'+String.fromCharCode(code)+'"';
    while (terms.indexOf(letter) > -1) {
      code++; 
      letter = '"'+String.fromCharCode(code)+'"';
    }
    return letter;
    
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {terms:['"A"','"B"', '"D"']};
    this.renderList = this.renderList.bind(this);
  }

  renderList(terms) {
      return terms.map((t,index) => 
              <ListItem
                  key={t}
                  primaryText={t}
                  rightIconButton={
                      <IconButton
                          tooltip='Delete'
                          onClick={()=> {
                              // Copy the existing terms and remove the
                              // clicked on item
                              const newTerms = [...this.state.terms];
                              newTerms.splice(index, 1);
			      console.log(newTerms);
                              this.setState({terms:newTerms});
                          } }
                      >
                        <ActionDelete />
                      </IconButton>
                  }
              />);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="Query Builder"/>
          <div className='body'>
            <div className='controls'>
              <List className='list'>
                <div className='list-heading'>
                  <div className='title'><h2>Search Terms</h2></div>
                  <FloatingActionButton 
                      className='add-button'
                      secondary={true}
                      onClick={()=> {
                          const newTerms = this.state.terms;
                          newTerms.push(nextLetter(newTerms));
                          this.setState({terms:newTerms});
                      }}>
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
                {this.renderList(this.state.terms)}
              </List>
            </div>
            <div className='diagram'>
              <VennDiagram terms={this.state.terms} size={[500,500]}/>
            </div>
          </div>
          <div>
            <FlatButton label='Perform search' fullWidth={true}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
