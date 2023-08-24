import { createApplication } from 'graphql-modules';
import { TicketModule } from './ticket-module/ticket.module.js';
import { ActivityModule } from './activity-module/activity.module.js';

export const application = createApplication({
  modules: [TicketModule, ActivityModule],
});