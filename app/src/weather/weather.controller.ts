import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';

import type { DashboardRequestBody, LocationSource } from './weather.models';
import { WeatherProviderService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherProviderService) {}

  @Get('status')
  getStatus() {
    return {
      configured: this.weatherService.apiKeyConfigured,
      providerName: this.weatherService.providerName,
    };
  }

  @Get('search')
  async searchLocations(@Query('query') query: string) {
    if (typeof query !== 'string' || !query.trim()) {
      throw new BadRequestException('A search query is required.');
    }

    return this.weatherService.searchLocations(query);
  }

  @Get('reverse')
  async reverseGeocode(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('source') source?: string,
  ) {
    return this.weatherService.reverseGeocode(
      this.parseCoordinate(lat, 'lat'),
      this.parseCoordinate(lon, 'lon'),
      this.parseSource(source),
    );
  }

  @Post('dashboard')
  async getDashboard(@Body() body: DashboardRequestBody) {
    return this.weatherService.getDashboard(body);
  }

  private parseCoordinate(value: string, name: string): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      throw new BadRequestException(`A valid ${name} query parameter is required.`);
    }

    return parsed;
  }

  private parseSource(source?: string): LocationSource {
    if (!source) {
      return 'search';
    }

    const validSources: LocationSource[] = ['search', 'favorite', 'recent', 'geolocation', 'map'];
    if (validSources.includes(source as LocationSource)) {
      return source as LocationSource;
    }

    throw new BadRequestException('The source query parameter is invalid.');
  }
}
