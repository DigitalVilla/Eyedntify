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

// No response just update
export const uploadImageUDP = (file, type) => dispatch => {
  if (file.type.indexOf('image') === 0) {
    const width = type === "banner" || type === "post" ? 800 : 200;
    compress(file, {width}, (resize) => {
      const image = new FormData();
      image.append('file', resize)
      resetJSON();
      axios.post("/api/files/" + type, image)
        .catch(err => dispatch(errorSetup(err)))
    })
  } else 
    dispatch(errorSetup("Invalid Image"))
};


export const uploadImage = (file, type, protocol = 'TCP') => dispatch => {
  if (!file) return;
  if (file.type.indexOf('image') === 0) {
    const width = type === "banner" || type === "post" ? 800 : 200;
    compress(file, {width}, (resize) => {
      const image = new FormData();
      image.append('file', resize)
      resetJSON();
      axios.post("/api/files/" + type, image)
        .then(res => {
          if (protocol ==='TCP') // fetch data and update store 
          return  dispatch({
            type: UPLOAD_IMAGE,
            payload: {
              file: `${PROXY}/api/files/${type}/${res.data}`,
              type
            }})
        })
        .catch(err => protocol ==='TCP' ? dispatch(errorSetup(err)) : '')
    })
  } else 
    dispatch(errorSetup("Invalid Image"))
};


export const renderLocal = (image, next) => {
  if (image.type.indexOf('image') === 0) {
    const reader = new FileReader();
    reader.onload = function (event) {
      next(event.target.result)
    }
      reader.readAsDataURL(image);
  } else 
 return "Invalid image type"

}


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


export const compress = (image, { width = 200, height = null}, next) => {
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
        }, 'image/jpeg', 0.7);

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

export const sizeReader= (bytes, si) => {
  var thresh = si ? 1000 : 1024;
  if(bytes < thresh) return bytes + ' B';
  var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
  var u = -1;
  do {
      bytes /= thresh;
      ++u;
  } while(bytes >= thresh);
  return bytes.toFixed(1)+' '+units[u];
}
