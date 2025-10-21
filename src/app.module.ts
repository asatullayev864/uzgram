import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { RelationModule } from './relation/relation.module';
import { GroupModule } from './group/group.module';
import { EventModule } from './event/event.module';
import { EventGuestsModule } from './event_guests/event_guests.module';
import { InvitationModule } from './invitation/invitation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    UsersModule,
    AdminModule,
    AuthModule,
    RegionModule,
    DistrictModule,
    RelationModule,
    GroupModule,
    EventModule,
    EventGuestsModule,
    InvitationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
