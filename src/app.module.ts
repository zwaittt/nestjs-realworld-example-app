import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import defaultConfig from 'src/config/default';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [defaultConfig],
      isGlobal: true,
    }),
    ArticleModule,
    UserModule,
    ProfileModule,
    TagModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class ApplicationModule {}
