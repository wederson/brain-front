import React, { Component } from "react";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdbreact";
import { Link } from "react-router-dom";

import api from "../../services/api";

class AgriculturistPage extends Component {
  state = {
    agriculturists: [],
  };

  componentDidMount() {
    this.loadAgriculturists();
  }

  loadAgriculturists = async () => {
    try {
      const response = await api.get("/agriculturists");
      this.setState({ agriculturists: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  deleteHandler = async (e) => {
    try {
      let id = e.target.parentNode.getAttribute("data-id");
      await api.delete(`/agriculturists/${id}`);
      this.loadAgriculturists();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { agriculturists } = this.state;
    return (
      <React.Fragment>
        {agriculturists.length === 0 && (
          <MDBRow>
            <MDBCol lg="12">
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>
                  OPS! Não encontramos nenhum agricultor em nossos sistemas.
                </strong>
              </h3>
              <Link to={{ pathname: "/agricultores/cadastro" }}>
                <MDBBtn color="success" size="lg" className="waves-light ">
                  Realize o cadastro do primeiro Agricultor
                </MDBBtn>
              </Link>
            </MDBCol>
          </MDBRow>
        )}
        {agriculturists.length > 0 && (
          <MDBContainer>
          <MDBRow end>
            <MDBCol size="4">
              <Link to={{ pathname: "/agricultores/cadastro" }}>
                <MDBBtn color="success" size="md" className="waves-light right">
                  Cadastrar
                </MDBBtn>
              </Link>
            </MDBCol>
          </MDBRow>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>ID</th>
                <th>CPF | CNPJ</th>
                <th>Nome do Produtos</th>
                <th>Nome da Fazenda</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Área total (ha)</th>
                <th>Ação</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {agriculturists.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>#{value.id}</td>
                    <td>{value.cpf}</td>
                    <td>{value.name}</td>
                    <td>{value.ranch_name}</td>
                    <td>{value.ranch_city}</td>
                    <td>{value.ranch_state}</td>
                    <td>{value.ranch_total_area}</td>
                    <td>
                      <Link to={{ pathname: `/agricultores/${value.id}` }}>
                        <MDBIcon icon="user-edit" />
                      </Link>
                      <MDBIcon icon="trash-alt" 
                        onClick={this.deleteHandler} 
                        data-id={value.id} />
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
          </MDBContainer>
        )}
      </React.Fragment>
    );
  }
}

export default AgriculturistPage;
