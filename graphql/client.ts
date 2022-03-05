import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: "http://192.168.1.3:4000/graphql",
    cache: new InMemoryCache(),
});

export default client;
