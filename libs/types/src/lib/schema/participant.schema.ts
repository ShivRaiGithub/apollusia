import {Ref, RefArray} from '@mean-stream/nestx';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator';
import {Types} from 'mongoose';

import {PollEvent} from './poll-event.schema';
import {Poll} from './poll.schema';

@Schema()
export class Participant {
    @ApiProperty()
    _id: Types.ObjectId;

    @Ref(Poll.name, {index: 1})
    poll: Types.ObjectId;

    @Prop({required: true})
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @RefArray(PollEvent.name)
    participation: Types.ObjectId[];

    @RefArray(PollEvent.name)
    indeterminateParticipation: Types.ObjectId[];

    @Prop({required: true, index: 1})
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string;

    @Prop()
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    mail?: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
