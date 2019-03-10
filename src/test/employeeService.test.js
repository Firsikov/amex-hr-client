import {getEmployeeById} from "../main/js/employeeService";

describe('Employee service', () => {
    it('fetches data from server when server returns a successful response', async () => {
        const mockServerResponses = {
            "/employee/1": {
                "id": 1,
                "name": "John Smith",
                "title": "CEO",
                "reports": [2]
            },
            "/employee/2": {
                "id": 2,
                "name": "Jane Doe",
                "title": "Manager",
                "reports": []
            }
        };
        const mockFetchPromise = url => Promise.resolve({
            text: () => Promise.resolve(JSON.stringify(mockServerResponses[url])),
            ok: true
        });
        jest.spyOn(global, 'fetch').mockImplementation(mockFetchPromise);

        const expectedResult = {"John Smith": {"id": 1, "reports": [{"Jane Doe":{"id":2,"reports":[]}}]}};
        const actualResult = await getEmployeeById(1);

        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenCalledWith('/employee/1');
        expect(global.fetch).toHaveBeenCalledWith('/employee/2');
        expect(actualResult).toEqual(expectedResult);

        global.fetch.mockClear();
    });
});