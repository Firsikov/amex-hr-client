import _ from 'lodash';
import { get } from "./fetcher";
import { transformEmployee } from "./dataTransformer";

export const getEmployeeById = id => new Promise(
    async resolve => {
        const employee = await fetchEmployeeById(id);

        const reports = _.map(employee.reports, getEmployeeById);

        Promise.all(reports)
            .then(transformEmployee(employee))
            .then(resolve);
    });

const fetchEmployeeById = id => get(`/employee/${id}`)
    .then(parseResponse(id))
    .catch(console.error);

const parseResponse = employeeId => response => {
    if(_.isEmpty(response))
        return Promise.reject(`Employee with id ${employeeId} not found`);

    try {
        return JSON.parse(response);
    } catch (e) {
        return Promise.reject(`Failed to parse response from the server for id ${employeeId}`);
    }
};