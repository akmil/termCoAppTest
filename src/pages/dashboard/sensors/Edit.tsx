import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SensorItemContract } from '../../../shared/types';
import { sensorService } from '../sensorService';
import { FormSensor } from './FormSensor';

interface ParamTypes {
  id: string;
}

export function Edit() {
  const { id } = useParams<ParamTypes>();
  const [state, setState] = useState({} as SensorItemContract);

  const initialTableData = () => sensorService().getById(id).then((res: SensorItemContract) => {
    setState(res);
  });
  const title = id ? 'Create' : `Edit - id ${id}`;

  useEffect(() => {
    if (id) {
      initialTableData();
    }
  }, [id]);

  console.log('Edit');
  return (
    <div>
      <h3>{title}</h3>
      <FormSensor formData={state} />
    </div>
  );
}
