import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

const GridComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    },[]);

    const getData = async () => {
        const data = await axios("https://jsonplaceholder.typicode.com/comments");
        setData(data.data);
    }

    const columns = [{
        dataField: 'email',
        text: 'Email'
    }, {
        dataField: 'postId',
        text: 'Post ID',
        sort: true
    }, {
        dataField: 'name',
        text: 'Name'
    }]

    return (
        <div>
            <BootstrapTable
                keyField={'id'}
                data={data}
                columns={columns}
                striped
                hover
                condensed
                pagination={paginationFactory()}
                cellEdit={cellEditFactory({
                    mode: 'click',
                    blurToSave: '',
                    nonEditableRows: () => [1,2,3]
                })}
            />
        </div>
    );
}

export default GridComponent;
