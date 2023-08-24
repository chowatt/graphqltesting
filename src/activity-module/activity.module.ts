import { createModule } from 'graphql-modules';
import { Activity } from "./activity.type.graphql.js";
import { ActivityResolver } from "./activity.resolver.graphql.js";


export const ActivityModule = createModule({
  id: 'activity-module',
  dirname: 'activity.module.ts',
  typeDefs: [Activity],
  resolvers: [ActivityResolver]
});