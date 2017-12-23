/**
 * @description
 * @author lichaoqun Create time 2017-12-19
 */

import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash.assign';

class UploadImg extends React.Component {
  constructor(props) {
    super(props);
    this._uploadImg = this._uploadImg.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this.state = {};
  }

  _uploadImg(e) {
    var formData = new FormData();
    formData.append('image', e.target.files[0]);
    // formData.append('type', this.props.imageType);
    this.props.upload(formData);
  }

  _onMouseEnter() {
    let del = this.refs.delete;
    del.style.display = 'block';
  }

  _onMouseLeave() {
    let del = this.refs.delete;
    del.style.display = 'none';
  }

  render() {
    return (
      <div style = { assign({}, styles.root, this.props.containerStyle) }>

        {/* upload */}
        {
          this.props.imageUrl == '' &&
          <div style = { assign({}, styles.card, this.props.cardStyle) }>

            {/* <div style = { styles.addBg }>
              <svg style = { styles.svgAdd }>
                <use xlinkHref = '#icon-add2'/>
              </svg>
            </div> */}

            <form>
              <input
                ref = 'input'
                style = { assign({}, styles.input, this.props.cardStyle) }
                id = 'file'
                type = 'file'
                name = 'image'
                accept = '.png, .jpg, .jpeg'
                onChange = { (e) => { this._uploadImg(e); } } />
            </form>
          </div>
        }

        {
          this.props.imageUrl != '' &&
          <div style = { styles.floor }>
            <img
              src = { this.props.imageUrl }
              style = { assign({}, styles.img, this.props.imageStyle) }
              onMouseEnter = { () => { this._onMouseEnter(); } }
              onMouseLeave = { () => { this._onMouseLeave(); } } />
            <div
              ref = 'delete'
              style = { styles.delete }
              onClick = { () => { this.props.delete(); } }
              onMouseEnter = { () => { this._onMouseEnter(); } }
              onMouseLeave = { () => { this._onMouseLeave(); } }>
              <div style = { styles.deleteBg }>
                <svg style = { styles.svgDelete }>
                  <use xlinkHref = '#icon-delete2'/>
                </svg>
              </div>
            </div>
          </div>
        }

      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row'
  },

  card: {
    // border: '1px dashed #d7d8d9',
    borderRadius: 2,
    width: 600,
    height: 260,
    background: '#f7f8f9',
    position: 'relative',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  svgAdd: {
    width: 18,
    height: 18,
    fill: '#fff'
  },

  addBg: {
    backgroundColor: '#4990e2',
    width: 28,
    height: 28,
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },

  input: {
    position: 'absolute',
    backgroundColor: 'red',
    top: 0,
    left: 0,
    width: 600,
    height: 260,
    opacity: 0,
    cursor: 'pointer'
  },

  img: {
    borderRadius: 2,
    width: '100%',
    height: '100%',
  },

  floor: {
    position: 'relative',
    width: 600,
    height: 260,
  },

  delete: {
    display: 'none',
    cursor: 'pointer'
  },

  deleteBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 25,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.30)'
  },

  svgDelete: {
    width: 13,
    height: 14,
    fill: '#fff'
  }
};

UploadImg.propTypes = {
  containerStyle: PropTypes.object,
  btnTitle: PropTypes.string,
  btnRemarks: PropTypes.string,
  upload: PropTypes.func,
  imageType: PropTypes.number,
  imageUrl: PropTypes.string,
  delete: PropTypes.func,
  imageStyle: PropTypes.object,
  cardStyle: PropTypes.object,
};

UploadImg.defaultProps = {

};

module.exports = UploadImg;
