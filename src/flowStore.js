import Vue from "vue";
import Vuex from "vuex";

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
    console.log(coordinates)
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
    console.log('setMobileMode', payload)
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
  let styles = '';

  state.sections.forEach(section => {
    sections += `<section>`;
    const sectionBlocks = state.blocks.filter(block => block.sectionId === section.id)
    sectionBlocks.forEach(block => {
      styles += `
        .${block.id} {
          ${block.type === 'text' ? `font-size : ${block.coordinates.width / 20}vw;` : ''}
          ${styleString(block.style)} 
          ${styleString(block.config)}
          ${styleString(block.coordinates, true)}
        }
      `;

      if (block.type === 'text') {
        sections += `
          <${block.elemType} 
            class="${block.id}">
            ${block.value}
          </${block.elemType} >`
      }
      if (block.type === 'img') {
        sections += `
          <${block.elemType} 
            class="${block.id} ai-lazy"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcsXJlPQAGdgJ7LmMeawAAAABJRU5ErkJggg=="
            data-src="${block.attrs.src}" 
            alt="${block.attrs.alt}" />`
      }
    })
    sections += `</section>`;
  });

  styles += `
    .a11y-infographics{
      --canvas-aspect-ratio: ${state.containerDesktop.width} / ${state.containerDesktop.height};
      ${styleString(state.containerStyle)}
    }

    @media (max-width: 600px) {
      --canvas-aspect-ratio: ${state.containerMobile.width} / ${state.containerMobile.height};
    }

    .a11y-infographics::before {
      content: "";
      display: block;
      padding-bottom: calc(100% / (var(--canvas-aspect-ratio)));
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .block {
      --block-top: 0;
      --block-bottom: 0;
      --block-width: 0;
      --block-height: 0;
      top: var(--block-top);
      left: var(--block-left);
      width: var(--block-width);
      height: var(--block-height);
    }
  `
  
  const rendered = `
    <div class="a11y-infographics">
      ${sections}
    </div>
    <style>
      ${styles}
    </style>
    <script>
      "use strict";
      document.addEventListener("DOMContentLoaded", function () {
        var imageObserver = new IntersectionObserver(function (entries, imgObserver) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var lazyImage = entry.target;
              console.log("lazy loading ", lazyImage);
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("ai-lazy");
              imgObserver.unobserve(lazyImage);
            }
          });
        });
        var arr = document.querySelectorAll('img.ai-lazy');
        arr.forEach(function (v) {
          imageObserver.observe(v);
        });
      });
    </script>
  `

  console.log(rendered);
}