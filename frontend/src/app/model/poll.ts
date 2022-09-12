import {Settings} from './settings';
import {PollEvent} from './poll-event';

export interface Poll {
  title: string;
  description?: string;
  adminToken: string;
  settings: Settings;
  events?: PollEvent[]
  _id: string;
}

export type CreatePollDto = Omit<Poll, '_id'>
