import _ from 'lodash';
import { get } from "./fetcher";
import { transformEmployee } from "./dataTransformer";

export const getEmployeeById = id =>
    new Promise(async resolve => {
        const employee = await fetchEmployeeById(id);

        if (!employee) return;

        const reports = _.map(employee.reports, fetchReports);

        Promise.all(reports)
            .then(transformEmployee(employee))
            .then(resolve);
    });

const fetchReports = async reportId => await getEmployeeById(reportId);

const fetchEmployeeById = id => get(`/employee/${id}`)
    .then(parseJson(id))
    .catch(console.error);

const parseJson = employeeId => response => {
    if(_.isEmpty(response))
        return Promise.reject(`Employee with id ${employeeId} not found`);

    try {
        return JSON.parse(response);
    } catch (e) {
        return Promise.reject(`Failed to parse response from the server for id ${employeeId}`);
    }
};