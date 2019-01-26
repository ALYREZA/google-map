import React, {Component} from "react"
import {GoogleMaps} from "../components/GoogleMaps"
import {Container} from "react-amazing-grid";
import {data} from "../assets/data";
import {Table} from "../components/Table"

class Main extends Component {

  state = {
    selected: []
  };

  inside = (point, vs) => {
    var x = point['lat'],
      y = point['long'];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i]['lat'],
        yi = vs[i]['long'];
      var xj = vs[j]['lat'],
        yj = vs[j]['long'];

      var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) 
        inside = !inside;
      }
    
    return inside;
  };
  _getPoly = (poly) => {
    const polyArray = poly
      .getPath()
      .getArray();
    const result = [];
    polyArray.forEach(function (path) {
      result.push({
        lat: path.lat(),
        long: path.lng()
      });
    });
    this.setState({selected: result});
  }
  _handleSelected = () => {
    const {selected} = this.state;

    const isInside = [];
    const result = [];
    data.forEach((item) => {
      isInside.push(this.inside(item, selected));
    });
    console.log(isInside);
    data.forEach((item, index) => {
      if (isInside[index]) {
        result.push(item);
      }
    });
    return result;
  }
  render() {
    const selectedArray = this._handleSelected();
    return (
      <div className="App">
        <Container>
          <GoogleMaps
            isMarkerShown
            data={data}
            bounds={(dta) => console.log(dta)}
            polyComplete={this._getPoly}/>
          <div>
            <h1 style={{
              textAlign: "right"
            }}>انتخاب شده ها</h1>
            <Table data={selectedArray}/>
            <br/>
          </div>
          <div>
            <h1 style={{
              textAlign: "right"
            }}>فروشگاه ها</h1>
            <Table data={data}/>
          </div>

        </Container>
      </div>
    );
  }
}

export default Main;
