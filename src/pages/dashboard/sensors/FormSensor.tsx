import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { SensorItemContract } from '../../../shared/types';
import { sensorService } from '../sensorService';

interface Props {
  formData: SensorItemContract,
}

const FormSensor = ({ formData }: Props) => {
  const [state, setState] = useState({} as SensorItemContract);
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const saveForm = () => {
    if (state.id) {
      sensorService().updateById(state).then((res: SensorItemContract) => {
        history.push('/');
      });
    } else {
      sensorService().create(state).then((res: SensorItemContract) => {
        history.push('/');
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      saveForm();
    } else {
      form.classList.add('was-validated');
    }
  };

  useEffect(() => {
    console.log('fd:', formData);
    setState(formData);
  }, [formData]);

  return (
    <form className="form-website col-sm-6 mx-auto" noValidate onSubmit={handleSubmit}>
      {state?.id && <input type="hidden" name="id" value={state.id} />}

      <div className="mb-3">
        <label htmlFor="description" className="form-label">description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          placeholder="sensor description"
          defaultValue={state?.description || ''}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="samplingPeriod" className="form-label">samplingPeriod</label>
        <input
          type="text"
          className="form-check-input"
          id="samplingPeriod"
          name="samplingPeriod"
          placeholder="sensor samplingPeriod"
          defaultValue={state?.samplingPeriod || ''}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="isActive" className="form-label">isActive</label>
        <input
          type="checkbox"
          className="form-control"
          id="isActive"
          name="isActive"
          placeholder="sensor isActive"
          defaultChecked={state?.isActive || false}
          onChange={handleChange}
        />
      </div>

      <div className="text-center mt-3">
        <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
          <Link to="/">Cancel</Link>
          <button type="submit" className="btn btn-lg btn-primary">Submit</button>
        </div>
      </div>

    </form>

  );
};

export { FormSensor };
