import React, { useState, useEffect } from "react";
import { getEnpoints, getApiKey } from "../../service/ApiService";
import { Button } from "react-bootstrap";
import '../../css/core.css'
import Navbar from '../../components/Sidebar/Navbar.js'
import { Link, useParams } from 'react-router-dom';

function Endpoints() {
    const [loading, setLoading] = useState(true);
    const [endpoints, setEndpoints] = useState('');
    const [apiKey, setApiKey] = useState('');

    const { id, name } = useParams();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getEnpoints(id).then(response => {
            console.log(response)
            getApiKey(id).then(r => {
                console.log(r)
                setLoading(false)
                setEndpoints(response)
                setApiKey(r)
            })
        })
    }

    return (
        <div>
            <Navbar id={id} name={name} />
            <div className="main-content">
                <div class="layout-page">
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <h1 class="py-3 mb-4">Endpointler</h1>
                            {loading ? <div className="spinner"></div> :
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tip</th>
                                            <th scope="col">URL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {endpoints.map((e, i) => (
                                            <tr>
                                                <th scope="col">{i + 1}</th>
                                                <td>{e.type}</td>
                                                <td>/{e.url}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>}
                            <Link to={`/projects/${id}/endpoints/create`} className="row">
                                <Button variant="secondary">
                                    Yeni Endpoint
                                </Button>
                            </Link>
                            <div>
                                <br/>
                                <p>İstek Adresi: http://localhost:8080/api/URL?key={apiKey}</p>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Endpoints;