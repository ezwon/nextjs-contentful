import { ApolloClient, InMemoryCache } from "@apollo/client";

//https://graphql.contentful.com/content/v1/spaces/{SPACE}
const client = new ApolloClient({
    uri: "https://countries.trevorblades.com",
    cache: new InMemoryCache(),
});

export default client;
