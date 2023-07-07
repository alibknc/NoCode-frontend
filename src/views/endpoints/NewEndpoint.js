import React, { useEffect, useRef, useState } from 'react';
import { Form, FormSelect } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import $ from "jquery";
import Navbar from '../../components/Sidebar/Navbar.js'
import authReducer from "../../reducers/authReducer";
import { getProjectContent, createEndpoint } from "../../service/ApiService";
import "jQuery-QueryBuilder/dist/js/query-builder.standalone.min.js";
import "jQuery-QueryBuilder/dist/css/query-builder.default.min.css";

const defaultRules = {
    condition: 'AND',
    rules: [{
        id: 'id',
        operator: 'equal',
        value: "10.25"
    }]
};

function initializeQueryBuilder(element, content, newRules) {
    const plugins = [
        'unique-filter',
        'bt-checkbox',
        'invert',
        'not-group'
    ];

    const filters = []

    content.map(c => {
        const filter = {}
        filter.id = c.columnName
        filter.label = c.columnName
        filter.type = c.dataType === "character varying" ? "string" : c.dataType
        filters.push(filter)
    })

    const rules = newRules ? newRules : defaultRules;
    $(element).queryBuilder({ plugins, filters, rules });
}

const NewEndpoint = () => {
    const queryBuilderRef = useRef(null);
    const formRef = useRef(null);

    const [rules, setRules] = useState({});

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);

    const [selectedTable, setSelectedTable] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [endpointName, setEndpointName] = useState("");

    const [showTypes, setShowTypes] = useState(false);
    const [showName, setShowName] = useState(false);

    const [types, setTypes] = useState(['GET', 'POST']);

    const { id, name } = useParams();

    useEffect(() => {
        const user = authReducer.getUser()
        setUser(user);
        getData();
    }, []);

    const getData = () => {
        getProjectContent(id).then(response => {
            console.log(response)
            setLoading(false)
            setData(response)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formRef.current.checkValidity()) {
            if (selectedType === 'GET') {
                const rules = $(queryBuilderRef.current).queryBuilder('getRules');
                setRules(rules);
                createEndpoint(selectedTable, selectedType, JSON.stringify(rules), endpointName, id, user.id)
            } else {
                createEndpoint(selectedTable, selectedType, null, endpointName, id, user.id)
            }
            window.location.href = `/projects/${id}/endpoints`;
        }
    }

    const setTable = (e) => {
        setSelectedTable(e.target.value)

        if (e.target.value === "") {
            setShowTypes(false)
            setShowName(false)
            setSelectedType("")
            setEndpointName("")
            hideQueryBuilder()
        } else {
            setShowTypes(true)
        }
    };

    const setType = (e) => {
        setSelectedType(e.target.value)

        if (e.target.value !== "")
            setShowName(true)
        else
            setShowName(false)

        if (e.target.value === "GET") {
            showQueryBuilder()
        } else
            hideQueryBuilder();
    };

    const showQueryBuilder = () => {
        const element = queryBuilderRef.current;
        initializeQueryBuilder(element, data.tables.find(t => t.tableName === selectedTable).columns);
    }

    const hideQueryBuilder = () => {
        const element = queryBuilderRef.current;
        $(element).queryBuilder('destroy');
    }

    const setName = (e) => {
        setEndpointName(e.target.value)
    };

    return (
        <div>
            <Navbar id={id} name={name} />
            <div className="main-content">
                <div class="layout-page">
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <h1 class="py-3 mb-4">Yeni Endpoint</h1>
                            {loading ? <div className="spinner"></div> : <div>
                                <Form ref={formRef} onSubmit={handleSubmit}>
                                    <Form.Group className="col">
                                        <Form.Label htmlFor="inputName">Tablo</Form.Label>
                                        <FormSelect
                                            name="tableName"
                                            className="drop-btn"
                                            onChange={(event) => setTable(event)}
                                            value={selectedTable}
                                            required
                                        >
                                            <option value="" className="drop-menu">
                                                Tablo Seçiniz
                                            </option>
                                            {data.tables.map((t, id) => (
                                                <option key={id} value={t.tableName}>
                                                    {t.tableName}
                                                </option>
                                            ))}
                                        </FormSelect>
                                        <br />
                                        {!showTypes ? <div></div> : <div>
                                            <Form.Label htmlFor="inputName">Sorgu Tipi</Form.Label>
                                            <FormSelect
                                                name="dataType"
                                                className="drop-btn"
                                                onChange={(event) => setType(event)}
                                                value={selectedType}
                                                required
                                            >
                                                <option value="" className="drop-menu">
                                                    Sorgu Tipi Seçiniz
                                                </option>
                                                {types.map((t, id) => (
                                                    <option key={id} value={t}>
                                                        {t}
                                                    </option>
                                                ))}
                                            </FormSelect>
                                        </div>}
                                        <br />
                                        {!showName ? <div></div> : <div>
                                            <Form.Label htmlFor="inputName">Endpoint</Form.Label>
                                            <Form.Control type="text" id="inputName" onChange={(event) => setName(event)} required />
                                        </div>}
                                        <br />
                                        <div id='query-builder' ref={queryBuilderRef} />
                                        <br />
                                        {!showName ? <div></div> :
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <button type='submit' className='btn btn-success'>Kaydet</button>
                                                </div>
                                            </div>}
                                    </Form.Group>
                                </Form>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewEndpoint;
