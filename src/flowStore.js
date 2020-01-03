import Vue from "vue";
import Vuex from "vuex";

// import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const state = {
  projectName: "Awesome Infographic",
  containerWidth: 800,
  containerHeight: 1000,
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
        width: 50,
        height: 20,
        top: 20,
        left: 20,
      },
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
      config: {
        position: 'absolute',
        zIndex: 1,
      },
      coordinates: {
        width: 30,
        height: 30,
        top: 0,
        left: 0,
      },
      attrs: {
        src: 'https://i.imgur.com/hQRPNOF.png',
        alt: 'Infographics col 2'
      },
      style: {
        backgroundColor: 'pink'
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
        width: 50,
        height: 20,
        top: 50,
        left: 20,
      },
      style: {
        backgroundColor: 'white'
      }
    },
  ],
  backupBlocks: [],
  rendered: ''
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
  setBlockCooordinates(state, payload) {
    const coordinates = Object.assign({}, state.blocks.find(block => block.id === payload.id).coordinates, payload.coordinates)
    state.blocks = state.blocks.map(b => {
      if(b.id === payload.id) {
        b.coordinates = coordinates;
      }
      return b
    });
  },
  render(state) {
    state.rendered = render(state);
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

const kebab = (prop) => { 
  return prop.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`) 
};

const styleString = (style, coordinates) => {
  return Object.entries(style).reduce((styleString, [propName, propValue]) => {
    return `${styleString}${kebab(propName)}:${propValue}${coordinates ? '%' : ''};`;
  }, '')
};

const render = (state) => {
  let sections = '';

  state.sections.forEach(section => {
    sections += `<section>`;
    const sectionBlocks = state.blocks.filter(block => block.sectionId === section.id)
    sectionBlocks.forEach(block => {
      if (block.type === 'text') {
        sections += `
          <${block.elemType} 
            style="
              ${styleString(block.style)} 
              ${styleString(block.config)}
              ${styleString(block.coordinates, true)}
            ">
            ${block.value}
          </${block.elemType} >`
      }
      if (block.type === 'img') {
        sections += `<${block.elemType} 
          style="
            ${styleString(block.style)}
            ${styleString(block.config)}
            ${styleString(block.coordinates, true)}
          " 
          src="${block.attrs.src}" 
          alt="${block.attrs.alt}" />`
      }
    })
    sections += `</section>`;
  });
  const rendered = `
    <div class="a11y-infographics" 
      style="--canvas-aspect-ratio: ${state.containerWidth} / ${state.containerHeight};
        ${styleString(state.containerStyle)}">
      ${sections}
    </div>
    <style>
    .a11y-infographics::before {
      content: "";
      display: block;
      padding-bottom: calc(100% / (var(--canvas-aspect-ratio)));
    }
    </style>
  `

  console.log(rendered);
}