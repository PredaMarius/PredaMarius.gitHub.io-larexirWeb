import {createContext} from 'react';
import { getAdreseLivrare } from '../../strapi/strapi.utils';

const DataContext = createContext({
    master:{},
    detail:{},
    adreseLivrare:getAdreseLivrare()
});

export const DataProvider=DataContext.Provider
export const DataConsumer=DataContext.Consumer
export default DataContext;
