import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from './schema/invitation.schema';
import { UsersModule } from '../users/users.module';
import { Event, EventSchema } from '../event/schema/event.schema';
import { Users, UserSchema } from '../users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Invitation.name,
        schema: InvitationSchema
      },
      {
        name: Event.name,
        schema: EventSchema
      },
      {
        name: Users.name,
        schema: UserSchema
      },

    ]),
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
