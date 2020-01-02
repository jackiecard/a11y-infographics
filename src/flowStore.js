import Vue from "vue";
import Vuex from "vuex";

// import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const state = {
  projectName: "Awesome Infographic",
  containerWidth: 800,
  containerHeight: 1000,
  containerStyle: {
    backgroundColor: 'pink',
    border: '1px solid black'
  },
  sections: [
    {
      id: 'section-1'
    }
  ],
  blocks: [
    {
      id: 'block-2',
      sectionId: 'section-1',
      type: 'text',
      elemType: 'h1',
      value: 'Heading Level 1',
      width: 50,
      height: 20,
      x: 20,
      y: 20,
      zIndex: 1,
      style: {
        backgroundColor: 'yellow'
      }
    },
    {
      id: 'block-1',
      sectionId: 'section-1',
      type: 'img',
      elemType: 'img',
      value: 'Infographics col 2',
      width: 30,
      height: 30,
      x: 0,
      y: 0,
      zIndex: 1,
      attrs: {
        src: 'https://i.imgur.com/hQRPNOF.png',
        alt: 'Infographics col 2'
      },
      style: {
        backgroundColor: 'pink',
        width: '100%',
        height: '100%'
      }
    },
  ],
  backupBlocks: []
};

const structureWithoutSection = (list, id) => {
  return list.filter(section => section.id !== id)
}

const mutations = {
  setProjectName(state, payload) {
    state.projectName = payload;
  },
  setBackupBlocks(state) {
    state.backupBlocks = state.blocks;
  },
  setAllBlocks(state, payload) {
    state.blocks = payload;
  },
  removeBlock(state, payload) {
    state.blocks = state.blocks.filter(block => block.id !== payload);
  },
  undo(state) {
    state.blocks = state.backupBlocks;
  },
  setBlockConfig(state, payload) {
    const block = Object.assign({}, state.blocks.find(block => block.id === payload.id), payload.config)
    state.blocks = state.blocks.map(b => {
      if(b.id === payload.id) {
        b = block;
      }
      return b
    });
  }
};

const actions = {
  setProjectName: ({ commit }, payload) => commit("setProjectName", payload),
  setStructure: ({ commit }, payload) => {
    commit("setBackupBlocks")
    commit("setAllBlocks", payload)
  },
  removeSection: ({ commit }, payload) => {
    commit("setBackupBlocks")
    commit("removeBlock", payload)
  },
  undo: ({ commit }) => {
    commit("undo")
  },
  setBlockConfig: ({ commit }, payload) => {
    commit("setBackupBlocks")
    commit("setBlockConfig", payload)
  }
};

const getters = {
  projectName: state => state.projectName,
  blocks: state => state.blocks,
  containerWidth: state => state.containerWidth,
  containerHeight: state => state.containerHeight,
  containerStyle: state => state.containerStyle,
  sections: state => state.sections,
};

// const vuexPersist = new VuexPersist({
//   key: "my-app",
//   storage: localStorage
// });

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  // plugins: [vuexPersist.plugin]
});
