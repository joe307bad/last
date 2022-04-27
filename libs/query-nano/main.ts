import { filterToMango } from './src';

console.log(filterToMango({
  height: { eq: 123 },
  and: { width: { eq: '123' } }
}));
