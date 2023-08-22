import { createApplication } from 'graphql-modules';
import { TicketModule } from './ticket-module/ticket.module.js';

export const application = createApplication({
  modules: [TicketModule],
});