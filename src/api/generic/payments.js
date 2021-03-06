import {
  genConfig, ReducerGenerator, genActions, ONE, MANY,
} from '~/api/internal';

export const config = genConfig({
  plural: 'payments',
  endpoint: id => `/account/payments/${id}`,
  supports: [ONE, MANY],

  // sort desc by created
  sortFn: function (ids, state) {
    return ids.sort(function (a, b) {
      const aDate = new Date(state[a].created);
      const bDate = new Date(state[b].created);

      if (aDate > bDate) {
        return -1;
      }

      if (aDate < bDate) {
        return 1;
      }

      return 0;
    });
  },
});

export const actions = genActions(config);
export const { reducer } = new ReducerGenerator(config);

