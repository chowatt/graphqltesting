// ticket.type.graphql
import { gql } from 'graphql-modules';

export const Activity = gql`

  scalar Date

  type Activity {
    id: Int!
    person_id: Int
    activity_type_id: Int
    activity_department_id: Int
    activity_template_id: Int
    activity_status_id: Int
    campus: String
    subject: String
    body: String
    send_email_to_person: Boolean
    send_text_message: Boolean
    queued_date: Date
    email_template: String
    control: String
    created_by_id: String
    modified_by_id: String
    created: Date
    modified: Date
    deleted: Date
    deleted_by: Int
    direction: String
    acknowledged: Date
    assigned_id: Int
    due_date: Date
    activity_batch_id: Int
    note: String
    sms_body: String
    externalid: String
    author_id: Int
    source: String
    alert: String
    tag: String
    course: String
    reentry_application_id: Int
    user_group_id: Int
    core_location_id: Int
    core_distribution_method_id: Int
    assign_task: Boolean
    Person: Person
    ActivityType: ActivityType
  }

type Person {
  id: Int!
  first_name: String
  last_name: String
  hca34id: String
  int_email: String
  per_email: String
  phone1: String
  phone1_type: String
  phone2: String
  phone2_type: String
  occupation: String
  created: Date
  modified: Date
  oee_username: String
  l4ssn: String
  birth_date: Date
  program: String
  program_location: String
  program_status: String
  program_first_start: Date
  program_latest_start: Date
  program_active_status: Boolean
  program_grad_status: Boolean
  program_withdraw_status: Boolean
}

type ActivityType {
  id: Int
  name: String
  code: String
  description: String
  active: Boolean
  created: Date
  modified: Date
  created_by_id: Int!
  modified_by_id: Int!
  internal: Boolean
  category: String
  customer_visible: Boolean
  activity_department_id: Int
}

  
input ActivitySearch {
  person_id: Int
  activity_type_id: Int
  activity_department_id: Int
  activity_template_id: Int
  activity_status_id: Int
  program: String
  program_location: String
  program_status: String
}

input PeopleSearch {
  id: Int!
  first_name: String
  last_name: String
  int_email: String
  per_email: String
  l4ssn: String
  birth_date: Date
}


  #type Mutation {
    #addActivity(activity: ActivityInput): Activity
  #}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    activity (id: Int!): Activity
    activities (criteria: ActivitySearch, limit: Int): [Activity]
    person (id: Int!): Person
    people (criteria: PeopleSearch): [Person]
  }
`;