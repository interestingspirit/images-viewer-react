import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Viewer from '../src/Viewer'
import Failed from './images/failed.png'
import PDF from './images/pdf.png'
import imgpdf from './images/image.pdf'
import img from './images/image.pdf'
import img1 from './images/100.pdf'
import img2 from './images/image2.jpg'
import img3 from './images/image3.jpg'
import img4 from './images/image4.jpg'
import img5 from './images/image5.jpg'
import img6 from './images/image6.jpg'
import img7 from './images/image7.jpg'
import './index.less'
import classNames from 'classnames'
import { Button, List, Checkbox } from 'antd'
import { ImageDecorator } from '../src/ViewerProps'
const ButtonGroup = Button.Group

interface State {
  visible: boolean
  activeIndex: number
  mode: 'modal' | 'inline'
  drawerVisible: boolean
  drag: boolean
  attribute: boolean
  prePageNo: number
  nextPageNo: number
  images: ImageDecorator[]
}

interface OptionData {
  key: string
  type: 'boolean'
  value?: unknown
}

const optionData: OptionData[] = [
  {
    key: 'drag',
    type: 'boolean',
  },
  {
    key: 'attribute',
    type: 'boolean',
  },
  {
    key: 'zoomable',
    type: 'boolean',
  },
  {
    key: 'rotatable',
    type: 'boolean',
  },
  {
    key: 'scalable',
    type: 'boolean',
  },
  {
    key: 'downloadable',
    type: 'boolean',
  },
  {
    key: 'loop',
    type: 'boolean',
  },
  {
    key: 'noClose',
    type: 'boolean',
    value: false,
  },
  {
    key: 'noImgDetails',
    type: 'boolean',
    value: false,
  },
  {
    key: 'noNavbar',
    type: 'boolean',
    value: false,
  },
  {
    key: 'noToolbar',
    type: 'boolean',
    value: false,
  },
  {
    key: 'noFooter',
    type: 'boolean',
    value: false,
  },
  {
    key: 'changeable',
    type: 'boolean',
  },
  {
    key: 'disableKeyboardSupport',
    type: 'boolean',
    value: false,
  },
  {
    key: 'noResetZoomAfterChange',
    type: 'boolean',
    value: false,
  },
  {
    key: 'noLimitInitializationSize',
    type: 'boolean',
    value: false,
  },
  {
    key: 'disableMouseZoom',
    type: 'boolean',
    value: false,
  },
  {
    key: 'downloadInNewWindow',
    type: 'boolean',
    value: false,
  },
  {
    key: 'showTotal',
    type: 'boolean',
  },
]

