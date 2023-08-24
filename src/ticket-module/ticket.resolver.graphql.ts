import { dateScalar } from "../date.scalar.js";

export const TicketResolver = {
    Date: dateScalar,
    Query: {
        
        ticket: (_, { id }, context) => {
            return context.dataSources.tickets.db.query.first("*").from("tickets").where({ id: id });
        },
        tickets: (_, criteria, context) => {
            return context.dataSources.tickets.db.query.select("*").from("tickets").where(criteria);
        },
        status: (_, { id }, context) => {
            return context.dataSources.tickets.db.query.first("*").from("status").where({ id: id });
        },
        statuses: (_, criteria, context) => {
            return context.dataSources.tickets.db.query.select("*").from("status").where(criteria);;
        },
        priority: (_, { id }, context) => {
            return context.dataSources.tickets.db.query.first("*").from("priorities").where({ id: id });
        },
        priorities : (_, criteria, context) => {
            return context.dataSources.tickets.db.query.select("*").from("priorities").where(criteria);;
        },
        user: (_, { id }, context) => {
            return context.dataSources.tickets.db.query.first("*").from("users").where({ id: id });
        },
        users : (_, criteria, context) => {
            return context.dataSources.tickets.db.query.select("*").from("users").where(criteria);
        },
        comment: (_, {id}, context) => {
            return context.dataSources.tickets.db.query.select("*").from("ticket_comments").where({id: id});
        },
        comments: (_, criteria, context) => {
            return context.dataSources.tickets.db.query.select("*").from("ticket_comments").where(criteria);
        },
        ticket2: (_, criteria, context) => {
            return context.dataSources.tickets.SelectTickets();
        }
    },
    Mutation: {
        async addTicket(_, params, {dataSources}){
            const output = await dataSources.tickets.db.query.insert(params.input, 'id').into("tickets");
            const output2 = await dataSources.tickets.db.query.first("*").from('tickets').where({id: output[0]});
            return output2;
        }, 
        async addTicketGraph(_, {ticket, activities}, {dataSources}){
            const ticket_id = await dataSources.tickets.CreateTicketGraph(ticket, activities);
            const output2 = await dataSources.tickets.SelectTicket(ticket_id[0]);
            return output2;
        },

        async addUser(_, params, {dataSources}){
            const output = await dataSources.tickets.db.query.insert([params], 'id').into("users");
            const output2 = await dataSources.tickets.db.query.first("*").from('users').where({id: output[0]});
            return output2;
        }, 
        async addPriority(_, params, {dataSources}){
            const output = await dataSources.tickets.db.query.insert([params], 'id').into("priorities");
            const output2 = await dataSources.tickets.db.query.first("*").from('priorities').where({id: output[0]});
            return output2;
        }, 
        async addStatus(_, params, {dataSources}){
            const output = await dataSources.tickets.db.query.insert([params], 'id').into("status");
            const output2 = await dataSources.tickets.db.query.first("*").from('status').where({id: output[0]});
            return output2;
        },
        // async addActivity(_, params, {dataSources}){
        //     const output = await dataSources.tickets.db.query.insert([params], 'id').into("activities");
        //     const output2 = await dataSources.tickets.db.query.first("*").from('activities').where({id: output[0]});
        //     return output2;
        // },
        async updateTicket(_, params, {dataSources}){
            const output = await dataSources.tickets.db.query.update(params, ['id']).into("tickets").where({id: params.id});
            const output2 = await dataSources.tickets.db.query.first("*").from('tickets').where({id: output[0]});
            return output2;
        }, 
        async updateUser(_, params, {dataSources}){
            const output = await dataSources.tickets.db.query.update(params, ['id']).from("users").where({id: params.id});
            const output2 = await dataSources.tickets.db.query.first("*").from('users').where({id: params.id});
            return output2;
        }, 
        async updatePriority(_, params, {dataSources}){
            const output = await dataSources.tickets.db.query.update(params, ['id']).from("priorities").where({id: params.id});
            const output2 = await dataSources.tickets.db.query.first("*").from('priorities').where({id: params.id});
            return output2;
        }, 
        async updateStatus(_, params, {dataSources}){
            const output = await dataSources.tickets.db.query.update(params, ['id']).from("status").where({id: params.id});
            const output2 = await dataSources.tickets.db.query.first("*").from('status').where({id: params.id});
            return output2;
        }
    },
    Status: {
        tickets({ id }: any, _: any, { dataSources }) {
            return dataSources.tickets.db.query.select("*").from("tickets").where({ status_id: id });
        }
    },
    User: {
        tickets({ id }: any, _: any, { dataSources }) {
            return dataSources.tickets.db.query.select("*").from("tickets").where({ user_id: id });
        }
    },
    Priority: {
        tickets({ id }: any, _: any, { dataSources }) {
            return dataSources.tickets.db.query.select("*").from("tickets").where({ priority_id: id });
        }
    },
    Ticket: {
        priority({ id, priority_id }: any, _: any, { dataSources }) {
            return dataSources.tickets.db.query.first("*").from("priorities").where({ id: priority_id });
        },
        status({ id, status_id }: any, _: any, { dataSources }) {
            return dataSources.tickets.db.query.first("*").from("status").where({ id: status_id });
        },
        user({ id, user_id }: any, _: any, { dataSources }) {
            return dataSources.tickets.db.query.first("*").from("users").where({ id: user_id });
        },
        activities({id}: any, _: any, {dataSources}){
            return dataSources.tickets.db.query.select("*").from('activities').where({ticket_id: id});
        },
        comments({id}: any, _: any, {dataSources}){
            return dataSources.tickets.db.query.select("*").from('ticket_comments').where({ticket_id: id});
        }
    }
};