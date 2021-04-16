import React, {Component} from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import { render } from 'react-dom';
import api from "../../services/api";

class AgriculturistPage extends Component {
  state = {
    agriculturists: []
  }

  componentDidMount() {
    this.loadAgriculturists()
  }

  loadAgriculturists = async () => {
    try {
      const response = await api.get("/agriculturists")
      this.setState({ agriculturists: response.data})
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { agriculturists } = this.state
    console.log(agriculturists)
    return (
      <React.Fragment>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>CPF | CNPJ</th>
                <th>Nome do Produtos</th>
                <th>Nome da Fazenda</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Área total (ha)</th>
                <th>Área agricultável (ha)</th>
                <th>Área de vegetação (ha)</th>
                <th>Culturas plantadas</th>
                <th>Ação</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {agriculturists.map((value, index) => {
                 return (<tr key={index}>
                  <td>#</td>
                  <td>{value.cpf}</td>
                  <td>{value.name}</td>
                  <td>{value.ranch_name}</td>
                  <td>{value.ranch_city}</td>
                  <td>{value.ranch_state}</td>
                  <td>{value.ranch_total_area}</td>
                  <td>{value.ranch_total_arable_area}</td>
                  <td>{value.ranch_total_vegetation_area}</td>
                  <td>{value.ranch_crops_planted}</td>
                </tr>)
              })}
            </MDBTableBody>
          </MDBTable>
      </React.Fragment>
    )
  }
}

export default AgriculturistPage;