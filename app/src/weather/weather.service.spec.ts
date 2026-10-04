import { WeatherProviderService } from './weather.service.js';

describe('WeatherProviderService', () => {
  const originalFetch = global.fetch;
  const originalApiKey = process.env['GOOGLE_WEATHER_API_KEY'];

  beforeEach(() => {
    process.env['GOOGLE_WEATHER_API_KEY'] = 'test-api-key';
  });

  afterEach(() => {
    global.fetch = originalFetch;

    if (typeof originalApiKey === 'string') {
      process.env['GOOGLE_WEATHER_API_KEY'] = originalApiKey;
      return;
    }

    delete process.env['GOOGLE_WEATHER_API_KEY'];
  });

  it('returns an empty result set when the geocoder omits results for a text search', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue('{}'),
    } as Response);

    const service = new WeatherProviderService();

    await expect(service.searchLocations('Milan')).resolves.toEqual([]);
  });

  it('returns the coordinate fallback when reverse geocoding omits results', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue('{}'),
    } as Response);

    const service = new WeatherProviderService();

    await expect(service.reverseGeocode(45.4642, 9.19, 'search')).resolves.toEqual([
      {
        id: '45.464:9.190',
        name: 'Coordinates',
        country: 'Custom',
        lat: 45.4642,
        lon: 9.19,
        label: '45.464, 9.190',
        source: 'search',
      },
    ]);
  });

  it('keeps airport searches working when the airport-specific response omits results', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            results: [
              {
                placeId: 'mxp',
                location: {
                  latitude: 45.63,
                  longitude: 8.723,
                },
                formattedAddress: 'Milan, Italy',
                addressComponents: [
                  {
                    longText: 'Milan',
                    types: ['locality'],
                  },
                  {
                    longText: 'Italy',
                    types: ['country'],
                  },
                ],
              },
            ],
          }),
        ),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValue('{}'),
      } as Response);

    const service = new WeatherProviderService();

    await expect(service.searchLocations('MXP')).resolves.toEqual([
      {
        id: '45.630:8.723',
        name: 'Milan',
        state: undefined,
        country: 'Italy',
        lat: 45.63,
        lon: 8.723,
        label: 'Milan, Italy',
        source: 'search',
      },
    ]);
  });
});
