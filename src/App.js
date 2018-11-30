import React, { Component } from 'react';
import { Input } from 'reactstrap';

import listeregions from './Jasons/regions.json'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coderegion: 0,
      filteredVilles: [{ "nom": "Veuillez choisir une région" }],
    };
    this.displayVilles = this.displayVilles.bind(this)
    this.handleChangeRegion = this.handleChangeRegion.bind(this)
    this.filterVilles=this.filterVilles.bind(this)
  }
  displayVilles() {
    return this.state.filteredVilles.map((ville) =>
      <option >{ville.nom}</option>
    )
  }
  listeregions() {
    return listeregions.map((region) =>
      <option code={region.code}>{region.nom}</option>
    )
  }
  handleChangeRegion(event) {
    var index = event.target.selectedIndex;
    var optionElement = event.target.childNodes[index]
    var region_code = optionElement.getAttribute('code');


    this.setState({region_code}, () => {
      this.loadCities()
    })
  }
  loadCities(){
    fetch(`https://geo.api.gouv.fr/communes?codeRegion=${this.state.region_code}&fields=nom&format=json`)
    .then(result => result.json())
    .then(regionVilles => this.setState({ regionVilles:regionVilles, filteredVilles:regionVilles }));
  }

  filterVilles(event){
    let filteredVilles= this.state.regionVilles;
    filteredVilles = filteredVilles.filter(
      (city) => {
        return city["nom"].toUpperCase().indexOf(event.target.value.toUpperCase()) !== -1;
      }
    );
    this.setState({filteredVilles})
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div class="form-row">
          <div class="form-group col-md-6 ">
            <label><b>Région</b></label>
            <select type="text" class="form-control" name="region" value={this.state.region} onChange={this.handleChangeRegion}  >
              {/* <select type="text" class="form-control" name="region" value={this.state.region}  > */}
              {this.listeregions()}
            </select>
          </div>
          <div class="form-group col-md-6">
            <label><b>Ville</b></label>
            <Input name="ville" value={this.state.ville} onChange={this.filterVilles}></Input>
            <select type="text" class="form-control" name="ville" value={this.state.ville} onChange={this.handleChange}>
              {this.displayVilles()}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
