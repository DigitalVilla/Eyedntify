import {
  IMAGE_LOADING,
  UPLOAD_IMAGE,
  GET_ERRORS
} from '../actions/types';
import axios from 'axios';
import {
  PROXY,
  resetJSON
} from '../utils/setAxios';

// Clear profile
export const uploadImage = (file, type) => dispatch => {
  const width = type === "banner" || type === "post" ? 800 : 200;
  compress(file, {width}, (resize) => {
    const image = new FormData();
    image.append('file', resize)
    resetJSON();
    axios.post("/api/files/" + type, image)
      .then(res =>
        dispatch({
          type: UPLOAD_IMAGE,
          payload: {
            file: `${PROXY}/api/files/${type}/${res.data}`,
            type
          }
        })
      )
      .catch(err => dispatch(errorSetup(err)))
  })
};

const errorSetup = (error) => ({
  type: GET_ERRORS,
  payload: error
})


//toBlob polyfill
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
      var dataURL = this.toDataURL(type, quality).split(',')[1];
      setTimeout(function () {
        var binStr = atob(dataURL),
          len = binStr.length,
          arr = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }
        callback(new Blob([arr], {
          type: type || 'image/png'
        }));
      });
    }
  });
}


const compress = (image, {
  width = 200,
  height = null
}, next) => {
  const fileName = image.name;
  const type = image.type;
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;
    return img.onload = () => {
        const elem = document.createElement('canvas');
        const scaleFactor = height ? height :
          (width / img.width) * img.height;
        elem.width = width;
        elem.height = scaleFactor;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, width, scaleFactor);
        ctx.canvas.toBlob((blob) => {
          const file = new File([blob], fileName, {
            lastModified: Date.now(),
            type
          });
          next(file);
        }, 'image/jpeg', 0.6);

      },
      reader.onerror = error => console.log(error);
  };
}
// https://zocada.com/compress-resize-images-javascript-browser
export const renderURL = (type, image) => {
  if (!image) return '';
  if (image.indexOf('http') > -1 || image.indexOf('data:image') > -1) return image; 
  let url = `${PROXY}/api/files/${type}/${image}`;
  return url;
}