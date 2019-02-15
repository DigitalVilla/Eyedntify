import menu from "../../img/colibri.png";
import loader from "../../img/animaId.png";
import spinner from "../../img/anima.png";
export const spriteLoad = () => {

  if (document.getElementById('mySprite')) return;

  const head = document.getElementsByTagName('head')[0];
  newElement(head,'style', {id:"mySprite"},{
      innerHTML: `
      .myid0,
.myid1,
.myid2,
.myid3,
.myid4,
.myid5,
.myid6,
.myid7,
.myid8 {
  background:url(${loader}) no-repeat;
  animation: showIn .2s;
  transition: opacity .2s;
  overflow: hidden;
  text-indent: -9999px;
  text-align: left;
  height: 161px;
  width: 150px
}

.myid0 {
  background-position: 0 0
}

.myid1 {
  background-position: -150px 0
}

.myid2 {
  background-position: -300px 0
}

.myid3 {
  background-position: 0 -161px
}

.myid4 {
  background-position: -150px -161px
}

.myid5 {
  background-position: -300px -161px
}

.myid6 {
  background-position: 0 -322px
}

.myid7 {
  background-position: -150px -322px
}

.myid8 {
  background-position: -300px -322px
}

.colibri,
.colibri1,
.colibri2,
.colibri3,
.colibri4 {
  display: inline-block;
  background:url(${menu}) no-repeat;
  overflow: hidden;
  text-indent: -9999px;
  text-align: left;
  width: 250px;
  height: 272.66px
}

.colibri {
  background-position: 0 0
}

.colibri1 {
  background-position: -250px 0
}

.colibri2 {
  background-position: 0 -272.66px
}

.colibri3 {
  background-position: -250px -272.66px
}

.colibri4 {
  background-position: 0 -545.34px
}

.myColibri0,
.myColibri1,
.myColibri2,
.myColibri3,
.myColibri4,
.myColibri4c,
.myColibri5 {
  display: inline-block;
  background:url(${spinner}) no-repeat;
  overflow: hidden;
  text-indent: -9999px;
  text-align: left;
  height: 161px;
  width: 150px
}

.myColibri0 {
  background-position: 0 0
}

.myColibri1 {
  background-position: -150px 0
}

.myColibri2 {
  background-position: 0 -161px
}

.myColibri3 {
  background-position: -150px -161px
}

.myColibri4 {
  background-position: 0 -161px
}

.myColibri4c {
  background-position: -150px -161px
}

.myColibri5 {
  background-position: 0 -483px
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