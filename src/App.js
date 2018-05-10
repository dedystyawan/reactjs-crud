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
  state = { data_api: [] };

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

  render() {
    return (
      <div>
        <FormExampleFieldControlId />
        <Divider horizontal> D A T A - D E T A I L </Divider>
        <CardExampleGroups data_siswa={this.state.data_api} />
      </div>
    );
  }
}

const FormExampleFieldControlId = props => (
  <Form>
    <Form.Group widths="equal">
      <Form.Field
        id="form-input-control-first-name"
        control={Input}
        label="NIM"
        placeholder="NIM"
      />
      <Form.Field
        id="form-input-control-last-name"
        control={Input}
        label="Nama"
        placeholder="Nama"
      />
    </Form.Group>
    <Form.Field
      id="form-textarea-control-opinion"
      control={TextArea}
      label="Alamat"
      placeholder="Alamat"
    />
    <Form.Field
      id="form-button-control-public"
      control={Button}
      content="Simpan"
      label=""
    />
  </Form>
);

const CardExampleGroups = props => (
  <Card.Group centered={true} itemsPerRow={5}>
    {props.data_siswa.map(detail => {
      return (
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
      );
    })}
  </Card.Group>
);
