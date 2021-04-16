import React, { Component } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBRow,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBBtn,
} from "mdbreact";
import { Bar, Pie } from "react-chartjs-2";

import api from "../../../services/api";
import { Link } from "react-router-dom";

class ChartSection extends Component {
  state = {
    agriculturists: [],
    dataPi: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          data: [300, 50, 100, 40, 120, 24, 52],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360",
            "#ac64ad",
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#da92db",
          ],
        },
      ],
    },
    dataArea: {
      labels: ["Agriculturável", "Vegetação"],
      datasets: [
        {
          data: [0, 0],
          backgroundColor: ["#4D5360", "#ac64ad"],
          hoverBackgroundColor: ["#616774", "#da92db"],
        },
      ],
    },
    totalArea: 0,
  };

  componentDidMount() {
    this.loadTotalByCity();
    this.loadAgriculturist();
  }

  loadTotalByCity = async () => {
    try {
      const response = await api.get("/totalporcidade");
      let labels = [];
      let totals = [];
      response.data.map((item) => {
        labels.push(item.ranch_city);
        totals.push(item.count_ranch_city);
      });
      this.setState((prevState) => ({
        agriculturists: [...prevState.agriculturists],
        dataPi: {
          labels: labels,
          datasets: [
            {
              data: totals,
              backgroundColor: prevState.dataPi.datasets[0].backgroundColor,
              hoverBackgroundColor:
                prevState.dataPi.datasets[0].hoverBackgroundColor,
            },
          ],
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  loadAgriculturist = async () => {
    try {
      const response = await api.get("/agriculturists");

      response.data.map((item) => {
        this.setState({
          totalArea:
            parseInt(this.state.totalArea) + parseInt(item.ranch_total_area),
        });
        this.setState((prevState) => ({
          agriculturists: [...prevState.agriculturists],
          dataPi: prevState.dataPi,
          dataArea: {
            labels: ["Agriculturável", "Vegetação"],
            datasets: [
              {
                data: [
                  prevState.dataArea.datasets[0].data[0] +
                    item.ranch_total_arable_area,
                  prevState.dataArea.datasets[0].data[1] +
                    item.ranch_total_vegetation_area,
                ],
                backgroundColor: prevState.dataArea.datasets[0].backgroundColor,
                hoverBackgroundColor:
                  prevState.dataArea.datasets[0].hoverBackgroundColor,
              },
            ],
          },
          totalArea: prevState.totalArea,
        }));
      });
      this.setState({ agriculturists: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const dataPie = this.state.dataPi;
    const dataArea = this.state.dataArea;
    const agriculturists = this.state.agriculturists;
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
          <div>
            <MDBRow className="mb-4">
              <MDBCol md="4" className="mb-4">
                <MDBCard className="mb-4">
                  <MDBCardHeader>Dados Gerais</MDBCardHeader>
                  <MDBCardBody>
                    <MDBListGroup className="list-group-flush">
                      <MDBListGroupItem>
                        Total de Fazendas
                        <MDBBadge
                          color="primary-color"
                          pill
                          className="float-right"
                        >
                          {agriculturists.length}
                        </MDBBadge>
                      </MDBListGroupItem>
                      <MDBListGroupItem>
                        Área total em Hectares
                        <MDBBadge
                          color="primary-color"
                          pill
                          className="float-right"
                        >
                          {this.state.totalArea}
                        </MDBBadge>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-4">
              <MDBCol md="4" className="mb-4">
                <MDBCard className="mb-4">
                  <MDBCardHeader>Agricultores x Estados</MDBCardHeader>
                  <MDBCardBody>
                    <Pie
                      data={dataPie}
                      height={300}
                      options={{ responsive: true }}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4" className="mb-4">
                <MDBCard className="mb-4">
                  <MDBCardHeader>Hectares x Tipo de Terreno</MDBCardHeader>
                  <MDBCardBody>
                    <Pie
                      data={dataArea}
                      height={300}
                      options={{ responsive: true }}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ChartSection;
