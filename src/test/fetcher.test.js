import { get } from "../main/js/fetcher";

describe('Fetcher', () => {
    afterEach(() => {
        global.fetch.mockClear();
    });

    it('receives successful response when sends GET request', async () => {
        const mockFetchPromise = () => Promise.resolve({ ok: true, text: () => 'sample response' });
        jest.spyOn(global, 'fetch').mockImplementation(mockFetchPromise);

        const response = await get('/employee');

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(response).toEqual('sample response');
    });

    it('receives failed response when sends GET request', async () => {
        const mockFetchPromise = () => Promise.resolve({ ok: false, status: 404 });
        jest.spyOn(global, 'fetch').mockImplementation(mockFetchPromise);

        const response = get('/employee');

        expect(response).rejects.toEqual("Failed to fetch data from the server: Error code 404");
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});