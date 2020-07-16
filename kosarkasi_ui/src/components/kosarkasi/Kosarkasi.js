import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {ucitavanje} from "../../store/actions";
import {kosarkasiService} from "../../services";
import "../../bootstrap.min.css";
import "./Kosarkasi.css";
export class Kosarkasi extends Component{
    constructor(props){
        super(props);
        this.state={
           kosarkasi: []
        };
        
    }

   componentDidMount () { 
    this.props.ucitavanje();
     kosarkasiService.ucitavanje()
    .then((response) => response.json())
    .then(kosarkasiList => {
        this.setState({ kosarkasi: kosarkasiList });
    }); 
   }

    render(){
        return(
            <div>
                <br/>
                <br/>
            <h2 className="naslov">Kosarkasi</h2>
            <br/>
            <Table>
                
                <thead>
                    <tr>
                        <th>Ime i prezime</th>
                        <th>Rodjenje</th>
                        <th>Klub</th>
                        <th>Utakmice</th>
                        <th>Poeni</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.kosarkasi.map((kosarkas) => <tr key={kosarkas.Id}>
        <td>{kosarkas.ImeIPrezime}</td>
        <td>{kosarkas.Godina}</td>
        <td>{kosarkas.Klub.Naziv}</td>
        <td>{kosarkas.BrojUtakmica}</td>
        <td>{kosarkas.BrojPoena}</td>
    </tr>)}
                </tbody>
            </Table>
            </div>
        );
    }

}


const mapStateToProps = (state) =>{
    return {
      kosarkasi: state.kosarka.kosarkasi
    };
};



export default connect(
    mapStateToProps,
    {ucitavanje}
)(Kosarkasi);


              