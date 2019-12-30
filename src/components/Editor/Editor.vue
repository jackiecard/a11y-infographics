<script>
import EditorCanvas from './EditorCanvas.vue'
export default {
  name: 'Editor',
  components: {
    EditorCanvas
  },
  data() {
    return {
      structure: {
        sections: [
          {
            id: "id-1",
            columns: [
              {
                id: 'column-11',
                style: {
                  backgroundColor: 'red',
                },
                blocks: [
                  {
                    id: 'block-111',
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
                    id: 'block-112',
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
                    id: 'block-113',
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
              }
            ]
          }
        ]
      }
    }
  },
  render(createElement) {
    return createElement('EditorCanvas', {
        props: {
          sections: this.structure.sections
        }
      }
    );
  }
}
</script>

<style lang="scss">
.editor {
  margin: 40px 0 0;
}
</style>
