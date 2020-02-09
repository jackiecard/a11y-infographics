import Vue from "vue";
import Vuex from "vuex";
import { render } from "./scripts/render";

// import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const state = {
  projectName: "Awesome Infographic",
  containerDesktop: {
    width: 800,
    height: 1000,
  },
  containerMobile: {
    width: 400,
    height: 1000,
  },
  containerStyle: {
    position: 'relative',
    backgroundColor: 'pink',
    border: '1px solid black'
  },
  sections: [
    {
      id: 'section-1',
    }
  ],
  blocks: [
    {
      id: 'block-2',
      sectionId: 'section-1',
      type: 'text',
      elemType: 'h1',
      value: 'Heading Level 1',
      config: {
        position: 'absolute',
        zIndex: 1,
      },
      coordinates: {
        width: 47,
        height: 5.8,
        top: 4,
        left: 27,
      },
      coordinatesMobile: {
        width: 90,
        height: 10,
        top: 4,
        left: 5,
      },
      style: {
        backgroundColor: 'yellow',
        fontFamily: 'Verdana'
      }
    },
    {
      id: 'block-1',
      sectionId: 'section-1',
      type: 'img',
      elemType: 'img',
      value: 'Infographics col 2',
      config: {
        position: 'absolute',
        zIndex: 1
      },
      coordinates: {
        width: 30,
        height: 30,
        top: 15,
        left: 35,
      },
      coordinatesMobile: {
        width: 90,
        height: 40,
        top: 15,
        left: 5,
      },
      attrs: {
        src: 'https://i.imgur.com/hQRPNOF.png',
        alt: 'Infographics col 2'
      },
      style: {
        backgroundColor: 'pink',
        fontFamily: 'Verdana'
      }
    },
    {
      id: 'block-3',
      sectionId: 'section-1',
      type: 'text',
      elemType: 'p',
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      config: {
        position: 'absolute',
        zIndex: 1,
      },
      coordinates: {
        width: 63,
        height: 16,
        top: 50,
        left: 20,
      },
      coordinatesMobile: {
        width: 90,
        height: 20,
        top: 65,
        left: 5,
      },
      style: {
        backgroundColor: 'white',
        fontFamily: 'Verdana'
      }
    },
  ],
  backupBlocks: [],
  rendered: '',
  mobileMode: false
};

const structureWithoutSection = (list, id) => {
  return list.filter(section => section.id !== id)
}

const mutations = {
  setProjectName(state, payload) {
    state.projectName = payload;
  },
  setContainerDesktop(state, payload) {
    state.containerDesktop = Object.assign({}, state.containerDesktop, payload);
  },
  setContainerMobile(state, payload) {
    state.containerMobile = Object.assign({}, state.containerMobile, payload);
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
  setBlockCooordinates(state, payload) {
    const block = state.mobileMode ? state.blocks.find(block => block.id === payload.id).coordinatesMobile : state.blocks.find(block => block.id === payload.id).coordinates
    const coordinates = Object.assign({}, block, payload.coordinates)
    state.blocks = state.blocks.map(b => {
      if(b.id === payload.id && !state.mobileMode) {
        b.coordinates = coordinates;
      }
      else if (b.id === payload.id && state.mobileMode) {
        b.coordinatesMobile = coordinates;
      }
      return b
    });
  },
  setBlockConfig(state, payload) {
    const config = Object.assign({}, state.blocks.find(block => block.id === payload.id).config, payload.config)
    state.blocks = state.blocks.map(b => {
      if(b.id === payload.id) {
        b.config = config;
      }
      return b
    });
  },
  render(state) {
    state.rendered = render(state);
  },
  setMobileMode(state, payload) {
    state.mobileMode = payload;
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
  setBlockCooordinates: ({ commit }, payload) => {
    commit("setBackupBlocks")
    commit("setBlockCooordinates", payload)
  },
  render: ({ commit }) => {
    commit("render")
  },
  setBlockConfig: ({ commit }, payload) => {
    commit("setBackupBlocks")
    commit("setBlockConfig", payload)
  },
  setContainerDesktop: ({ commit }, payload) => {
    commit("setContainerDesktop", payload)
  },
  setContainerMobile: ({ commit }, payload) => {
    commit("setContainerMobile", payload)
  },
  setMobileMode: ({ commit }, payload) => {
    commit("setMobileMode", payload)
  },
};

const getters = {
  projectName: state => state.projectName,
  blocks: state => state.blocks,
  containerStyle: state => state.containerStyle,
  containerDesktop: state => state.containerDesktop,
  containerMobile: state => state.containerMobile,
  sections: state => state.sections,
  mobileMode: state => state.mobileMode
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