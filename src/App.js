import React, { Component } from 'react';
import { Input } from 'reactstrap';

import listeregions1 from './Jasons/regions.json'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coderegion: 0,
      filteredVilles: [{ "nom": "Choisir une ville", "region":{"nom":""}}],
      filteredRegions:listeregions1
    };
    this.displayVilles = this.displayVilles.bind(this)
    this.displayRegions=this.displayRegions.bind(this)
    this.handleChangeRegion = this.handleChangeRegion.bind(this)
    this.handleChangeVille=this.handleChangeVille.bind(this)
    this.filterVilles = this.filterVilles.bind(this)
    this.handleVilleSelection=this.handleVilleSelection.bind(this)
   
  }
  displayVilles() {
    return this.state.filteredVilles.map((ville) =>
      <option>{ville.nom}</option>
    )
  }
  displayRegions() {
    return this.state.filteredRegions.map((region) =>
      <option code={region.code}>{region.nom}</option>
    )
  }
  handleChangeRegion(event) {
    var index = event.target.selectedIndex;
    var optionElement = event.target.childNodes[index]
    var region_code = optionElement.getAttribute('code');

    this.setState({ region_code, region_selected:event.target.value }, () => {
      this.loadCities()
    })
  }
  handleChangeVille(event) {
    this.setState({ville_nom:event.target.value}, () => {
      this.loadCities_2(event)
    })
  }
  handleVilleSelection(event){
    console.log(event.target.value)
    this.setState({
      region_selected:[this.state.filteredVilles[event.target.selectedIndex].region.nom],
      ville_selected:event.target.value
    })
  }
  loadCities() {
    fetch(`https://geo.api.gouv.fr/communes?codeRegion=${this.state.region_code}&fields=nom,codeRegion,region&format=json`)
      .then(result => result.json())
      .then(regionVilles => this.setState({ regionVilles: regionVilles, filteredVilles: regionVilles }));
  }
  loadCities_2(event) {
    fetch(`https://geo.api.gouv.fr/communes?nom=${this.state.ville_nom}&fields=nom,region&format=json`)
      .then(result => result.json())
      .then(villeVilles => {
        let region_selected=[villeVilles[0].region.nom]
        let ville_selected=[villeVilles[0].nom]
        this.setState({ regionVilles: villeVilles, filteredVilles: villeVilles, region_selected, ville_selected})
      });
  }
  
  // N'est pris en compte qu'avec la boucle choix région puis choix ville:
  filterVilles(event) {
    let filteredVilles = this.state.regionVilles;
    filteredVilles = filteredVilles.filter(
      (city) => {
        return city["nom"].toUpperCase().indexOf(event.target.value.toUpperCase()) !== -1;
      }
    );
    //let  filteredRegions=[{ "nom": "....", "code":"" }]
    this.setState({ filteredVilles})
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
              {this.displayRegions()}
            </select>
          </div>
          <div class="form-group col-md-6">
            <label><b>Ville</b></label>
            <Input name="ville" value={this.state.ville_nom} onChange={this.filterVilles}></Input>
            <select type="text" class="form-control" name="ville" value={this.state.ville} onChange={this.handleChange}>
              {this.displayVilles()}
            </select>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>

        <div class="form-row">
        <div class="form-group col-md-6">
            <label><b>Ville</b></label>
            <Input name="ville" value={this.state.ville_nom} onChange={this.handleChangeVille}></Input>
            <select type="text" class="form-control" name="ville" value={this.state.ville_selected} onChange={this.handleVilleSelection}>
              {this.displayVilles()}
            </select>
          </div>
          <div class="form-group col-md-6 ">
            <label><b>Région</b></label>
            <select type="text" class="form-control" name="region" value={this.state.region_selected} onChange={this.handleChangeRegion}  >
              {/* <select type="text" class="form-control" name="region" value={this.state.region}  > */}
              {this.displayRegions()}
            </select>
          </div>
        </div>


      </div>

    );
  }
}

export default App;
