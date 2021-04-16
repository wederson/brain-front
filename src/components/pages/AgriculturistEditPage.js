import React, { Component } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBNotification } from "mdbreact";
import api from "../../services/api";
import "../../index.css";

class AgriculturistEditPage extends Component {
  state = {
    id: 0,
    cpf: "",
    name: "",
    ranch_name: "",
    ranch_city: "",
    ranch_state: "",
    ranch_total_area: 0,
    ranch_total_arable_area: 0,
    ranch_total_vegetation_area: 0,
    ranch_crops_planted: "",
    valided: false,
  };

  componentDidMount() {
    this.loadAgriculturist();
  }

  loadAgriculturist = async (match) => {
    try {
      const {
        match: { params },
      } = this.props;
      const response = await api.get(`/agriculturists/${params.id}`);
      this.setState({ ...response.data });
    } catch (err) {
      console.log(err);
    }
  };

  submitHandler = async (event) => {
    event.preventDefault();
    try {
      var inputVegetation = document.querySelector(
        "#ranch_total_vegetation_area"
      );
      var inputArable = document.querySelector("#ranch_total_arable_area");
      var inputTotal = document.querySelector("#ranch_total_area");

      if (this.state.valided) this.setState({ valided: false });

      if (!event.target.className.includes("was-validated"))
        event.target.className += " was-validated";

      if (
        parseInt(this.state.ranch_total_arable_area) +
          parseInt(this.state.ranch_total_vegetation_area) >
        this.state.ranch_total_area
      ) {
        inputVegetation.classList.add("invalid");
        inputArable.classList.add("invalid");
        inputTotal.classList.add("invalid");
      } else {
        await api.put(`/agriculturists/${this.state.id}`, this.state);
        this.setState({ valided: true });

        inputVegetation.classList.remove("invalid");
        inputArable.classList.remove("invalid");
        inputTotal.classList.remove("invalid");
        event.target.classList.remove("was-validated");
      }
    } catch (err) {
      this.setState({ error: "Ocorreu algum erro" });
    }
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.valided && (
          <MDBNotification
            show
            fade
            icon="envelope"
            iconClassName="green-text"
            title="Notificação"
            message="Agricultor atualizado com Sucesso!!!"
            text="fechar"
          />
        )}
        <form className="needs-validation" onSubmit={this.submitHandler}>
          <MDBRow>
            <MDBCol md="4">
              <MDBInput
                value={this.state.cpf}
                name="cpf"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                label="CPF do produtor"
                required
              >
                <div className="valid-feedback">Validado</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md="6">
              <MDBInput
                value={this.state.name}
                name="name"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                label="Nome do produtor"
                required
              >
                <div className="valid-feedback">Validado</div>
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4">
              <MDBInput
                value={this.state.ranch_name}
                name="ranch_name"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                label="Nome da fazenda"
                required
              >
                <div className="valid-feedback">Validado</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={this.state.ranch_city}
                name="ranch_city"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                label="Cidade da Fazenda"
                required
              >
                <div className="valid-feedback">Validado</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={this.state.ranch_state}
                name="ranch_state"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                label="Estado da Fazenda"
                required
              >
                <div className="valid-feedback">Validado</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                value={this.state.ranch_total_area}
                name="ranch_total_area"
                onChange={this.changeHandler}
                type="number"
                id="ranch_total_area"
                label="Área total da Fazenda"
                required
              >
                <div className="valid-feedback">Validado</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                value={this.state.ranch_total_arable_area}
                name="ranch_total_arable_area"
                onChange={this.changeHandler}
                type="number"
                id="ranch_total_arable_area"
                label="Área agricultável da Fazenda"
                required
              >
                <div className="valid-feedback">Validado</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                value={this.state.ranch_total_vegetation_area}
                name="ranch_total_vegetation_area"
                onChange={this.changeHandler}
                type="number"
                id="ranch_total_vegetation_area"
                label="Área de vegetação da Fazenda"
                required
              >
                <div className="valid-feedback">Validado</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                value={this.state.ranch_crops_planted}
                name="ranch_crops_planted"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                label="Culturas plantadas"
                required
              >
                <div className="valid-feedback">Validado</div>
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBBtn color="success" type="submit">
            Submit Form
          </MDBBtn>
        </form>
      </React.Fragment>
    );
  }
}

export default AgriculturistEditPage;
