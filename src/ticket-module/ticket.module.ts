import { createModule } from 'graphql-modules';
import { Ticket } from "./ticket.type.graphql.js";
import { TicketResolver } from "./ticket.resolver.graphql.js";


export const TicketModule = createModule({
  id: 'ticket-module',
  dirname: 'ticket.module.ts',
  typeDefs: [Ticket],
  resolvers: [TicketResolver]
});