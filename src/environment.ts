import 'dotenv/config.js';

console.log(process.env);

function apolloConfig(env: any) {
    return {
        client: env.DS_APOLLO_CLIENT,
        connection: {
            host: env.DS_APOLLO_HOST,
            port: env.DS_APOLLO_PORT,
            user: env.DS_APOLLO_USERNAME,
            password: env.DS_APOLLO_PASSWORD,
            database: env.DS_APOLLO_DATABASE
        }
    }
};

function colleagueToolsConfig(env: any) {
    return {
        client: env.DS_COLLEAGUE_TOOLS_CLIENT,
        connection: {
            host: env.DS_COLLEAGUE_TOOLS_HOST,
            port: env.DS_COLLEAGUE_TOOLS_PORT,
            user: env.DS_COLLEAGUE_TOOLS_USERNAME,
            password: env.DS_COLLEAGUE_TOOLS_PASSWORD,
            database: env.DS_COLLEAGUE_TOOLS_DATABASE
        }
    }
};

export { apolloConfig, colleagueToolsConfig }