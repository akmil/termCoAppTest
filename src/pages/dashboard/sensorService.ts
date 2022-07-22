import { apiConfig } from '../../shared/apiConfig';
import { network } from '../../shared/networkHelper';
import { SensorItemContract } from '../../shared/types';

export const sensorService = () => {
  // GET /api/v1/sensors/ Get all sensors
  // POST /api/v1/sensors/ Creates a sensor
  // GET /api/v1/sensors/{sensor_id} Get {senor_id} sensor data
  // PUT /api/v1/sensors/{sensor_id} Replaces {senor_id} sensor data
  // PATCH /api/v1/sensors/{sensor_id} Partially updates {senor_id} sensor data
  // DELETE /api/v1/sensors/{sensor_id} Deletes the {senor_id} sensor

  const curl = network();

  const apiUrls = {
    GET_ALL: `${apiConfig}/api/v1/sensors/`,
    POST_CREATE: `${apiConfig}/api/v1/sensors/`,
    GET_BY_ID: (id: string) => `${apiConfig}/api/v1/sensors/${id}`,
    PUT_REPLACE_BY_ID: (id: string) => `${apiConfig}/api/v1/sensors/${id}`,
    PATCH_UPDATE_BY_ID: (id: string) => `${apiConfig}/api/v1/sensors/${id}`,
    DELETE_BY_ID: (id: string) => `${apiConfig}/api/v1/sensors/${id}`,
  };

  const getAll = () => curl.get(apiUrls.GET_ALL);

  const create = (data: SensorItemContract) => curl.post(
    apiUrls.POST_CREATE, { data: JSON.stringify(data) },
  );

  const getById = (id: string) => curl.get(apiUrls.GET_BY_ID(id));

  const replaceById = (id: string) => curl.put(apiUrls.PUT_REPLACE_BY_ID(id));

  const updateById = (data: SensorItemContract) => curl.patch(
    apiUrls.PATCH_UPDATE_BY_ID(`${data.id}`), { data: JSON.stringify(data) },
  );

  const deleteById = (id: string) => curl.deletee(apiUrls.DELETE_BY_ID(id));

  return {
    getAll,
    create,
    getById,
    replaceById,
    updateById,
    deleteById,
  };
};