class App extends React.Component<unknown, Partial<State>> {
  container: HTMLDivElement

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      activeIndex: 6,
      mode: 'modal',
      prePageNo: 1,
      nextPageNo: 5,
      images: [
        {
          navSrc: imgpdf,
          src: imgpdf,
          fileType: 'pdf',
          alt: 'lake',
          downloadUrl:
            'https://infeng.github.io/react-viewer/59111ff2c38954887bc313887fe76e27.jpg',
        },
        {
          navSrc: img,
          src: img,
          fileType: 'pdf',
          alt: '',
          downloadUrl: '',
        },
        {
          navSrc: img1,
          src: img1,
          fileType: 'pdf',
          alt: '',
          downloadUrl: '',
        },
        {
          navSrc: img2,
          src: img2,
          fileType: 'jpg',
          alt: '',
          downloadUrl: '',
        },
        {
          navSrc: img3,
          src: img3,
          fileType: 'xls',
          alt: '',
          downloadUrl: '',
        },
        {
          navSrc: img4,
          src: img4,
          fileType: 'xlsx',
          alt: '',
          downloadUrl: '',
        },
        {
          navSrc: img5,
          src: img5,
          fileType: 'doc',
          alt: '',
          downloadUrl: '',
        },
        {
          navSrc: img6,
          src: img6,
          fileType: 'docx',
          alt: '',
          downloadUrl: '',
        },
        {
          navSrc: img7,
          src: img7,
          fileType: 'jpg',
          alt: '',
          downloadUrl: '',
        },
      ],
    }
    optionData.forEach((item) => {
      if (item.value === undefined) {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state[item.key] = true
      } else {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state[item.key] = item.value
      }
    })
  }

  handleChangeModal = () => {
    this.setState({
      mode: 'modal',
    })
  }

  handleChangeInline = () => {
    this.setState({
      mode: 'inline',
      visible: true,
    })
  }

  handleOption = (key) => {
    this.setState({
      [key]: !this.state[key],
    })
  }

  render() {
    const defaultImg = {
      src: Failed,
      navSrc: Failed,
    }

    const inline = this.state.mode === 'inline'

    const inlineContainerClass = classNames('inline-container', {
      show: this.state.visible && inline,
    })

    const imgListClass = classNames('img-list', {
      hide: this.state.visible && inline,
    })

    const options = {}
    optionData.forEach((item) => {
      options[item.key] = this.state[item.key]
    })

    // const getPreData = (activeIndex: number) => {
    //   console.log(111777, activeIndex);
    //   const offset = 8;
    //   let { prePageNo } = this.state;
    //   if (prePageNo >= 3) {
    //     return Promise.reject();
    //   }
    //   return fetch(`http://118.190.158.81:3000/comment/new?type=0&id=27511488&sortType=2&pageSize=${offset}&pageNo=${prePageNo}`).then(res => res.json()).then(res => {
    //     const images = this.state.images.slice();
    //     res.data.comments.forEach(comment => {
    //       images.unshift({
    //         navSrc: comment.user.avatarUrl,
    //         src: comment.user.avatarUrl,
    //         fileType: 'jpg',
    //         alt: '',
    //         downloadUrl: '',
    //       });
    //     });
    //     prePageNo++;
    //     activeIndex += offset
    //     this.setState({
    //       ...this.state,
    //       images,
    //       prePageNo,
    //       activeIndex
    //     });
    //     return images.length;
    //   });
    // }

    // const getNextData = (activeIndex: number) => {
    //   console.log(222888, activeIndex);
    //   const offset = 8;
    //   let { nextPageNo } = this.state;
    //   if (nextPageNo >= 8) {
    //     return Promise.reject();
    //   }
    //   return fetch(`http://118.190.158.81:3000/comment/new?type=0&id=27511488&sortType=2&pageSize=${offset}&pageNo=${nextPageNo}`).then(res => res.json()).then(res => {
    //     const images = this.state.images.slice();
    //     res.data.comments.forEach(comment => {
    //       images.push({
    //         navSrc: comment.user.avatarUrl,
    //         src: comment.user.avatarUrl,
    //         fileType: 'jpg',
    //         alt: '',
    //         downloadUrl: '',
    //       });
    //     });
    //     nextPageNo++;
    //     this.setState({
    //       ...this.state,
    //       images,
    //       nextPageNo,
    //       activeIndex
    //     });
    //     return images.length;
    //   });
    // }

    return (
      <div>
        <nav className='navbar'>
          <div className='container-fluid'>
            <div className='navbar-brand'>images-viewer-react</div>
            <a
              className='bagde'
              href='https://npmjs.org/package/images-viewer-react'
            >
              <img src='https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=3.0.0&x2=0' />
            </a>

            <div className='github'>
              <a
                className='bagde'
                href='https://github.com/candy-girl/images-viewer-react'
              >
                <img src='https://img.shields.io/github/stars/candy-girl/images-viewer-react?style=social' />
              </a>
            </div>
          </div>
        </nav>
        <div className='container'>
          <div className='wrap'>
            <div>
              <h2>Options</h2>
              <div className='options'>
                <ButtonGroup>
                  <Button
                    type={inline ? null : 'primary'}
                    onClick={this.handleChangeModal}
                  >
                    Modal mode
                  </Button>
                  <Button
                    type={inline ? 'primary' : null}
                    onClick={this.handleChangeInline}
                  >
                    Inline mode
                  </Button>
                </ButtonGroup>
                <List
                  className='options-list'
                  bordered
                  dataSource={optionData}
                  renderItem={(item) => {
                    let content = null
                    switch (item.type) {
                      case 'boolean':
                        content = (
                          <Checkbox
                            checked={this.state[item.key]}
                            onChange={() => {
                              this.handleOption(item.key)
                            }}
                          >
                            {item.key}
                          </Checkbox>
                        )
                        break
                      default:
                        break
                    }
                    return <List.Item>{content}</List.Item>
                  }}
                />
              </div>
            </div>
            <div className='img-list-wrap'>
              <div className={imgListClass}>
                {this.state.images.map((item, index) => {
                  return (
                    <div key={index.toString()} className='img-item'>
                      <img
                        src={
                          item.src?.endsWith('.pdf') ? PDF : item.src || Failed
                        }
                        onClick={() => {
                          this.setState({
                            visible: true,
                            activeIndex: index,
                          })
                        }}
                      />
                    </div>
                  )
                })}
              </div>
              <div
                className={inlineContainerClass}
                ref={(ref) => {
                  this.container = ref
                }}
              ></div>
            </div>
          </div>
          <Viewer
            visible={this.state.visible}
            onClose={() => {
              this.setState({ visible: false })
            }}
            downloadInNewWindow={true}
            images={this.state.images}
            navImgWidth={100}
            activeIndex={this.state.activeIndex}
            container={inline ? this.container : null}
            downloadable={true}
            printable={true}
            onChange={(activeImage, index) =>
              console.log(111, activeImage, index)
            }
            defaultImg={defaultImg}
            // onPreButton={getPreData}
            // onNextButton={getNextData}
            customToolbar={(toolbars) => {
              return toolbars.concat([
                {
                  key: 'test',
                  render: <div>C</div>,
                  onClick: (activeImage) => {
                    console.log(activeImage)
                  },
                },
              ])
            }}
            {...options}
          />
        </div>
        <div className='footer'>
          <div className='container-footer'>
            <a href='https://github.com/candy-girl' className='signature'>
              @candyGirl
            </a>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
