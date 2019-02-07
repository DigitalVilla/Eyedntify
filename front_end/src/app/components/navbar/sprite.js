import sprite from "../../../img/colibri.png";
export const spriteLoad = () => {

  if (document.getElementById('mySprite')) return;

  const head = document.getElementsByTagName('head')[0];
  newElement(head,'style', {id:"mySprite"},{
      innerHTML: `
      .colibri,
      .colibri1,
      .colibri2,
      .colibri3,
      .colibri4 {
          display: inline-block;
          background: url(${sprite}) no-repeat;
          overflow: hidden;
          text-indent: -9999px;
          text-align: left;
      }
      .colibri {
        background-position: -0px -0px;
        width: 300px;
        height: 327px
    }
    
    .colibri1 {
        background-position: -300px -0px;
        width: 300px;
        height: 327px
    }
    
    .colibri2 {
        background-position: -0px -327px;
        width: 300px;
        height: 327px
    }
    
    .colibri3 {
        background-position: -300px -327px;
        width: 300px;
        height: 327px
    }
    
    .colibri4 {
        background-position: -0px -654px;
        width: 300px;
        height: 327px
    }`
  });
}


/**
 * @param {Node} parent to attach new node optional
 * @param {String} tag type of html element to create
 * @param {Object} attributes to be added to the node
 * @param {Object} content optional attributes 
 */
const newElement = (parent, tag, attributes, content) => {
  let el = document.createElement(tag);
  if (attributes)
    for (let a in attributes) {
      el.setAttribute(a, attributes[a]);
    }
  if (content)
    for (let c in content) {
      el[c] = content[c];
    }
  if (parent) {
    parent.appendChild(el);
    return parent.lastElementChild;
  }
  return el;
}