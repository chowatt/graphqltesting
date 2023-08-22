import { resourceLimits } from "worker_threads";

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
    {
        title: 'City of Glass 2',
        author: 'Paul Auster',
    },
];

export const resolvers = {
    Query: {
        //books: () => books,
        searchAuthor: (_, { author }) => {
            //console.log(author);
            console.log(author);
            console.log(books.find((book) => book.author === author));
            return books.filter((book) => book.author === author);
        },
        books: () => books,
        book: () => books.find((book) => book.author === 'Kate Chopin'),
        tickets: (_, __, context) => {
            return context.dataSources.tickets.db.query
                .select("*")
                .from("tickets")
                .where(__);
        },
        ticket: (_, { id }, context) => {
            return context.dataSources.tickets.db.query.first("*").from("tickets").where({ id: id });
        },
        status: (_, { id }, context) => {
            return context.dataSources.tickets.db.query.first("*").from("status").where({ id: id });
        },
        statuses: (_, __, context) => {
            return context.dataSources.tickets.db.query
                .select("*")
                .from("status");
        },
    },
    Mutation: {
        async addTicket(_, params, {dataSources}){
            const output = await dataSources.tickets.db.query.insert([params], 'id').into("tickets");
            const output2 = await dataSources.tickets.db.query.first("*").from('tickets').where({id: output[0]});
            return output2;
        }
    },
    Status: {
        tickets({ id }: any, _: any, { dataSources }) {
            return dataSources.tickets.db.query.select("*").from("tickets").where({ status_id: id });
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
        }
    }
};