import { Button, Modal } from "react-bootstrap";
import React, { Component } from "react";
import { getAllEmployees } from "../../service/ApiService";

class SelectEmployeeModal extends Component {
    constructor(props) {
        super()
        this.state = { loading: true, data: [] }
    }

    componentDidMount() {
        getAllEmployees().then(response => {
            console.log(response)
            this.setState({ data: response, loading: false })
        })
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Çalışan Seçiniz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.loading ? <div className="spinner"></div> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Adı</th>
                                    <th scope="col">Soyadı</th>
                                    <th scope="col">Doğum Tarihi</th>
                                    <th scope="col">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((item, index) => {
                                    return (<tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item['name']}</td>
                                        <td>{item['surname']}</td>
                                        <td>{item['birth-date']}</td>
                                        <td>
                                            <div className="btn btn-primary" onClick={() => this.props.handleSelect(item)}>Seç</div>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Vazgeç
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default SelectEmployeeModal;