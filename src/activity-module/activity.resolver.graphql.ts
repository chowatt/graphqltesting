import { dateScalar } from "../date.scalar.js";

export const ActivityResolver = {
    Date: dateScalar,
    Query: {
        // activity (id: Int!): Activity
        // activities (criteria: ActivitySearch): [Activity]

        activity: (_, { id }, context) => {
            return context.dataSources.ct.db.query.first("*").from("activities").where({ id: id });
        },
        activities: (_, {criteria, limit}, context) => {
            console.log(limit);
            return context.dataSources.ct.db.query.select("*").from("activities").limit(limit || 100).where(criteria);
        },
        person: (_, { id }, context) => {
            return context.dataSources.ct.db.query.first("*").from("people").where({ id: id });
        },
        people: (_, {criteria}, context) => {
            return context.dataSources.ct.db.query.select("*").from("people").limit(100).where(criteria);
        },
    },

    // Status: {
    //     tickets({ id }: any, _: any, { dataSources }) {
    //         return dataSources.tickets.db.query.select("*").from("tickets").where({ status_id: id });
    //     }
    // },

    Activity: {
        Person({person_id}: any, _:any, context){
            return context.dataSources.ct.db.query.first("*").from("people").where({ id: person_id });
        },
        ActivityType({activity_type_id}: any, _:any, context){
            return context.dataSources.ct.db.query.first("*").from("activity_type").where({ id: activity_type_id });
        }
    },

    Mutation: {
        
    }, 
    
};