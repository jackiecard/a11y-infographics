import { styleString } from "./styleString";

export function render (state) {
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

        @media (max-width: 600px) {
          .${block.id} {
            ${styleString(block.coordinatesMobile, true)}
          }
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
    .a11y-infographics {
      --canvas-aspect-ratio: ${state.containerDesktop.width} / ${state.containerDesktop.height};
      ${styleString(state.containerStyle)}
    }

    @media (max-width: 600px) {
      .a11y-infographics {
        --canvas-aspect-ratio: ${state.containerMobile.width} / ${state.containerMobile.height};
      }
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
  return rendered;
}