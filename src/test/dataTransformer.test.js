import { transformEmployee } from "../main/js/dataTransformer";

it('transforms employee', () => {
    const employee = {
        id: 123,
        name: 'Name',
        reports: [1,2,3]
    };

    const expectedResult = {
        'Name': {
            id: 123,
            reports: [1,2,3]
        }
    };
    const actualResult = transformEmployee(employee);

    expect(actualResult).toEqual(expectedResult);
});
