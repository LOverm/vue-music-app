import * as types from './mutation-types';
import { deflate } from 'zlib';

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  }
};

export default mutations;
