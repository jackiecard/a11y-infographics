import Vue from "vue";
import Vuex from "vuex";
const utils = require("./utils");

// import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const state = {
  projectName: "Awesome Infographic",
  structure: {
    sections: [
      {
        id: "section-1",
        type: 'column',
        columns: [
          {
            id: 'column-1',
            style: {
              backgroundColor: 'blue'
            },
            blocks: [
              {
                id: 'block-1',
                type: 'text',
                elemType: 'h1',
                value: 'Bla Headeing',
                style: {
                }
              },
            ]
          },
        ]
      },
      {
        id: "section-2",
        type: 'column',
        columns: [
          {
            id: 'column-2',
            style: {
              backgroundColor: 'red'
            },
            blocks: [
              {
                id: 'block-2',
                type: 'text',
                elemType: 'h1',
                value: 'Infographics',
                style: {
                  textAlign: 'center',
                  width: '100%',
                  padding: '10px'
                }
              },
              {
                id: 'block-3',
                type: 'text',
                elemType: 'h2',
                value: 'Infographics col 2',
                style: {
                  textAlign: 'center',
                  width: '100%',
                  padding: '10px'
                }
              },
              {
                id: 'block-4',
                type: 'img',
                elemType: 'img',
                src: 'https://i.imgur.com/hQRPNOF.png',
                value: 'Infographics col 2',
                style: {
                  textAlign: 'center',
                  padding: '10px'
                }
              }
            ]
          },
          {
            id: 'column-3',
            style: {
              backgroundColor: 'blue',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            },
            blocks: [
              {
                id: 'block-5',
                type: 'img',
                elemType: 'img',
                src: 'https://i.imgur.com/hQRPNOF.png',
                value: 'Infographics col 2',
              },
            ]
          },
          {
            id: 'column-4',
            style: {
              backgroundColor: 'blue',
            },
            blocks: [
              {
                id: 'block-6',
                type: 'text',
                elemType: 'h1',
                value: 'Infographics',
                style: {
                  textAlign: 'center',
                  width: '100%',
                  padding: '10px'
                }
              },
              {
                id: 'block-7',
                type: 'text',
                elemType: 'h2',
                value: 'Infographics col 2',
                style: {
                  textAlign: 'center',
                  width: '100%',
                  padding: '10px'
                }
              }
            ]
          },
          {
            id: 'column-5',
            style: {
              backgroundColor: 'blue',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            },
            blocks: [
              {
                id: 'block-8',
                type: 'img',
                elemType: 'img',
                src: 'https://i.imgur.com/hQRPNOF.png',
                value: 'Infographics col 2',
              },
            ]
          },
        ]
      }
    ]
  },
  backupStructure: {}
};

const structureWithoutSection = (list, id) => {
  return list.filter(section => section.id !== id)
}

const mutations = {
  setProjectName(state, payload) {
    state.projectName = payload;
  },
  setBackupStructure(state) {
    state.backupStructure = state.structure;
  },
  setStructure(state, payload) {
    state.structure = payload;
  },
  removeSection(state, payload) {
    state.structure = { sections: state.structure.sections.filter(section => section.id !== payload) };
  },
  undo(state) {
    state.structure = state.backupStructure;
  },
  addSection(state, payload) {
    state.structure.sections = state.structure.sections.concat([{
      id: `section-${utils.uuidv4()}`,
      type: 'column',
      columns: [
        {
          id: `column-${utils.uuidv4()}`,
          style: {
            backgroundColor: 'pink'
          },
          blocks: [{
            id: `block-${utils.uuidv4()}`,
            type: 'text',
            elemType: 'h2',
            value: 'Edit Text',
          }]
        }
      ]
    }])
  },
  duplicateSection(state, payload) {
    state.structure.sections = state.structure.sections.concat([{
      id: `section-${utils.uuidv4()}`,
      type: 'column',
      columns: state.structure.sections.find(section => section.id === payload).columns
    }])
  }
};

const actions = {
  setProjectName: ({ commit }, payload) => commit("setProjectName", payload),
  setStructure: ({ commit }, payload) => {
    commit("setBackupStructure")
    commit("setStructure", payload)
  },
  removeSection: ({ commit }, payload) => {
    commit("setBackupStructure")
    commit("removeSection", payload)
  },
  undo: ({ commit }) => {
    commit("undo")
  },
  addSection: ({ commit }, payload) => {
    commit("setBackupStructure")
    commit("addSection", payload)
  },
  duplicateSection: ({ commit }, payload) => {
    commit("setBackupStructure")
    commit("duplicateSection", payload)
  },
};

const getters = {
  projectName: state => state.projectName,
  structure: state => state.structure
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
