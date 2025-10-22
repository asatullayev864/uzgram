import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schema/chat.schema';
import { Users, UserSchema } from '../users/schema/user.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: Chat.name,
          schema: ChatSchema,
        },
        {
          name: Users.name,
          schema: UserSchema,
        }
      ])
    ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
