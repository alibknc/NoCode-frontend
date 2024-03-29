import React from 'react';
import $ from "jquery";
import "jQuery-QueryBuilder/dist/js/query-builder.standalone.min.js";
import "jQuery-QueryBuilder/dist/css/query-builder.default.min.css";

const defaultRules = {
    condition: 'AND',
    rules: [{
        id: 'price',
        operator: 'less',
        value: 10.25
    }, {
        condition: 'OR',
        rules: [{
            id: 'category',
            operator: 'equal',
            value: 2
        }, {
            id: 'category',
            operator: 'equal',
            value: 1
        }]
    }]
};

function initializeQueryBuilder(element, newRules) {
    const plugins = [
        'unique-filter',
        'bt-checkbox',
        'invert',
        'not-group'
    ];

    const filters = [{
        id: 'name',
        label: 'Name',
        type: 'string'
    }, {
        id: 'category',
        label: 'Category',
        type: 'integer',
        input: 'select',
        values: {
            1: 'Books',
            2: 'Movies',
            3: 'Music',
            4: 'Tools',
            5: 'Goodies',
            6: 'Clothes'
        },
        operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
    }, {
        id: 'in_stock',
        label: 'In stock',
        type: 'integer',
        input: 'radio',
        values: {
            1: 'Yes',
            0: 'No'
        },
        operators: ['equal']
    }, {
        id: 'price',
        label: 'Price',
        type: 'double',
        validation: {
            min: 0,
            step: 0.01
        }
    }, {
        id: 'id',
        label: 'Identifier',
        type: 'string',
        placeholder: '____-____-____',
        operators: ['equal', 'not_equal'],
        validation: {
            format: /^.{4}-.{4}-.{4}$/
        }
    }];

    const rules = newRules ? newRules : defaultRules;
    $(element).queryBuilder({ plugins, filters, rules });
}

class Endpoint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rules: {},
            sql: ""
        };
    }

    componentDidMount() {
        const element = this.refs.queryBuilder;
        initializeQueryBuilder(element);
    }

    componentWillUnmount() {
        $(this.refs.queryBuilder).queryBuilder('destroy');
    }

    shouldComponentUpdate() {
        return false;
    }

    handleGetRulesClick = () => {
        const rules = $(this.refs.queryBuilder).queryBuilder('getRules');
        this.setState({ rules: rules });
        this.forceUpdate();
    }

    handleSetRulesClick = () => {
        const newRules = { ...defaultRules };
        newRules.rules[0].value = newRules.rules[0].value + 10;
        $(this.refs.queryBuilder).queryBuilder('setRules', newRules);
        this.setState({ rules: newRules });
    }

    getSQL = () => {
        const sql = $(this.refs.queryBuilder).queryBuilder('getSQL');
        this.setState({ sql: sql });
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <div id='query-builder' ref='queryBuilder' />
                <div className='row'>
                    <div className='col-md-4'>
                        <button className='btn btn-success' onClick={this.handleGetRulesClick.bind(this)}>GET RULES FROM QUERY BUILDER</button>
                    </div>
                    <div className='col-md-4'>
                        <button className='btn btn-success' onClick={this.handleSetRulesClick.bind(this)}>SET RULES FROM REACT</button>
                    </div>
                    <div className='col-md-4'>
                        <button className='btn btn-success' onClick={this.getSQL.bind(this)}>GET SQL</button>
                    </div>
                </div>
                <pre>
                    SQL:
                    {JSON.stringify(this.state.sql, undefined, 2)}
                </pre>
                <pre>
                    Component state:
                    {JSON.stringify(this.state.rules, undefined, 2)}
                </pre>
            </div>
        );
    }
}

export default Endpoint;
