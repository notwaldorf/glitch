// From https://stackoverflow.com/a/13542669

// These are the magical methods!

/* 
 * Darkening/Lightening. Params:
 * -  a color in an rgb format, ex rgb(123,123,123).
 * - a percent, which means how much to darken/lighten the colour.
 * If the percent is positive, you're lightening. Otherwise, it's darkening.
 * 
 * If you need your colour to be in hex form, there's an answer in that
 * SO answer, otherwise, this other answer is my goto:
 * https://stackoverflow.com/a/5624139
 */
function shadeRGBColor(color, percent) {
  const f=color.split( ', '),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
  return  'rgb( '+(Math.round((t-R)*p)+R)+ ', '+(Math.round((t-G)*p)+G)+ ', '+(Math.round((t-B)*p)+B)+ ') ';
}

/* 
 * Blending. Params:
 * - two colors, both in an rgb format, ex rgb(123,123,123).
 * - a percent, which means how much to go from the first colour to the second
 * 
 * If you need your colour to be in hex form, there's an answer in that
 * SO answer, otherwise, this other answer is my goto:
 * https://stackoverflow.com/a/5624139
 */
function blendRGBColors(c0, c1, p) {
  const f=c0.split( ', '),t=c1.split( ', '),R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
  return  'rgb( '+(Math.round((parseInt(t[0].slice(4))-R)*p)+R)+ ', '+(Math.round((parseInt(t[1])-G)*p)+G)+ ', '+(Math.round((parseInt(t[2])-B)*p)+B)+ ') ';
}

// Fill the grid.
const COLOR1 = 'rbg(255, 22, 68)';
const COLOR2 = 'rbg(68, 138, 255)';
for (let i = 0; i < 10; i++) {
  const percent = i / 10;
  lighten.appendChild(makeADiv(shadeRGBColor(COLOR1, percent)));
  darken.appendChild(makeADiv(shadeRGBColor(COLOR1, -percent)));   
  blend.appendChild(makeADiv(blendRGBColors(COLOR1, COLOR2, percent)));   
}

function makeADiv(color) {
  const div = document.createElement('div');
  div.style.display = 'inline-block';
  div.style.width = '10%';
  div.style.height = '50px';
  div.style.backgroundColor = color;
  return div;
}

