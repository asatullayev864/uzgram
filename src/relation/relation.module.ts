import { Module } from '@nestjs/common';
import { RelationService } from './relation.service';
import { RelationController } from './relation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Relation, RelationSchema } from './schema/relation.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Relation.name,
        schema: RelationSchema
      }
    ]),
    UsersModule,
  ],
  controllers: [RelationController],
  providers: [RelationService],
})
export class RelationModule { }
