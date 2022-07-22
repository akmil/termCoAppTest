import React from 'react';
import { Link } from 'react-router-dom';
import { SensorItemContract } from '../../../shared/types';
import { sensorService } from '../sensorService';

function Table({ data, initialTableData }:
  {data: SensorItemContract[], initialTableData: () => void}) {
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      sensorService().deleteById(id).then((res: SensorItemContract[]) => {
        initialTableData();
      });
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">description</th>
            <th scope="col">samplingPeriod</th>
            <th scope="col">isActive</th>
            <th scope="col">
              <Link to="/create">
                <button type="button" className="btn btn-primary btn-sm">+</button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          { data?.map((item: SensorItemContract) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.description}</td>
              <td>{item.samplingPeriod}</td>
              <td>{item.isActive ? 'yes' : 'no'}</td>
              <td>
                <Link to={`/edit/${item.id}`}>
                  <button type="button" className="btn btn-primary btn-sm">Edit</button>
                </Link>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => handleDelete(`${item.id}`)}>delete</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}

export { Table };
