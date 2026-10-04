import { Module } from '@nestjs/common';

import { WeatherController } from './weather.controller.js';
import { WeatherProviderService } from './weather.service.js';

@Module({
  controllers: [WeatherController],
  providers: [WeatherProviderService],
  exports: [WeatherProviderService],
})
export class WeatherModule {}
