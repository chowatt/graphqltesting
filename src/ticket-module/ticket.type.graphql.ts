// ticket.type.graphql
import { gql } from 'graphql-modules';

export const Ticket = gql`

  scalar Date

  type Ticket{
    id: Int!
    subject: String
    priority_id: Int
    status_id: Int
    user_id: Int
    assigned_to_user_id: Int
    priority: Priority
    status: Status
    user: User
    activities: [Activity]
    comments: [Comment]
  }

  type Priority{
    id: Int!
    slug: String
    name: String
    tickets: [Ticket]
  }
  type Status{
    id: Int!
    slug: String
    name: String
    tickets: [Ticket]
  }

  type User{
    id: Int!
    email: String
    name: String
    tickets: [Ticket]
  }

  type Activity{
    id: Int!
    ticket_id: Int
    user_id: Int
    created: Date
    modified: Date
    comment: String
  }

  type Comment{
    id: Int!
    ticket_id: Int
    comment: String
  }

  input TicketInput {
    subject: String
    priority_id: Int
    status_id: Int
    user_id: Int
    assigned_to_user_id: Int
  }

  input ActivityInput {
    user_id: Int
    created: Date
    modified: Date
    comment: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    ticket (id: Int!): Ticket
    tickets(status_id: Int, user_id: Int, priority_id: Int): [Ticket]
    status (id: Int!): Status
    statuses: [Status]
    priority (id: Int!): Priority
    priorities: [Priority]
    user (id: Int!): User
    users: [User]
    comment: Comment
    comments: [Comment]
    ticket2(id: Int!): [Ticket]
  }

  type Mutation {
    addTicket(ticket: TicketInput): Ticket
    addStatus(slug: String!, name: String!): Status
    addPriority(slug: String!, name: String!): Priority
    addUser(name: String!, email: String!): User
    #addActivity(ticket_id: Int!, user_id: Int!, created: Date, modified: Date, comment: String): User
    updateTicket(id: Int!, subject: String, priority_id: Int, status_id: Int, user_id: Int, assigned_to_user_id: Int): Ticket
    updateStatus(id: Int!, slug: String, name: String): Status
    updatePriority(id: Int!, slug: String, name: String): Priority
    updateUser(id: Int!, name: String, email: String): User
    addTicketGraph(ticket: TicketInput, activities: [ActivityInput]): Ticket
  }
`;