import MockAdapter from 'axios-mock-adapter';
import apiInstance, * as api from '../utils/api.js';

const mock = new MockAdapter(apiInstance);

describe('API utility module', () => {
  afterEach(() => {
    mock.reset();
  });

  it('propagates successful submitApplication responses', async () => {
    const payload = { fullName: 'Test' };
    mock.onPost('/applications').reply(201, { message: 'ok' });

    const response = await api.submitApplication(payload);
    expect(response.status).toBe(201);
    expect(response.data.message).toBe('ok');
  });

  it('throws when API returns an error', async () => {
    mock.onPost('/applications').reply(500, { error: 'Failed' });

    await expect(api.submitApplication({})).rejects.toMatchObject({
      response: { status: 500, data: { error: 'Failed' } },
    });
  });
});
