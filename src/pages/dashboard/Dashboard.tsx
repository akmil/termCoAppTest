import React, { useEffect, useState } from 'react';
import { SensorItemContract } from '../../shared/types';
import { sensorService } from './sensorService';
import { Table } from './sensors/Table';

export function Dashboard() {
  const [state, setState] = useState([] as SensorItemContract[]);

  const initialTableData = () => sensorService().getAll().then((res: SensorItemContract[]) => {
    setState(res);
  });

  useEffect(() => {
    if (state.length === 0) initialTableData();
  }, []);

  return (
    <div className="dashboard">
      Dashboard
      {state.length > 0 && <Table data={state} initialTableData={initialTableData} />}
    </div>
  );
}
