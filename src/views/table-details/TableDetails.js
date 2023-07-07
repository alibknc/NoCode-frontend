import React, { useState, useEffect } from "react";
import { getTable } from "../../service/ApiService";
import '../../css/core.css'
import Navbar from '../../components/Sidebar/Navbar.js'
import { useParams } from 'react-router-dom';

function TableDetails() {
    const [loading, setLoading] = useState(true);
    const [table, setTable] = useState('');

    const { id, name } = useParams();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getTable(id, name).then(response => {
            console.log(response)
            setLoading(false)
            setTable(response)
        })
    }

    return (
        <div>
            <Navbar id={id} name={name} />
            <div className="main-content">
                <div class="layout-page">
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <h1 class="py-3 mb-4">{table.projectTitle} / {name}</h1>
                            {loading ? <div className="spinner"></div> :
                                <table class="table">
                                    <thead>
                                        <tr>
                                            {table.columns.map((t, i) => (
                                                <th scope="col">{t['columnName']}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table.data.map((data) => (
                                            <tr>
                                                {table.columns.map((t, i) => (
                                                    <td>{data[t['columnName']]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>}
                        </div >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableDetails;