import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';

import {PollService} from './poll.service';
import {MailDto, ParticipantDto, PollDto, PollEventDto} from '../../dto';
import {Participant, PollEvent} from '../../schema';
import {ReadPollDto, ReadStatsPollDto} from '../../dto/read-poll.dto';

@Controller('poll')
export class PollController {
    constructor(private readonly pollService: PollService) {
    }

    @Get('all/:token')
    async getPolls(@Param('token') token: string): Promise<ReadStatsPollDto[]> {
        if (!token) {
            return [];
        }

        return this.pollService.getPolls(token);
    }

    @Get(':id/admin/:token')
    async isAdmin(@Param('id') id: string, @Param('token') token: string): Promise<boolean> {
        return this.pollService.isAdmin(id, token);
    }

    @Get(':id')
    async getPoll(@Param('id') id: string): Promise<ReadPollDto> {
        return this.pollService.getPoll(id);
    }

    @Post()
    async postPoll(@Body() pollDto: PollDto): Promise<ReadPollDto> {
        return this.pollService.postPoll(pollDto);
    }

    @Put(':id')
    async putPoll(@Param('id') id: string, @Body() pollDto: PollDto): Promise<ReadPollDto> {
        return this.pollService.putPoll(id, pollDto);
    }

    @Post(':id/clone')
    async clonePoll(@Param('id') id: string): Promise<ReadPollDto> {
        const poll = await this.pollService.getPoll(id);
        if (!poll) {
            throw new NotFoundException(id);
        }

        return this.pollService.clonePoll(id);
    }

    @Delete(':id')
    async deletePoll(@Param('id') id: string): Promise<ReadPollDto | undefined> {
        const poll = await this.pollService.deletePoll(id);
        if (!poll) {
            throw new NotFoundException(id);
        }

        return poll;
    }

    @Get(':id/events')
    async getEvents(@Param('id') id: string): Promise<PollEvent[]> {
        const poll = await this.pollService.getPoll(id);
        if (!poll) {
            throw new NotFoundException(id);
        }

        return this.pollService.getEvents(id);
    }

    @Post(':id/events')
    async postEvents(@Param('id') id: string, @Body() pollEvents: PollEventDto[]): Promise<PollEvent[]> {
        const poll = await this.pollService.getPoll(id);
        if (!poll) {
            throw new NotFoundException(id);
        }

        return this.pollService.postEvents(id, pollEvents);
    }

    @Get(':id/participate')
    async getParticipants(@Param('id') id: string): Promise<Participant[]> {
        return this.pollService.getParticipants(id);
    }

    @Post(':id/participate')
    async postParticipation(@Param('id') id: string, @Body() participant: ParticipantDto): Promise<Participant> {
        return this.pollService.postParticipation(id, participant);
    }

    @Put('mail/participate')
    async setMail(@Body() mailDto: MailDto): Promise<void> {
        return this.pollService.setMail(mailDto);
    }

    @Put(':id/participate/:participantId')
    async editParticipation(
        @Param('id') id: string,
        @Param('participantId') participantId: string,
        @Body() participant: ParticipantDto,
    ): Promise<Participant> {
        return this.pollService.editParticipation(id, participantId, participant);
    }

    @Delete(':id/participate/:participantId')
    async deleteParticipation(
        @Param('id') id: string,
        @Param('participantId') participantId: string,
    ): Promise<Participant | undefined> {
        return this.pollService.deleteParticipation(id, participantId);
    }

    @Post(':id/book')
    async bookEvents(@Param('id') id: string, @Body() events: string[]): Promise<ReadPollDto> {
        const poll = await this.pollService.getPoll(id);
        if (!poll) {
            throw new NotFoundException(id);
        }

        return this.pollService.bookEvents(id, events);
    }
}
