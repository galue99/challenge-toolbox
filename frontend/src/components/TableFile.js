import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Alert } from 'react-bootstrap';
import { debounce } from 'lodash';
import { fetchFiles } from '../redux/actions/filesActions';
import Loading from "./Loading";
import FileFilter from "./FileFilter";

const TableFile = () => {
  const dispatch = useDispatch();
  const { files, loading, error } = useSelector(state => state.files);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const debouncedFetchFiles = debounce((filter) => {
      dispatch(fetchFiles(filter));
    }, 500);

    debouncedFetchFiles(filter);

    return () => {
      debouncedFetchFiles.cancel();
    };
  }, [filter, dispatch]);

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!Array.isArray(files)) {
    return null;
  }

  return (
    <div>
      <FileFilter filter={filter} setFilter={setFilter} />
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
        </thead>
        <tbody>
        {files.map((file) =>
          file.lines.map((line, index) => (
            <tr key={`${file.file}-${index}`}>
              <td>{file.file}</td>
              <td>{line.text}</td>
              <td>{line.number}</td>
              <td>{line.hex}</td>
            </tr>
          ))
        )}
        </tbody>
      </Table>
    </div>
  );
}

export default TableFile;
