import { Module } from '@nestjs/common';

import { WeatherController } from './weather.controller';
import { WeatherProviderService } from './weather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherProviderService],
  exports: [WeatherProviderService],
})
export class WeatherModule {}
