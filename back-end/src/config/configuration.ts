import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

export const config = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  PassportModule.register({
    property: 'consumer',
  }),
  JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_KEY'),
    }),
    inject: [ConfigService],
  }),
];
