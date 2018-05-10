import React, { Component } from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Divider,
  Card,
  Image
} from "semantic-ui-react";
import axios from "axios";

export default class App extends Component {
  state = {
    data_api: [],
    api_nim: "",
    api_nama: "",
    api_alamat: ""
  };

  refresh = () => {
    axios
      .get("http://localhost:8080/api")
      .then(respon => {
        this.setState({ data_api: respon.data });
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.refresh();
  }

  tambah = () => {
    axios
      .post("http://localhost:8080/api", {
        nim: this.state.api_nim,
        nama: this.state.api_nama,
        alamat: this.state.api_alamat
      })
      .then(respon => {
        this.refresh();
      })
      .catch(err => {});

    this.state.api_nim = "";
    this.state.api_nama = "";
    this.state.api_alamat = "";
  };

  handleChangeNim = event => {
    this.setState({
      api_nim: event.target.value
    });
  };
  handleChangeNama = event => {
    this.setState({
      api_nama: event.target.value
    });
  };
  handleChangeAlamat = event => {
    this.setState({
      api_alamat: event.target.value
    });
  };

  render() {
    return (
      <div>
        <FormExampleFieldControlId
          api_nim={this.state.api_nim}
          api_nama={this.state.api_nama}
          api_alamat={this.state.api_alamat}
          handleChangeNim={this.handleChangeNim}
          handleChangeNama={this.handleChangeNama}
          handleChangeAlamat={this.handleChangeAlamat}
          tambah={this.tambah}
        />
        <Divider horizontal>D A T A - D E T A I L</Divider>
        <CardExampleGroups data_siswa={this.state.data_api} />
      </div>
    );
  }
}

const FormExampleFieldControlId = props => (
  <Form>
    <Form.Group widths="equal">
      <Form.Input
        id="form-input-control-first-name"
        control={Input}
        label="NIM"
        placeholder="NIM"
        value={props.api_nim}
        onChange={props.handleChangeNim}
      />

      <Form.Field
        id="form-input-control-last-name"
        control={Input}
        label="NAMA"
        placeholder="Nama"
        value={props.api_nama}
        onChange={props.handleChangeNama}
      />
    </Form.Group>
    <Form.Field
      id="form-textarea-control-opinion"
      control={TextArea}
      label="ALAMAT"
      placeholder="Alamat"
      value={props.api_alamat}
      onChange={props.handleChangeAlamat}
    />

    <Form.Field
      id="form-button-control-public"
      control={Button}
      content="Confirm"
      label="Label with htmlFor"
      onClick={props.tambah}
    />
  </Form>
);

const CardExampleGroups = props => (
  <Card.Group centered={true} itemsPerRow={4}>
    {props.data_siswa.map(detail => (
      // return (
      <Card>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg"
          />
          <Card.Header> {detail.nama} </Card.Header>
          <Card.Meta>{detail.nim} </Card.Meta>
          <Card.Description>
            Alamat : <strong>{detail.alamat} </strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Approve
            </Button>
            <Button basic color="red">
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
      // );
    ))}
  </Card.Group>
);
