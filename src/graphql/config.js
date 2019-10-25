
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-boost';



const token = localStorage.getItem('jwt');
const httpLink = createHttpLink({
    uri: 'http://5.189.183.44:1338/graphql',
        headers: {"authorization": `Bearer ${token}`} ,
  });


const cache=new InMemoryCache();

export const client=new ApolloClient({
    link:httpLink,
    cache:cache
})
