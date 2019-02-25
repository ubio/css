(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var convert = require('color-convert');

module.exports = function (cstr) {
    var m, conv, parts, alpha;
    if (m = /^((?:rgb|hs[lv]|cmyk|xyz|lab)a?)\s*\(([^\)]*)\)/.exec(cstr)) {
        var name = m[1];
        var base = name.replace(/a$/, '');
        var size = base === 'cmyk' ? 4 : 3;
        conv = convert[base];
        
        parts = m[2].replace(/^\s+|\s+$/g, '')
            .split(/\s*,\s*/)
            .map(function (x, i) {
                if (/%$/.test(x) && i === size) {
                    return parseFloat(x) / 100;
                }
                else if (/%$/.test(x)) {
                    return parseFloat(x);
                }
                return parseFloat(x);
            })
        ;
        if (name === base) parts.push(1);
        alpha = parts[size] === undefined ? 1 : parts[size];
        parts = parts.slice(0, size);
        
        conv[base] = function () { return parts };
    }
    else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
        var base = cstr.replace(/^#/,'');
        var size = base.length;
        conv = convert.rgb;
        parts = base.split(size === 3 ? /(.)/ : /(..)/);
        parts = parts.filter(Boolean)
            .map(function (x) {
                if (size === 3) {
                    return parseInt(x + x, 16);
                }
                else {
                    return parseInt(x, 16)
                }
            })
        ;
        alpha = 1;
        conv.rgb = function () { return parts };
        if (!parts[0]) parts[0] = 0;
        if (!parts[1]) parts[1] = 0;
        if (!parts[2]) parts[2] = 0;
    }
    else {
        conv = convert.keyword;
        conv.keyword = function () { return cstr };
        parts = cstr;
        alpha = 1;
    }
    
    var res = {
        rgb: undefined,
        hsl: undefined,
        hsv: undefined,
        cmyk: undefined,
        keyword: undefined,
        hex: undefined
    };
    try { res.rgb = conv.rgb(parts) } catch (e) {}
    try { res.hsl = conv.hsl(parts) } catch (e) {}
    try { res.hsv = conv.hsv(parts) } catch (e) {}
    try { res.cmyk = conv.cmyk(parts) } catch (e) {}
    try { res.keyword = conv.keyword(parts) } catch (e) {}
    
    if (res.rgb) res.hex = '#' + res.rgb.map(function (x) {
        var s = x.toString(16);
        if (s.length === 1) return '0' + s;
        return s;
    }).join('');
    
    if (res.rgb) res.rgba = res.rgb.concat(alpha);
    if (res.hsl) res.hsla = res.hsl.concat(alpha);
    if (res.hsv) res.hsva = res.hsv.concat(alpha);
    if (res.cmyk) res.cmyka = res.cmyk.concat(alpha);
    
    return res;
};

},{"color-convert":3}],2:[function(require,module,exports){
/* MIT license */

module.exports = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2hwb: rgb2hwb,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  rgb2lch: rgb2lch,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2hwb: hsl2hwb,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2hwb: hsv2hwb,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  hwb2rgb: hwb2rgb,
  hwb2hsl: hwb2hsl,
  hwb2hsv: hwb2hsv,
  hwb2cmyk: hwb2cmyk,
  hwb2keyword: hwb2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2hwb: cmyk2hwb,
  cmyk2keyword: cmyk2keyword,

  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2hwb: keyword2hwb,
  keyword2cmyk: keyword2cmyk,
  keyword2lab: keyword2lab,
  keyword2xyz: keyword2xyz,

  xyz2rgb: xyz2rgb,
  xyz2lab: xyz2lab,
  xyz2lch: xyz2lch,

  lab2xyz: lab2xyz,
  lab2rgb: lab2rgb,
  lab2lch: lab2lch,

  lch2lab: lch2lab,
  lch2xyz: lch2xyz,
  lch2rgb: lch2rgb
}


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2hwb(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function rgb2lch(args) {
  return lab2lch(rgb2lab(args));
}

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsl2hwb(args) {
  return rgb2hwb(hsl2rgb(args));
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2hwb(args) {
  return rgb2hwb(hsv2rgb(args))
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
function hwb2rgb(hwb) {
  var h = hwb[0] / 360,
      wh = hwb[1] / 100,
      bl = hwb[2] / 100,
      ratio = wh + bl,
      i, v, f, n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 0x01) != 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);  // linear interpolation

  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
}

function hwb2hsl(args) {
  return rgb2hsl(hwb2rgb(args));
}

function hwb2hsv(args) {
  return rgb2hsv(hwb2rgb(args));
}

function hwb2cmyk(args) {
  return rgb2cmyk(hwb2rgb(args));
}

function hwb2keyword(args) {
  return rgb2keyword(hwb2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2hwb(args) {
  return rgb2hwb(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}

function xyz2lab(xyz) {
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2],
      l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function xyz2lch(args) {
  return lab2lch(xyz2lab(args));
}

function lab2xyz(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

  return [x, y, z];
}

function lab2lch(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      hr, h, c;

  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
}

function lab2rgb(args) {
  return xyz2rgb(lab2xyz(args));
}

function lch2lab(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

function lch2xyz(args) {
  return lab2xyz(lch2lab(args));
}

function lch2rgb(args) {
  return lab2rgb(lch2lab(args));
}

function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2hwb(args) {
  return rgb2hwb(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

function keyword2lab(args) {
  return rgb2lab(keyword2rgb(args));
}

function keyword2xyz(args) {
  return rgb2xyz(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  rebeccapurple: [102, 51, 153],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}

},{}],3:[function(require,module,exports){
var conversions = require("./conversions");

var convert = function() {
   return new Converter();
}

for (var func in conversions) {
  // export Raw versions
  convert[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  convert[from] = convert[from] || {};

  convert[from][to] = convert[func] = (function(func) { 
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}


/* Converter does lazy conversion and caching */
var Converter = function() {
   this.convs = {};
};

/* Either get the values for a space or
  set the values for a space, depending on args */
Converter.prototype.routeSpace = function(space, args) {
   var values = args[0];
   if (values === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof values == "number") {
      values = Array.prototype.slice.call(args);        
   }

   return this.setValues(space, values);
};
  
/* Set the values for a space, invalidating cache */
Converter.prototype.setValues = function(space, values) {
   this.space = space;
   this.convs = {};
   this.convs[space] = values;
   return this;
};

/* Get the values for a space. If there's already
  a conversion for the space, fetch it, otherwise
  compute it */
Converter.prototype.getValues = function(space) {
   var vals = this.convs[space];
   if (!vals) {
      var fspace = this.space,
          from = this.convs[fspace];
      vals = convert[fspace][space](from);

      this.convs[space] = vals;
   }
  return vals;
};

["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
   Converter.prototype[space] = function(vals) {
      return this.routeSpace(space, arguments);
   }
});

module.exports = convert;
},{"./conversions":2}],4:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
var Vue // late bind
var version
var map = (window.__VUE_HOT_MAP__ = Object.create(null))
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cahced together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }
      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)
      instance.$forceUpdate()
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

},{}],6:[function(require,module,exports){
(function (process,global){
/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
'use strict';

/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */









// add a raw attr (use this in preTransforms)








// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

module.exports = Vue$3;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":4}],7:[function(require,module,exports){
var inserted = exports.cache = {}

function noop () {}

exports.insert = function (css) {
  if (inserted[css]) return noop
  inserted[css] = true

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return function () {
    document.getElementsByTagName('head')[0].removeChild(elem)
    inserted[css] = false
  }
}

},{}],8:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("@import \"https://fonts.googleapis.com/css?family=Libre+Franklin:100,200,300,400,500,600,700\";\n\n:root {\n\n    /* Typography */\n\n    --font-family: 'Libre Franklin', Helvetica, Arial, sans-serif;\n    --font-family--mono: Menlo, Consolas, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace;\n\n    /* Gaps */\n\n    --gap--small: 5px;\n    --gap: 10px;\n    --gap--large: 20px;\n\n\n    /* Base components */\n\n    --font-size: 12px;\n    --font-size--small: .8em;\n    --font-size--large: 1.5em;\n\n    --control-height: 2.3335em;\n    --control-height--small: 1.875em;\n    --control-height--large: 2.66675em;\n\n    --border-radius: 4px;\n    --border-color--hover: var(--color-blue--500);\n    --border-color: #C2CCD0;\n\n\n    /* CTA colours */\n\n    /*black on white*/\n    --cta-color: var(--color-mono--200);\n    --cta-color--active: var(--color-mono--300);\n\n    /*white on black*/\n    --cta-color--dark-mode: rgba(0,0,0,.5);\n    --cta-color--active--dark-mode: white;\n\n    /*colour on white and black*/\n    --cta-color--accent: var(--color-blue--500);\n    --cta-color--accent--active: var(--color-blue--600);\n\n\n    /* UI Colours */\n\n    /*black on white*/\n    --ui-color: var(--color-mono--800);\n    --ui-background: white;\n\n    /*white on black*/\n    --ui-color--dark-mode: white;\n    --ui-background--dark-mode: var(--color-cool--800);\n\n    /*colour on white and black*/\n    --ui-color--primary: var(--color-blue--600);\n    --ui-color--secondary: var(--color-cool--600);\n    --ui-color--accent: var(--color-brand-red--600);\n    --ui-color--muted: rgba(122,162,202,.3);\n\n    /*tabs*/\n    --tab-slider-size: 2px;\n    --tab-slider-color: var(--cta-color--accent);\n\n\n    /* Color Palette */\n\n    --color-mono--000: #FAFAFA;\n    --color-mono--100: #F3F3F3;\n    --color-mono--200: #EBEBEB;\n    --color-mono--300: #E0E0E0;\n    --color-mono--400: #CCCCCC;\n    --color-mono--500: #919191;\n    --color-mono--600: #757575;\n    --color-mono--700: #575757;\n    --color-mono--800: #383838;\n    --color-mono--900: #262626;\n\n    --color-warm--000: #FAFAF7;\n    --color-warm--100: #F5F5F0;\n    --color-warm--200: #EBEBE4;\n    --color-warm--300: #E0E0D7;\n    --color-warm--400: #CFCFBC;\n    --color-warm--500: #949485;\n    --color-warm--600: #787869;\n    --color-warm--700: #595947;\n    --color-warm--800: #3B3B2A;\n    --color-warm--900: #29291B;\n\n    --color-cool--000: #F7FAFC;\n    --color-cool--100: #EDF2F7;\n    --color-cool--200: #E4ECF5;\n    --color-cool--300: #D3E0ED;\n    --color-cool--400: #BFD0E3;\n    --color-cool--500: #8394A6;\n    --color-cool--600: #647A8F;\n    --color-cool--700: #445A70;\n    --color-cool--800: #2A3C4F;\n    --color-cool--900: #1C2936;\n\n    --color-blue--000: #F5FCFF;\n    --color-blue--100: #EBF7FC;\n    --color-blue--200: #D7F1FC;\n    --color-blue--300: #C2EBFC;\n    --color-blue--400: #95DDFC;\n    --color-blue--500: #31AADE;\n    --color-blue--600: #268FBD;\n    --color-blue--700: #0873A1;\n    --color-blue--800: #004969;\n    --color-blue--900: #003247;\n\n    --color-green--000: #F0FCF5;\n    --color-green--100: #E8FAF1;\n    --color-green--200: #DAF5E5;\n    --color-green--300: #C2F0D6;\n    --color-green--400: #94EBBB;\n    --color-green--500: #54B364;\n    --color-green--600: #489448;\n    --color-green--700: #2E732E;\n    --color-green--800: #144F14;\n    --color-green--900: #0D360D;\n\n    --color-yellow--000: #ffffd9;\n    --color-yellow--100: #FAF7C8;\n    --color-yellow--200: #F7EFBA;\n    --color-yellow--300: #F5E29F;\n    --color-yellow--400: #FCC962;\n    --color-yellow--500: #DE8500;\n    --color-yellow--600: #A66D19;\n    --color-yellow--700: #755127;\n    --color-yellow--800: #473521;\n    --color-yellow--900: #2B241C;\n\n    --color-red--000: #FFF7F8;\n    --color-red--100: #FAF0F1;\n    --color-red--200: #FFE2E4;\n    --color-red--300: #FFD1D5;\n    --color-red--400: #FFB5BB;\n    --color-red--500: #FA5C6A;\n    --color-red--600: #E64350;\n    --color-red--700: #C72633;\n    --color-red--800: #82161F;\n    --color-red--900: #590C12;\n\n    --color-brand-red--000: #FFF7F7;\n    --color-brand-red--100: #FAF0F0;\n    --color-brand-red--200: #FFE2E2;\n    --color-brand-red--300: #FFD1D1;\n    --color-brand-red--400: #FFB5B5;\n    --color-brand-red--500: #ff5a5f;\n    --color-brand-red--600: #E64343;\n    --color-brand-red--700: #C72828;\n    --color-brand-red--800: #821621;\n    --color-brand-red--900: #590C14;\n\n    --color-brand-blue--000: #F2FEFF;\n    --color-brand-blue--100: #E8F8FA;\n    --color-brand-blue--200: #D5F1F5;\n    --color-brand-blue--300: #BCEEF5;\n    --color-brand-blue--400: #8AE6F2;\n    --color-brand-blue--500: #28B5C7;\n    --color-brand-blue--600: #109CAD;\n    --color-brand-blue--700: #007987;\n    --color-brand-blue--800: #004E57;\n    --color-brand-blue--900: #003238;\n\n}\n\n/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe, img, ins, kbd, q, s, samp, tt, var,\nfieldset, form, table, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    vertical-align: baseline;\n    box-sizing: border-box;\n}\n\narticle, aside, footer, header, section {\n    display: block;\n}\n\ninput, textarea, button, select {\n    font: inherit;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n    display: block;\n}\n\nblockquote, q {\n    quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n    content: '';\n    content: none;\n}\n\n/* Semantic tags styled */\n\n/* Base states */\n\n:disabled,\n[disabled] {\n    cursor: not-allowed;\n    pointer-events: none;\n    opacity: .7;\n}\n\nhtml {\n    scroll-behavior: smooth;\n    height: 100%;\n}\n\nbody {\n    font-family: var(--font-family);\n    font-size: var(--font-size);\n    line-height: 1;\n    background: var(--ui-background);\n    color: var(--ui-color);\n\n    height: auto;\n    min-height: 100vh;\n}\n\nhr {\n    margin: var(--gap) 0;\n    border: 0;\n    height: 1px;\n    background: var(--color-mono--300);\n}\n\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n\nimg {\n    max-width: 100%;\n}\n\nlabel {\n    cursor: pointer;\n    font-weight: 500;\n    font-size: 1.1em;\n    line-height: 1.5em;\n    margin-bottom: .25em;\n}\n\ninput,\ntextarea {\n    display: inline-block;\n    box-sizing: border-box;\n    padding: calc((var(--control-height) - var(--font-size) * 1.35)/ 2) .5em;\n\n    border-radius: var(--border-radius);\n    border: 1px solid var(--border-color);\n    box-shadow: 0 1px 2px rgba(2,36,102,.15) inset;\n    background-color: var(--ui-background);\n\n    text-overflow: ellipsis;\n\n    font-family: var(--font-family);\n    font-size: var(--font-size);\n    line-height: 1.35;\n    letter-spacing: 0;\n}\n\ninput:hover,\ntextarea:hover,\nselect:hover {\n    border-color: var(--border-color--hover);\n}\n\nbutton:focus,\ninput:focus,\ntextarea:focus,\nselect:focus,\na:focus,\na:active {\n    border-color: #4A90E2;\n    box-shadow: 0 0 0 2px #ADD3FC;\n    outline: none;\n}\n\ninput[type=\"text\"],\ninput[type=\"password\"],\ninput[type=\"email\"],\ninput[type=\"number\"] {\n    height: var(--control-height);\n    width: 100%;\n}\n\ntextarea {\n    line-height: 1.35;\n    min-height: var(--control-height);\n    width: 100%;\n}\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n    height: auto;\n    margin: var(--gap--small);\n}\n\ninput[readonly],\ntextarea[readonly] {\n    background: var(--color-warm--100);\n    box-shadow: none;\n}\n\nselect {\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    appearance: none;\n    background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 960 560\"><path d=\"M480 344.2L268.9 131.9c-15.8-15.9-41.3-15.9-57.1 0 -15.8 15.9-15.8 41.6 0 57.4l237.6 238.9c8.4 8.5 19.6 12.3 30.6 11.7 11 0.6 22.2-3.2 30.6-11.7l237.6-238.9c15.8-15.9 15.8-41.6 0-57.4s-41.3-15.9-57.1 0L480 344.2z\"/></svg>');\n    background-position: 100%;\n    background-size: 1.5em;\n    background-repeat: no-repeat;\n    background-color: transparent;\n    color: currentColor;\n\n    height: 2em;\n    padding: 0 2em 0 var(--gap--small);\n    border-radius: 4px;\n    border: 0;\n\n    text-overflow: ellipsis;\n    white-space: nowrap;\n\n    font-family: var(--font-family);\n    font-size: 1em;\n}\n\nselect:hover {\n    background-color: transparent;\n}\n\nselect[disabled] {\n    background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"grey\" viewBox=\"0 0 960 560\"><path d=\"M480 344.2L268.9 131.9c-15.8-15.9-41.3-15.9-57.1 0 -15.8 15.9-15.8 41.6 0 57.4l237.6 238.9c8.4 8.5 19.6 12.3 30.6 11.7 11 0.6 22.2-3.2 30.6-11.7l237.6-238.9c15.8-15.9 15.8-41.6 0-57.4s-41.3-15.9-57.1 0L480 344.2z\"/></svg>');\n}\n\nselect[multiple] {\n    height: auto;\n}\n\nbutton {\n    display: inline-flex;\n    box-sizing: border-box;\n\n    height: var(--control-height);\n    padding: calc((var(--control-height) - 1em)/2 - 2px) 1.25em;\n\n    border-radius: 4px;\n    box-shadow: 0 -1px 0 0 rgba(0,0,0,0.3) inset;\n    border: 0;\n\n    background: var(--color-mono--200);\n    fill: var(--ui-color);\n    color: var(--ui-color);\n\n    font-size: 1em;\n    font-family: var(--font-family);\n    line-height: 1.25;\n    font-weight: 500;\n    letter-spacing: .01em;\n    cursor: pointer;\n}\n\nbutton[disabled] {\n    cursor: not-allowed;\n    color: var(--color-mono--500);\n    fill: var(--color-mono--500);\n    opacity: .7;\n}\n\nbutton:hover {\n    background: var(--color-mono--300);\n    color: var(--ui-color);\n}\n\n/* Base Typography elements */\n\nh1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big,\ncite, code, del, dfn, em, small, strike, strong, sub, sup, b, u, i,\ndl, dt, dd, ol, ul, li, label, legend {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    vertical-align: baseline;\n    box-sizing: border-box;\n}\n\np {\n    line-height: 1.5;\n    margin: .5em 0;\n}\n\nul {\n    list-style-type: disc;\n}\n\nol {\n    list-style-type: decimal;\n}\n\nli {\n    line-height: 1.5;\n    margin: 0 0 .65em 1.4em;\n    list-style-position: outside;\n}\n\na {\n    cursor: pointer;\n    color: var(--cta-color--accent);\n    text-decoration: underline;\n}\n\na:hover {\n    text-decoration: none;\n    color: var(--ui-color--secondary);\n}\n\nb {\n    font-weight: 600;\n}\n\nstrong {\n    font-weight: 700;\n}\n\ntime, code, pre {\n    font-family: var(--font-family--mono);\n    line-height: 1.6;\n    word-wrap: break-word;\n    word-break: break-word;\n}\n\ncode {\n    font-size: inherit;\n    font-weight: inherit;\n}\n\npre {\n    white-space: pre-wrap;\n}\n\nh1, h2, h3, h4, h5, h6 {\n    line-height: 1;\n    margin: 0 0 2rem;\n}\n\nh1 {\n    margin: 0 0 2rem;\n    font-size: 32px;\n    font-weight: 300;\n}\n\nh2 {\n    font-size: 25px;\n    line-height: 1;\n    font-weight: 300;\n}\n\nh3 {\n    font-size: 22px;\n    line-height: 1;\n    font-weight: 300;\n}\n\nh4 {\n    font-size: 18px;\n    font-weight: 500;\n}\n\nh5 {\n    font-size: 16px;\n    font-weight: 500;\n    margin: 0 0 1rem;\n}\n\nh6 {\n    font-size: 13px;\n    font-weight: 600;\n    margin: 0 0 1rem;\n}\n\nsmall {\n    line-height: 1;\n    font-size: 80%;\n}\n\nbig {\n    font-size: var(--font-size--large);\n}\n\nsub {\n    font-size: 70%;\n}\n\nmark {\n    background-color: var(--color-yellow--400);\n    border-radius: 2px;\n    box-shadow: 1px 0 0 var(--color-yellow--400), -1px 0 0 var(--color-yellow--400);\n}\n\n/* Core UI components */\n\n.button {\n    display: inline-flex;\n    box-sizing: border-box;\n    align-items: center;\n\n    padding: calc((var(--control-height) - 1em)/2 - 2px) 1.25em;\n    height: var(--control-height);\n    border-radius: 4px;\n    box-shadow: 0 -1px 0 0 rgba(0,0,0,0.3) inset;\n    border: 0;\n\n    background-color: var(--cta-color);\n    fill: var(--ui-color);\n    color: var(--ui-color);\n\n    font-size: var(--font-size);\n    font-family: var(--font-family);\n    line-height: 1;\n    font-weight: 500;\n    white-space: nowrap;\n    letter-spacing: .01em;\n    text-decoration: none;\n    cursor: pointer;\n}\n\n.button:visited {\n    color: var(--color--default);\n}\n\n.button:hover {\n    text-decoration: none;\n    background: var(--cta-color--active);\n    color: var(--ui-color);\n}\n\n.button:focus,\n.button:active {\n    border-color: #4A90E2;\n    box-shadow: 0 0 0 2px #ADD3FC;\n    outline: none;\n}\n\n.button[disabled] {\n    color: var(--color-mono--500);\n    fill: var(--color-mono--500);\n    opacity: .7;\n}\n\n.button--primary,\n.button--primary:visited {\n    background: var(--cta-color--accent);\n    color: white;\n}\n\n.button--primary:hover {\n    background: var(--cta-color--accent--active);\n    color: white;\n}\n\n.button--primary[disabled] {\n    color: var(--color-mono--400);\n}\n\n.button--secondary,\n.button--secondary:visited {\n    color: var(--cta-color--accent);\n    background: transparent;\n    box-shadow: 0 0 0 2px currentColor inset;\n}\n\n.button--secondary:hover {\n    background: transparent;\n    color: var(--cta-color--accent--active);\n}\n\n.button--secondary[disabled] {\n    color: var(--cta-color--accent);\n    background: transparent;\n}\n\n.button--accent,\n.button--accent:visited {\n    background: var(--color-brand-red--500);\n    color: white;\n}\n\n.button--accent:hover {\n    background: var(--color-brand-red--600);\n    color: white;\n}\n\n.button--accent[disabled] {\n    background: var(--color-brand-red--300);\n    color: var(--color-brand-red--400);\n}\n\n.button.frameless { color: var(--ui-color) }\n\n.button--primary.frameless { color: var(--ui-color--primary) }\n\n.button--secondary.frameless { color: var(--ui-color--secondary) }\n\n.button--accent.frameless { color: var(--ui-color--accent) }\n\n.button--dark-mode,\n.button--dark-mode:visited {\n    background: var(--cta-color--dark-mode);\n    box-shadow: 0 -1px 0 0 rgba(0,0,0,0.9) inset;\n    color: white;\n}\n\n.button--dark-mode:hover {\n    background: rgba(0,0,0,0.9);\n    color: white;\n}\n\n.button--dark-mode[disabled] {\n    color: white;\n}\n\n.button--flat {\n    box-shadow: none;\n}\n\n.button--small {\n    font-size: calc(var(--font-size) / 1.25);\n    height: var(--control-height--small);\n    padding: calc(var(--control-height--small)/2 - var(--font-size--small)/2 - 2px) .85em;\n}\n\n.button--large {\n    font-size: calc(var(--font-size) * 1.5);\n    height: var(--control-height--large);\n    padding: calc(var(--control-height--large)/2 - var(--font-size--large)/2 - 2px) 1.25em;\n    border-radius: calc(var(--border-radius) * 1.5);\n}\n\n.button--icon {\n    padding: 0;\n    width: calc(var(--control-height) * 1.2);\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n}\n\n.button--icon.button--large {\n    width: calc(var(--control-height--large) * 1.1);\n}\n\n.button--icon.button--small {\n    width: calc(var(--control-height--small) * 1.3);\n}\n\n.button__icon {\n    position: relative;\n    width: auto;\n    color: currentColor;\n    fill: currentColor;\n    margin-right: .3em;\n    left: -.1em;\n    flex-shrink: 0;\n    line-height: inherit;\n    vertical-align: baseline;\n}\n\n.button--icon svg,\n.button--icon .button__icon {\n    height: 1em;\n    fill: currentColor;\n    color: currentColor;\n    left: 0;\n    margin: 0;\n}\n\n.input {\n    display: inline-flex;\n    box-sizing: border-box;\n\n    height: var(--control-height);\n    align-items: center;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n\n    border-radius: var(--border-radius);\n    border: 1px solid var(--border-color);\n    box-shadow: 0 1px 2px rgba(2,36,102,.15) inset;\n}\n\n.input:hover {\n    border-color: var(--border-color--hover);\n}\n\n.input.frameless:hover {\n    border-color: transparent;\n}\n\n.input:focus,\n.input:focus-within {\n    border-color: #4A90E2;\n    box-shadow: 0 0 0 2px #ADD3FC;\n    outline: none;\n}\n\n.input input,\n.input textarea {\n    border: 0;\n    box-shadow: none;\n    flex: 1;\n    background: transparent;\n}\n\n.input--area {\n    height: auto;\n}\n\n.input--area--fixed {\n    resize: vertical;\n}\n\n.input * {\n    max-height: 100%;\n}\n\n.input .icon {\n    justify-content: center;\n    align-items: center;\n}\n\n.input--block {\n    display: block;\n    width: 100%;\n}\n\n.input[disabled] {\n    opacity: 0.5;\n    cursor: not-allowed;\n    pointer-events: none;\n}\n\n.toggle {\n    --toggle__width: 4em;\n    --toggle__height: 1em;\n\n    font-size: 1em;\n    display: inline-grid;\n    grid-gap: var(--gap--small);\n    align-items: center;\n    grid-auto-flow: column;\n    justify-self: start;\n}\n\n.toggle__toggler {\n    position: relative;\n    display: inline-block;\n    width: var(--toggle__width);\n    height: calc(2 * 3px + var(--toggle__height));\n    vertical-align: middle;\n}\n\n.toggle__label {\n    font-weight: 500;\n}\n\n.toggle__slider {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    display: inline-block;\n    margin: 0 !important;\n    padding: 0;\n    border-radius: var(--toggle__height);\n    cursor: pointer;\n    background-color: #888;\n    background-color: var(--color-mono--400);\n    transition: 0.4s;\n}\n\n.toggle__slider:before {\n    content: '';\n    position: absolute;\n    left: 3px;\n    bottom: 3px;\n    display: block;\n    height: var(--toggle__height);\n    width: var(--toggle__height);\n    border-radius: 50%;\n    background-color: #fff;\n    transition: 0.4s;\n}\n\n.toggle__input {\n    display: none;\n    visibility: hidden;\n}\n\n.toggle__slider--on {\n    background-color: var(--color-blue--500);\n}\n\n.toggle__slider--on:before {\n    transform: translateX(calc(var(--toggle__width) - var(--toggle__height) - 6px));\n}\n\n.toggle__slider:after {\n    position: absolute;\n    top: 3px;\n    bottom: 3px;\n    line-height: var(--toggle__height);\n    color: #fff;\n    height: var(--toggle__height);\n    width: calc(var(--toggle__width) - 2 * var(--toggle__height));\n}\n\n.toggle__slider--on:after {\n    content: 'On';\n    left: 6px;\n}\n\n.toggle__slider--off:after {\n    content: 'Off';\n    left: calc(var(--toggle__height) + 7px);\n    text-align: left;\n}\n\n.group {\n    display: inline-flex;\n    align-items: center;\n    max-width: 100%;\n}\n\n.group > * {\n    margin: 0;\n}\n\n.group--gap > * + * { margin-left: var(--gap) }\n\n.group--gap--small > * + * { margin-left: var(--gap--small) }\n\n.group--gap--large > * + * { margin-left: var(--gap--large) }\n\n.group--block {\n    display: flex;\n}\n\n.group--merged {\n    flex-wrap: nowrap;\n    align-items: stretch;\n    white-space: nowrap;\n    border-radius: var(--border-radius);\n}\n\n.group--merged > *:not(:last-child) {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n\n.group--merged > * + * {\n    margin-left: -1px;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n\n.group--merged--border > * + * {\n    border-left: 1px solid var(--border-color);\n}\n\n.group--semi-merged {\n    display: inline-grid;\n    grid-auto-flow: column;\n    grid-gap: 2px;\n    align-content: center;\n}\n\n.group--semi-merged > * {\n    border-radius: 0;\n}\n\n.group--semi-merged > *:first-child {\n    border-top-left-radius: var(--border-radius);\n    border-bottom-left-radius: var(--border-radius);\n}\n\n.group--semi-merged > *:last-child {\n    border-top-right-radius: var(--border-radius);\n    border-bottom-right-radius: var(--border-radius);\n}\n\n.box {\n    padding: var(--gap) 30px var(--gap) var(--gap--large);\n    border: 2px solid transparent;\n    line-height: 1.6;\n    border-radius: var(--border-radius);\n    font-weight: 400;\n    font-size: var(--font-size);\n    box-sizing: border-box;\n}\n\n.box--mono {\n    background: var(--color-mono--100);\n    color: var(--color-mono--500);\n}\n\n.box--cool {\n    background: var(--color-cool--100);\n    color: var(--color-cool--500);\n}\n\n.box--warm {\n    background: var(--color-warm--100);\n    color: var(--color-warm--500);\n}\n\n.box--blue {\n    background: var(--color-blue--100);\n    color: var(--color-blue--500);\n}\n\n.box--yellow {\n    background: var(--color-yellow--100);\n    color: var(--color-yellow--500);\n}\n\n.box--red {\n    background: var(--color-red--100);\n    color: var(--color-red--600);\n}\n\n.box--green {\n    background: var(--color-green--100);\n    color: var(--color-green--500);\n}\n\n.box--brand-red {\n    background: var(--color-brand-red--100);\n    color: var(--color-brand-red--500);\n}\n\n.box--brand-blue {\n    background: var(--color-brand-blue--100);\n    color: var(--color-brand-blue--500);\n}\n\n.box--outline {\n    border-color: currentColor;\n    background: transparent;\n}\n\n.box--small {\n    padding: var(--gap--small) var(--gap--large);\n    font-size: var(--font-size--small);\n}\n\n.box--large {\n    padding: var(--gap--large) calc(2 * var(--gap--large));\n    font-size: var(--font-size--large);\n}\n\n.box--panel {\n    padding: var(--gap);\n    line-height: 1.6;\n    font-size: var(--font-size);\n    color: var(--ui-color);\n}\n\n.box--panel--mono { background: var(--color-mono--200) }\n\n.box--panel--cool { background: var(--color-cool--200) }\n\n.box--panel--warm { background: var(--color-warm--200) }\n\n.box--panel--blue { background: var(--color-blue--200) }\n\n.box--panel--yellow { background: var(--color-yellow--200) }\n\n.box--panel--green { background: var(--color-green--200) }\n\n.box--panel--red { background: var(--color-red--200) }\n\n.box--panel--border {\n    border-radius: var(--border-radius);\n}\n\n.box--panel--small { padding: var(--gap--small) }\n\n.box--panel--large { padding: var(--gap--large) }\n\n.tabs {\n    display: flex;\n    align-items: baseline;\n    list-style: none;\n    border-bottom: var(--tab-slider-size) solid var(--color-warm--200);\n    margin: 0;\n}\n\n.tabs__item {\n    position: relative;\n    top: var(--tab-slider-size);\n    padding: var(--gap) var(--gap--large);\n    margin: 0 var(--gap--small) 0 0;\n    border-bottom: var(--tab-slider-size) solid var(--color-warm--200);\n    color: inherit;\n    font-size: 13px;\n    font-weight: 300;\n    text-decoration: none;\n    cursor: pointer;\n}\n\n.tabs__icon {\n    width: 1.5em;\n}\n\n.tabs__item:after {\n    content: '';\n    position: absolute;\n    display: block;\n    bottom: calc(-1 * var(--tab-slider-size));\n    left: 0;\n    height: var(--tab-slider-size);\n    width: 0%;\n    background: transparent;\n    border-radius: var(--tab-slider-size);\n    transition: width 0.4s;\n}\n\n.tabs__item--active {\n    font-weight: 500;\n}\n\n.tabs__item--active:after {\n    background: var(--tab-slider-color);\n    width: 100%;\n}\n\n.block {\n    padding: var(--gap);\n    line-height: 1.6;\n    font-size: var(--font-size);\n}\n\n.block--mono { background: var(--color-mono--200) }\n\n.block--cool { background: var(--color-cool--200) }\n\n.block--warm { background: var(--color-warm--200) }\n\n.block--blue { background: var(--color-blue--200) }\n\n.block--yellow { background: var(--color-yellow--200) }\n\n.block--green { background: var(--color-green--200) }\n\n.block--red { background: var(--color-red--200) }\n\n.block--border {\n    border-radius: var(--border-radius);\n}\n\n.block--small { padding: var(--gap--small) var(--gap) }\n\n.block--large { padding: var(--gap--large) }\n\n.badge {\n    display: inline-grid;\n    grid-gap: 4px;\n    grid-auto-flow: column;\n    align-items: center;\n    justify-content: start;\n\n    padding: 0 .8em;\n    box-sizing: border-box;\n\n    border-radius: 2px;\n\n    text-align: center;\n    white-space: nowrap;\n\n    letter-spacing: 0.6px;\n    font-weight: 500;\n\n    color: var(--ui-background);\n    background-color: var(--color-mono--500);\n    border: 0;\n    line-height: 2em;\n    font-size: inherit;\n    text-transform: uppercase;\n}\n\n.badge--inline {\n    line-height: inherit;\n    text-transform: initial;\n    font-size: .8em;\n    font-weight: 400;\n}\n\n.badge--production { background-color: var(--color-brand-red--500) }\n\n.badge--staging { background-color: var(--color-green--500) }\n\n.badge--mono { background-color: var(--color-mono--500) }\n\n.badge--cool { background-color: var(--color-cool--500) }\n\n.badge--warm { background-color: var(--color-warm--500) }\n\n.badge--blue { background-color: var(--color-blue--500) }\n\n.badge--brand-blue { background-color: var(--color-brand-blue--500) }\n\n.badge--yellow { background-color: var(--color-yellow--500) }\n\n.badge--red { background-color: var(--color-red--500) }\n\n.badge--brand-red { background-color: var(--color-brand-red--500) }\n\n.badge--green { background-color: var(--color-green--500) }\n\n.badge--mono--light {\n    background-color: var(--color-mono--400);\n    color: var(--ui-color);\n}\n\n.badge--cool--light {\n    background-color: var(--color-cool--400);\n    color: var(--ui-color);\n}\n\n.badge--warm--light {\n    background-color: var(--color-warm--400);\n    color: var(--ui-color);\n}\n\n.badge--blue--light {\n    background-color: var(--color-blue--400);\n    color: var(--ui-color);\n}\n\n.badge--yellow--light {\n    background-color: var(--color-yellow--400);\n    color: var(--ui-color);\n}\n\n.badge--red--light {\n    background-color: var(--color-red--400);\n    color: var(--ui-color);\n}\n\n.badge--green--light {\n    background-color: var(--color-green--400);\n    color: var(--ui-color);\n}\n\n.badge--brand-red--light {\n    background-color: var(--color-brand-red--400);\n    color: var(--ui-color);\n}\n\n.badge--brand-blue--light {\n    background-color: var(--color-brand-blue--400);\n    color: var(--ui-color);\n}\n\n.badge--outline {\n    box-shadow: 0 0 0 1px currentColor inset;\n    color: var(--color-mono--500);\n    background: transparent;\n}\n\n.badge--mono--outline {\n    color: var(--color-mono--600);\n    background: transparent;\n    box-shadow: 0 0 0 1px currentColor inset;\n}\n\n.badge--cool--outline {\n    color: var(--color-cool--600);\n    background: transparent;\n    box-shadow: 0 0 0 1px currentColor inset;\n}\n\n.badge--warm--outline {\n    color: var(--color-warm--600);\n    background: transparent;\n    box-shadow: 0 0 0 1px currentColor inset;\n}\n\n.badge--blue--outline {\n    color: var(--color-blue--600);\n    background: transparent;\n    box-shadow: 0 0 0 1px currentColor inset;\n}\n\n.badge--yellow--outline {\n    color: var(--color-yellow--600);\n    background: transparent;\n    box-shadow: 0 0 0 1px currentColor inset;\n}\n\n.badge--red--outline {\n    color: var(--color-red--600);\n    background: transparent;\n    box-shadow: 0 0 0 1px currentColor inset;\n}\n\n.badge--green--outline {\n    color: var(--color-green--600);\n    background: transparent;\n    box-shadow: 0 0 0 1px currentColor inset;\n}\n\n.badge--brand-red--outline {\n    color: var(--color-brand-red--600);\n    background: transparent;\n    box-shadow: 0 0 0 1px currentColor inset;\n}\n\n.badge--brand-blue--outline {\n    color: var(--color-brand-blue--600);\n    background: transparent;\n    box-shadow: 0 0 0 1px currentColor inset;\n}\n\n.badge--small {\n    line-height: calc(1.1 * var(--font-size));\n    height: calc(1.1 * var(--font-size));\n    font-size: var(--font-size--small)\n}\n\n.badge--large {\n    line-height: calc(2.75 * var(--font-size));\n    height: calc(2.75 * var(--font-size));\n    font-size: var(--font-size--large)\n}\n\n.badge--fixed {\n    min-width: 12ch;\n    max-width: 100%;\n}\n\n.badge--round {\n    min-width: 3ch;\n    padding: 0;\n    border-radius: 2.5em;\n    justify-content: center;\n}\n\n.badge--round.badge--small {\n    min-width: 15px;\n    font-size: 10px;\n}\n\n.badge--round.badge--large {\n    min-width: 2.8ch;\n}\n\n.loader {\n    height: var(--gap);\n    text-align: center;\n    display: inline-flex;\n}\n\n.loader--small { height: var(--gap--small) }\n\n.loader--large { height: var(--gap--large) }\n\n.loader__rect {\n    background: currentColor;\n    height: 100%;\n    width: 4px;\n    border-radius: 1.5px;\n    margin: 0 2px;\n\n    animation: loading 1s ease-in-out infinite;\n}\n\n.loader__rect2 {\n    animation-delay: -1.1s;\n}\n\n.loader__rect3 {\n    animation-delay: -1.0s;\n}\n\n.loader__rect4 {\n    animation-delay: -0.9s;\n}\n\n.loader__rect5 {\n    animation-delay: -0.8s;\n}\n\n@keyframes loading {\n    0% {\n        transform: scale(1);\n    }\n    20% {\n        transform: scale(1, 2.2);\n    }\n    40% {\n        transform: scale(1);\n    }\n}\n\n.spinner {\n    --spinner-size: 28;\n    animation: spin 1.3s infinite linear;\n    width: var(--control-height);\n    height: var(--control-height);\n}\n\n.spinner--small {\n    width: calc(.5 * var(--control-height));\n    height: calc(.5 * var(--control-height));\n}\n\n.spinner--large {\n    width: calc(2 * var(--control-height));\n    height: calc(2 * var(--control-height));\n}\n\n@keyframes spin {\n    0% {\n        transform:rotate(0deg)\n    }\n    to {\n        transform:rotate(1turn)\n    }\n}\n\n.progress-bar {\n    color: var(--color-cool--400);\n    display: flex;\n    position: relative;\n    min-width: 5vw;\n    font-size: 10px;\n    background: var(--color-cool--100);\n    box-shadow: 0 0 0 1px currentColor inset;\n    vertical-align: middle;\n    line-height: 15px;\n    border-radius: 0;\n    overflow: hidden;\n    border-radius: 1px;\n}\n\n.progress-bar--large {\n    line-height: 26px;\n    font-size: 15px;\n    border-radius: 3px;\n}\n\n.progress-bar__width {\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    width: 0;\n    background-color: var(--color-cool--400);\n    border-radius: inherit;\n    transition: width 1s;\n}\n\n.progress-bar__counter {\n    align-self: center;\n    margin-left: auto;\n    font-weight: 600;\n    padding: 0 var(--gap--small);\n    color: var(--color-mono--800);\n    z-index: 2;\n}\n\n.tag {\n    display: inline-flex;\n    align-items: stretch;\n    justify-content: center;\n    line-height: 1.75em;\n    width: auto;\n    color: var(--ui-color);\n    border-radius: 1px;\n    font-weight: 500;\n    margin-right: 4px;\n    background-color: var(--color-mono--200);\n}\n\n.tag__remover {\n    color: #fff;\n    border-left: 2px solid var(--ui-background);\n    padding: 0 var(--gap--small);\n}\n\n.tag__label {\n    padding: 0 var(--gap--small);\n}\n\n.tag--mono { background-color: var(--color-mono--400) }\n\n.tag--cool { background-color: var(--color-cool--400) }\n\n.tag--warm { background-color: var(--color-warm--400) }\n\n.tag--blue { background-color: var(--color-blue--400) }\n\n.tag--yellow { background-color: var(--color-yellow--400) }\n\n.tag--red { background-color: var(--color-red--400) }\n\n.tag--green { background-color: var(--color-green--400) }\n\n.tag--brand-red { background-color: var(--color-brand-red--400) }\n\n.tag--brand-blue { background-color: var(--color-brand-blue--400) }\n\n/* UI helpers */\n\n/*TEXT*/\n\n.text--mono { font-family: var(--font-family--mono) }\n\n.text--highlight {\n    background-color: var(--color-yellow--400);\n    padding: 3px 0;\n    border-radius: 2px;\n    box-shadow: 3px 0 0 var(--color-yellow--400), -3px 0 0 var(--color-yellow--400);\n}\n\n.text--truncate {\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    max-width: 100%;\n}\n\n.code {\n    color: var(--color-blue--500);\n    font-family: var(--font-family--mono);\n    background: var(--color-cool--200);\n    display: inline-block;\n    padding: 0 3px;\n    border-radius: 2px;\n    font-size: inherit;\n    font-weight: inherit;\n}\n\n.pre {\n    display: block;\n\n    font-family: var(--font-family--mono);\n    line-height: 1.6;\n    font-size: 1.1em;\n    font-weight: 400;\n    word-wrap: break-word;\n    word-break: break-word;\n    white-space: pre-wrap;\n\n    background: var(--color-cool--800);\n    color: white;\n    border-radius: var(--border-radius);\n    padding: var(--gap);\n    overflow-x: auto;\n}\n\n.no-caps { text-transform: initial }\n\n.all-caps { text-transform: uppercase }\n\n/*CONTROLS */\n\n.frameless {\n    border-color: transparent;\n    box-shadow: none;\n    background: transparent;\n}\n\n.frameless:hover {\n    background: var(--color-warm--200);\n}\n\n.select {\n    box-shadow: 0 0 0 1px var(--border-color);\n    box-shadow: 0 -1px 0 0 rgba(0,0,0,0.3) inset;\n    background-color: var(--color-mono--200);\n    height: 2em;\n    padding: 0 2em 0 .5em;\n    font-weight: 500;\n}\n\n/*GRID*/\n\n.grid {\n    display: grid;\n    align-items: start;\n    justify-items: start;\n    max-width: 100%;\n}\n\n.grid--gap { grid-gap: var(--gap) }\n\n.grid--gap--small { grid-gap: var(--gap--small) }\n\n.grid--gap--large { grid-gap: var(--gap--large) }\n\n.shift { margin-left: var(--control-height) }\n\n.shift--small { margin-left: var(--control-height--small) }\n\n.shift--large { margin-left: var(--control-height--large) }\n\n.icon {\n    display: inline-flex;\n    width: var(--control-height);\n    align-items: center;\n    justify-content: start;\n}\n\n.icon--small {\n    width: var(--control-height--small);\n    font-size: var(--font-size--small);\n}\n\n.icon--large {\n    width: var(--control-height--large);\n    font-size: var(--font-size--large);\n}\n\n/*BLOCKS*/\n\n.stretch {\n    width: 100%;\n    justify-items: stretch;\n}\n\n/* semantic foreground colours */\n\n.color--default { color: var(--ui-color) }\n\n.color--dark-mode { color: var(--ui-color--dark-mode) }\n\n.color--primary { color: var(--color-brand-red--500) }\n\n.color--secondary { color: var(--ui-color--secondary) }\n\n.color--muted { color: var(--ui-color--muted) }\n\n/* base foreground colours */\n\n.color--mono { color: var(--color-mono--500) }\n\n.color--cool { color: var(--color-cool--500) }\n\n.color--warm { color: var(--color-warm--500) }\n\n.color--blue { color: var(--color-blue--500) }\n\n.color--yellow { color: var(--color-yellow--500) }\n\n.color--green { color: var(--color-green--500) }\n\n.color--red { color: var(--color-red--500) }\n\n.color--brand-red { color: var(--color-brand-red--500) }\n\n.color--brand-blue { color: var(--color-brand-blue--500) }\n\n.color--mono--dark-mode { color: var(--color-mono--400) }\n\n.color--cool--dark-mode { color: var(--color-cool--400) }\n\n.color--warm--dark-mode { color: var(--color-warm--400) }\n\n.color--blue--dark-mode { color: var(--color-blue--400) }\n\n.color--yellow--dark-mode { color: var(--color-yellow--400) }\n\n.color--green--dark-mode { color: var(--color-green--400) }\n\n.color--red--dark-mode { color: var(--color-red--400) }\n\n.color--brand-red--dark-mode { color: var(--color-brand-red--400) }\n\n.color--brand-blue--dark-mode { color: var(--color-brand-blue--400) }\n\n/* semantic background colours */\n\n.bg--default { background: var(--ui-background) }\n\n.bg--dark-mode { background: var(--ui-background--dark-mode) }\n\n/* base background colours */\n\n.bg--mono { background: var(--color-mono--500) }\n\n.bg--cool { background: var(--color-cool--500) }\n\n.bg--warm { background: var(--color-warm--500) }\n\n.bg--blue { background: var(--color-blue--500) }\n\n.bg--yellow { background: var(--color-yellow--500) }\n\n.bg--green { background: var(--color-green--500) }\n\n.bg--red { background: var(--color-red--500) }\n\n.bg--brand-red { background: var(--color-brand-red--500) }\n\n.bg--brand-blue { background: var(--color-brand-blue--500) }\n\n.bg--mono--pale { background: var(--color-mono--000) }\n\n.bg--cool--pale { background: var(--color-cool--000) }\n\n.bg--warm--pale { background: var(--color-warm--000) }\n\n.bg--blue--pale { background: var(--color-blue--000) }\n\n.bg--yellow--pale { background: var(--color-yellow--000) }\n\n.bg--green--pale { background: var(--color-green--000) }\n\n.bg--red--pale { background: var(--color-red--000) }\n\n.bg--brand-red--pale { background: var(--color-brand-red--000) }\n\n.bg--brand-blue--pale { background: var(--color-brand-blue--000) }\n\n.bg--mono--light { background: var(--color-mono--400) }\n\n.bg--cool--light { background: var(--color-cool--400) }\n\n.bg--warm--light { background: var(--color-warm--400) }\n\n.bg--blue--light { background: var(--color-blue--400) }\n\n.bg--yellow--light { background: var(--color-yellow--400) }\n\n.bg--green--light { background: var(--color-green--400) }\n\n.bg--red--light { background: var(--color-red--400) }\n\n.bg--brand-red--light { background: var(--color-brand-red--400) }\n\n.bg--brand-blue--light { background: var(--color-brand-blue--400) }\n\n.bg--mono--dark { background: var(--color-mono--800) }\n\n.bg--cool--dark { background: var(--color-cool--800) }\n\n.bg--warm--dark { background: var(--color-warm--800) }\n\n.bg--blue--dark { background: var(--color-blue--800) }\n\n.bg--yellow--dark { background: var(--color-yellow--800) }\n\n.bg--green--dark { background: var(--color-green--800) }\n\n.bg--red--dark { background: var(--color-red--800) }\n\n.bg--brand-red--dark { background: var(--color-brand-red--800) }\n\n.bg--brand-blue--dark { background: var(--color-brand-blue--800) }\n\n/* Print CSS base */\n\n@media print {\n    body {\n        color: #000;\n        background: white;\n        width: 100%;\n        margin: 0;\n        padding: 0;\n    }\n\n    * {\n        print-color-adjust: exact;\n    }\n\n    .no-print {\n        display: none;\n    }\n\n    @page {\n        margin: 1.5cm;\n    }\n}\n\n.demo {\n    padding: 0 40px 0 80px;\n    display: grid;\n    grid-template-rows: 100vh;\n}\n\n.demo__snippet {\n    display: grid;\n    grid-gap: var(--gap);\n    background-color: var(--color-warm--100);\n    color: var(--color-cool--500);\n    border-radius: 3px;\n    padding: var(--gap);\n    font-size: 1em;\n    line-height: 1.6;\n    align-items: start;\n    width: 100%;\n}\n\n.demo__snippet-source {\n    color: var(--color-yellow--500);\n}\n\n.demo__snippet-code {\n    height: min-content;\n    white-space: pre-wrap;\n}\n\n/* Inbox */\n\nsection {\n    border-bottom: 0.5px solid var(--color-warm--300);\n    margin-bottom: var(--gap);\n    padding-bottom: var(--gap--large);\n}\n\nsection:last-of-type {\n    border-bottom: 0;\n}\n\nsection > header {\n    position: sticky;\n    top: 0;\n    left: 0;\n    z-index: 1;\n\n    background: rgba(255,255,255,.85);\n    padding: var(--gap--large) 0;\n\n    color: var(--color-blue--500);\n    margin: var(--gap--large) 0;\n\n    font-size: 25px;\n    line-height: 1;\n    font-weight: 300;\n}\n\narticle {\n    border-bottom: 0.5px dashed var(--color-warm--300);\n    padding-bottom: var(--gap--large);\n    margin: var(--gap--large) 0;\n    display: grid;\n    grid-gap: var(--gap);\n}\n\narticle:last-of-type {\n    border-bottom: 0;\n}\n\narticle > header {\n    color: var(--color-blue--500);\n\n    position: sticky;\n    top: 65px;\n    left: 0;\n    z-index: 1;\n\n    background: rgba(255,255,255,.85);\n    margin: var(--gap) 0 calc(2 * var(--gap--large));\n    padding: 0 0 var(--gap--large);\n\n    font-size: 18px;\n    line-height: 1;\n    font-weight: 300;\n}\n\n.navigation {\n    padding-top: 60px;\n}\n\n.navigation__headline {\n    display: grid;\n    grid-auto-flow: column;\n    grid-gap: var(--gap);\n    align-items: center;\n    justify-content: start;\n}\n\n.navigation__headline-logo {\n    display: inline-grid;\n}\n\n.navigation__headline-title {\n    line-height: 1;\n    font-size: 32px;\n    margin: 0;\n    padding: 0;\n}\n\n.navigation__menu {\n    position: sticky;\n    top: 0;\n    left: 0;\n    padding: var(--gap--large) 0;\n}\n\n.navigation__menu-item {\n    list-style-type: none;\n    display: inline-grid;\n    grid-gap: var(--gap--small);\n    align-items: baseline;\n    grid-auto-flow: column;\n    margin: 15px 30px 0 0;\n    font-size: 16px;\n    text-decoration: none;\n}\n\n.navigation__menu-icon {\n    width: 16px;\n    color: currentColor;\n}\n\n.navigation__up {\n    text-decoration: none;\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    padding: var(--gap--large);\n    display: grid;\n    grid-gap: var(--gap--small);\n    align-items: center;\n    justify-content: center;\n    justify-items: center;\n    font-size: var(--font-size--large);\n\n    color: var(--ui-color--muted);\n    font-size: var(--font-size--large);\n}")
;(function(){


module.exports = {
    data() {
        return {
            sections: {
                'colour': 'Colour',
                'typography': 'Typography',
                'buttons': 'Buttons',
                'inputs': 'Inputs',
                'badges': 'Badges',
                'tags': 'Tags',
                'containers': 'Containers',
                'loaders': 'Loaders'
            }
        };
    },

    components: {
        'navigation': require('./navigation.vue'),
        'colour': require('./sections/colour/index.vue'),
        'typography': require('./sections/typography/index.vue'),
        'buttons': require('./sections/button/index.vue'),
        'inputs': require('./sections/inputs/index.vue'),
        'badges': require('./sections/badge.vue'),
        'tags': require('./sections/tag.vue'),
        'containers': require('./sections/containers/index.vue'),
        'loaders': require('./sections/loaders/index.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"demo"},[_c('navigation',{attrs:{"sections":_vm.sections}}),_vm._v(" "),_c('div',{staticClass:"demo__container"},_vm._l((_vm.sections),function(sectionTitle,component){return _c('section',{key:component,staticClass:"section",class:_vm.activeItem === component ? 'section--active' : '',attrs:{"id":component}},[_c('header',[_vm._v(_vm._s(sectionTitle))]),_vm._v(" "),_c(component,{tag:"component"})],1)}))],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d7a7128", __vue__options__)
  } else {
    hotAPI.reload("data-v-3d7a7128", __vue__options__)
  }
})()}
},{"./navigation.vue":9,"./sections/badge.vue":10,"./sections/button/index.vue":13,"./sections/colour/index.vue":24,"./sections/containers/index.vue":30,"./sections/inputs/index.vue":32,"./sections/loaders/index.vue":37,"./sections/tag.vue":40,"./sections/typography/index.vue":43,"vue":6,"vue-hot-reload-api":5,"vueify/lib/insert-css":7}],9:[function(require,module,exports){
;(function(){


module.exports = {
    props: {
        sections: { type: Object, required: true }
    },

    created() {
        this.$nextTick(() => this.scrollToActive());
    },

    watch: {
        activeMenuItem(hash) {
            if (hash) {
                this.scrollToActive();
            }
        }
    },

    methods: {
        scrollToActive() {
            if (!this.activeMenuItem) {
                return;
            }

            try {
                const el = this.$el.querySelector('#' + this.activeMenuItem);
                if (el) {
                    el.scrollIntoViewIfNeeded();
                }
            } catch (err) {}
        }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"navigation",attrs:{"id":"top"}},[_c('div',{staticClass:"navigation__headline"},[_c('span',{staticClass:"navigation__headline-logo"},[_c('svg',{attrs:{"viewBox":"0 0 32.42 28.7","width":"42","fill":"currentColor"}},[_c('path',{attrs:{"d":"M16.8 14.3C16.8 11.2 19.3 8.7 22.5 8.7 25.6 8.7 28.1 11.2 28.1 14.3 28.1 17.5 25.6 20 22.5 20 19.3 20 16.8 17.5 16.8 14.3ZM4.3 14.3C4.3 11.2 6.9 8.7 10 8.7 13.1 8.7 15.7 11.2 15.7 14.3 15.7 17.5 13.1 20 10 20 6.9 20 4.3 17.5 4.3 14.3ZM25.1 1C24.7 0.4 24 0 23.3 0L9.1 0C8.4 0 7.7 0.4 7.4 1L0.3 13.3C-0.1 14-0.1 14.7 0.3 15.4L7.4 27.7C7.7 28.3 8.4 28.7 9.1 28.7L23.3 28.7C24 28.7 24.7 28.3 25.1 27.7L32.2 15.4C32.5 14.7 32.5 14 32.2 13.3L25.1 1ZM20.3 14.3C20.3 13.1 21.3 12.2 22.5 12.2 23.7 12.2 24.6 13.1 24.6 14.3 24.6 15.5 23.7 16.5 22.5 16.5 21.3 16.5 20.3 15.5 20.3 14.3ZM19.4 14.3C19.4 16 20.8 17.4 22.5 17.4 24.2 17.4 25.5 16 25.5 14.3 25.5 12.6 24.2 11.3 22.5 11.3 20.8 11.3 19.4 12.6 19.4 14.3ZM6.9 14.3C6.9 16 8.3 17.4 10 17.4 11.7 17.4 13.1 16 13.1 14.3 13.1 12.6 11.7 11.3 10 11.3 8.3 11.3 6.9 12.6 6.9 14.3Z"}})])]),_vm._v(" "),_vm._m(0)]),_vm._v(" "),_c('menu',{staticClass:"navigation__menu"},_vm._l((_vm.sections),function(section,key){return _c('a',{key:key,staticClass:"navigation__menu-item",class:{ 'navigation__menu-item--active': key === _vm.activeMenuItem },attrs:{"href":'#' + key},on:{"click":function($event){_vm.activeMenuItem = key}}},[_c('i',{staticClass:"fa navigation-icon",class:{
                'fas fa-paint-brush': key === 'colour',
                'fas fa-font': key === 'typography',
                'fas fa-hand-pointer': key === 'buttons',
                'fas fa-keyboard': key === 'inputs',
                'fas fa-columns': key === 'containers',
                'fas fa-certificate': key === 'badges',
                'fas fa-tag': key === 'tags',
                'fas fa-spinner': key === 'loaders',
                'fas fa-gift': key === 'other'
            }}),_vm._v("\n            "+_vm._s(section)+"\n        ")])})),_vm._v(" "),_vm._m(1)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h1',{staticClass:"navigation__headline-title"},[_c('b',[_vm._v("ubio")]),_vm._v(" "),_c('span',[_vm._v("CSS Framework")]),_vm._v(" "),_c('sub',{staticClass:"text--muted"},[_vm._v("v2.0")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"navigation__up",attrs:{"href":"#top","title":"UP!"}},[_c('i',{staticClass:"fas fa-angle-double-up"})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7ecdcaae", __vue__options__)
  } else {
    hotAPI.reload("data-v-7ecdcaae", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],10:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'badges'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('article',[_c('header',[_vm._v("Styling")]),_vm._v(" "),_c('spec',{attrs:{"name":"Foundation","code":".badge, .badge--outline","source":"badge.css"}},[_c('div',{staticClass:"grid grid--gap",staticStyle:{"grid-template-columns":"repeat(6, auto)"}},[_c('span',{staticClass:"badge badge--small"},[_vm._v("Small")]),_vm._v(" "),_c('span',{staticClass:"badge"},[_vm._v("Default")]),_vm._v(" "),_c('span',{staticClass:"badge badge--large"},[_vm._v("Large")]),_vm._v(" "),_c('span',{staticClass:"badge badge--outline badge--small"},[_vm._v("Small")]),_vm._v(" "),_c('span',{staticClass:"badge badge--outline"},[_vm._v("Default")]),_vm._v(" "),_c('span',{staticClass:"badge badge--outline badge--large"},[_vm._v("Large")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Custom","code":".badge.badge--yellow","hint":"Size is relative:\n<code>font-size</code>","source":"variables.css, badge.css"}},[_c('div',{staticClass:"group group--gap",staticStyle:{"font-size":"16px"}},[_c('span',{staticClass:"badge badge--yellow"},[_vm._v("PROCESSING")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Tinted","code":".badge.badge--[name]\n.badge.badge--[name]--light\n.badge.badge--outline.color--[name]","source":"badge.css"}},[_c('div',{staticClass:"grid grid--gap",staticStyle:{"grid-template-columns":"repeat(4, auto)"}},[_vm._l((['blue', 'yellow', 'red', 'green']),function(color){return _c('span',{key:color,staticClass:"badge badge--fixed all-caps",class:("badge--" + color)},[_vm._v("\n                    "+_vm._s(color)+"\n                ")])}),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--blue"},[_c('i',{staticClass:"fas fa-info-circle"}),_vm._v("\n                    info\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--green"},[_c('i',{staticClass:"fas fa-check-circle"}),_vm._v("\n                    success\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--yellow"},[_c('i',{staticClass:"fas fa-exclamation-triangle"}),_vm._v("\n                    warning\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--red"},[_c('i',{staticClass:"fas fa-exclamation-circle"}),_vm._v("\n                    failure\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--blue--light"},[_c('i',{staticClass:"fas fa-info-circle"}),_vm._v("\n                    info\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--green--light"},[_c('i',{staticClass:"fas fa-check-circle"}),_vm._v("\n                    success\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--yellow--light"},[_c('i',{staticClass:"fas fa-exclamation-triangle"}),_vm._v("\n                    warning\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--red--light"},[_c('i',{staticClass:"fas fa-exclamation-circle"}),_vm._v("\n                    failure\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--outline color--blue"},[_c('i',{staticClass:"fas fa-info-circle"}),_vm._v("\n                    info\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--outline color--green"},[_c('i',{staticClass:"fas fa-check-circle"}),_vm._v("\n                    success\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--outline color--yellow"},[_c('i',{staticClass:"fas fa-exclamation-triangle"}),_vm._v("\n                    warning\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge all-caps badge--outline color--red"},[_c('i',{staticClass:"fas fa-exclamation-circle"}),_vm._v("\n                    failure\n                ")])],2)]),_vm._v(" "),_c('spec',{attrs:{"name":"No caps","code":".badge.color--[name].no-caps\n.badge.no-caps","source":"badge.css"}},[_c('div',{staticClass:"grid grid--gap--small",staticStyle:{"grid-template-columns":"repeat(3, auto)"}},[_c('span',{staticClass:"badge no-caps bg--yellow"},[_vm._v("awaitingInput")]),_vm._v(" "),_c('span',{staticClass:"badge no-caps color--yellow badge--outline"},[_vm._v("awaitingTds")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Fixed width","code":".badge.color--[name].no-caps\n.badge.color--[name].badge--outline.no-caps","source":"badge.css"}},[_c('div',{staticClass:"grid grid--gap--small",staticStyle:{"grid-template-columns":"repeat(7, 1fr)"}},_vm._l((['blue', 'yellow', 'red', 'green']),function(colour){return _c('div',{staticClass:"grid grid--gap--small"},[_c('span',{staticClass:"badge no-caps badge--fixed",class:("bg--" + colour)},[_vm._v("\n                        "+_vm._s(colour)+"\n                    ")]),_vm._v(" "),_c('span',{staticClass:"badge no-caps badge--fixed",class:("bg--" + colour)},[_c('i',{staticClass:"fas fa-bullseye"}),_vm._v("\n                        "+_vm._s(colour)+"\n                    ")]),_vm._v(" "),_c('span',{staticClass:"badge no-caps badge--fixed badge--outline",class:("color--" + colour)},[_vm._v(_vm._s(colour))]),_vm._v(" "),_c('span',{staticClass:"badge no-caps badge--fixed badge--outline",class:("color--" + colour)},[_c('i',{staticClass:"fas fa-bullseye"}),_vm._v("\n                        "+_vm._s(colour)+"\n                    ")]),_vm._v(" "),_c('span',{staticClass:"badge badge--fixed",class:("bg--" + colour)},[_vm._v("\n                        "+_vm._s(colour)+"\n                    ")]),_vm._v(" "),_c('span',{staticClass:"badge badge--fixed",class:("bg--" + colour)},[_c('i',{staticClass:"fas fa-bullseye"}),_vm._v("\n                        "+_vm._s(colour)+"\n                    ")]),_vm._v(" "),_c('span',{staticClass:"badge badge--fixed badge--outline",class:("badge--outline--" + colour)},[_vm._v("\n                        "+_vm._s(colour)+"\n                    ")]),_vm._v(" "),_c('span',{staticClass:"badge badge--fixed badge--outline",class:("badge--outline--" + colour)},[_c('i',{staticClass:"fas fa-bullseye"}),_vm._v("\n                        "+_vm._s(colour)+"\n                    ")])])}))]),_vm._v(" "),_c('spec',{attrs:{"name":"In-table small badge","code":".badge.badge--inline.badge--blue--outline","source":"badge.css"}},[_c('div',{staticClass:"box box--mono"},[_c('span',{staticClass:"badge badge--inline badge--blue--outline"},[_vm._v("\n                    c69\n                ")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Environment","code":".badge.badge--production\n.badge.badge--staging","source":"badge.css"}},[_c('div',{staticClass:"grid grid--gap--small",staticStyle:{"grid-template-columns":"repeat(7, 1fr)"}},[_c('span',{staticClass:"badge badge--production"},[_vm._v("\n                    production\n                ")]),_vm._v(" "),_c('span',{staticClass:"badge badge--staging"},[_vm._v("\n                    staging\n                ")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Round","code":".badge.badge--round","source":"badge.css"}},[_c('div',{staticClass:"group group--gap--large"},[_c('span',{staticClass:"badge badge--large badge--production badge--round"},[_vm._v("p")]),_vm._v(" "),_c('span',{staticClass:"badge badge--large badge--staging badge--round"},[_vm._v("s")]),_vm._v(" "),_c('span',{staticClass:"badge badge--production badge--round"},[_vm._v("p")]),_vm._v(" "),_c('span',{staticClass:"badge badge--staging badge--round"},[_vm._v("s")]),_vm._v(" "),_c('span',{staticClass:"badge badge--small badge--production badge--round"},[_vm._v("p")]),_vm._v(" "),_c('span',{staticClass:"badge badge--small badge--staging badge--round"},[_vm._v("s")])])])],1)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-030025c8", __vue__options__)
  } else {
    hotAPI.reload("data-v-030025c8", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],11:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'button-base-size'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',[_c('spec',{attrs:{"name":"Base pure HTML button","code":"button, button:disabled","source":"base.css"}},[_c('div',{staticClass:"group group--gap"},[_c('button',[_vm._v("Base button")]),_vm._v(" "),_c('button',{attrs:{"disabled":""}},[_vm._v("Base button disabled")])])]),_vm._v(" "),_c('spec',{attrs:{"name":".button","code":"a.button\na.button[disabled]","source":"button.css"}},[_c('div',{staticClass:"group group--gap"},[_c('a',{staticClass:"button"},[_vm._v("Link as a button")]),_vm._v(" "),_c('a',{staticClass:"button",attrs:{"disabled":""}},[_vm._v("Disabled link as a button")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Small, normal & large scalers","code":".button.button--small\n.button\n.button.button--large","source":"button.css"}},[_c('div',{staticClass:"group group--gap"},[_c('a',{staticClass:"button button--small"},[_vm._v("Small")]),_vm._v(" "),_c('a',{staticClass:"button"},[_vm._v("Regular")]),_vm._v(" "),_c('a',{staticClass:"button button--large"},[_vm._v("Large")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Custom size & colour","code":".button, .button--small, .button--large","hint":"Amend variables:\n<code>--cta-color--default</code>\n<code>--cta-color--default--active</code>\n<code>--font-size</code>","source":"variables.css, button.css"}},[_c('div',{staticClass:"group group--gap",staticStyle:{"--font-size":"16px"}},[_c('a',{staticClass:"button button--small"},[_vm._v("Small button")]),_vm._v(" "),_c('a',{staticClass:"button"},[_vm._v("Regular button")]),_vm._v(" "),_c('a',{staticClass:"button button--large"},[_vm._v("Large button")])])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62686e77", __vue__options__)
  } else {
    hotAPI.reload("data-v-62686e77", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],12:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'button-sets'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',[_c('header',[_vm._v("Groups")]),_vm._v(" "),_c('spec',{attrs:{"name":"Merged together","code":".group.group--merged","source":"group.css"}},[_c('div',{staticClass:"grid"},[_c('div',{staticClass:"group group--merged"},[_c('button',{staticClass:"button button--accent"},[_vm._v("All")]),_vm._v(" "),_c('button',{staticClass:"button"},[_vm._v("Live")]),_vm._v(" "),_c('button',{staticClass:"button"},[_vm._v("Test")])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Merged together with border","code":".group.group--merged.group--merged--border","source":"group.css"}},[_c('div',{staticClass:"grid"},[_c('div',{staticClass:"group group--merged group--merged--border"},[_c('button',{staticClass:"button button--accent"},[_vm._v("All")]),_vm._v(" "),_c('button',{staticClass:"button"},[_vm._v("Live")]),_vm._v(" "),_c('button',{staticClass:"button"},[_vm._v("Test")])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Merged with a space between","code":".group.group--semi-merged","source":"group.css"}},[_c('div',{staticClass:"grid grid--gap--large",staticStyle:{"grid-template-columns":"1fr 1fr"}},[_c('div',{staticClass:"group group--semi-merged"},[_c('button',{staticClass:"button"},[_vm._v("All")]),_vm._v(" "),_c('button',{staticClass:"button"},[_vm._v("Live")]),_vm._v(" "),_c('button',{staticClass:"button button--accent"},[_vm._v("Test")])]),_vm._v(" "),_c('div',{staticClass:"group group--semi-merged"},[_c('button',{staticClass:"button button--icon"},[_c('svg',{attrs:{"viewBox":"0 0 15 16"}},[_c('path',{attrs:{"fill":"currentColor","d":"M3.5,12.9761811 L11.6666667,12.9761811 L11.6666667,10.6428478 L3.5,10.6428478 L3.5,12.9761811 Z M3.5,7.14284778 L11.6666667,7.14284778 L11.6666667,3.64284778 L10.2083333,3.64284778 C9.72526042,3.64284778 9.33333333,3.25092069 9.33333333,2.76784778 L9.33333333,1.30951444 L3.5,1.30951444 L3.5,7.14284778 Z M14,7.72618111 C14,7.40717069 13.7356771,7.14284778 13.4166667,7.14284778 C13.0976563,7.14284778 12.8333333,7.40717069 12.8333333,7.72618111 C12.8333333,8.04519153 13.0976563,8.30951444 13.4166667,8.30951444 C13.7356771,8.30951444 14,8.04519153 14,7.72618111 Z M15.1666667,7.72618111 L15.1666667,11.5178478 C15.1666667,11.6727957 15.0299479,11.8095144 14.875,11.8095144 L12.8333333,11.8095144 L12.8333333,13.2678478 C12.8333333,13.7509207 12.4414062,14.1428478 11.9583333,14.1428478 L3.20833333,14.1428478 C2.72526042,14.1428478 2.33333333,13.7509207 2.33333333,13.2678478 L2.33333333,11.8095144 L0.291666667,11.8095144 C0.13671875,11.8095144 0,11.6727957 0,11.5178478 L0,7.72618111 C0,6.76914986 0.79296875,5.97618111 1.75,5.97618111 L2.33333333,5.97618111 L2.33333333,1.01784778 C2.33333333,0.53477486 2.72526042,0.142847776 3.20833333,0.142847776 L9.33333333,0.142847776 C9.81640625,0.142847776 10.4817708,0.416285276 10.828125,0.762639443 L12.2135417,2.14805611 C12.5598958,2.49441028 12.8333333,3.15977486 12.8333333,3.64284778 L12.8333333,5.97618111 L13.4166667,5.97618111 C14.3736979,5.97618111 15.1666667,6.76914986 15.1666667,7.72618111 Z"}})])]),_vm._v(" "),_c('button',{staticClass:"button button--icon"},[_c('svg',{attrs:{"viewBox":"0 0 15 16"}},[_c('g',{attrs:{"transform":"translate(-709.000000, -561.000000)"}},[_c('path',{attrs:{"fill":"currentColor","d":"M721.331891,572.620595 C720.98011,572.679226 720.618557,572.708541 720.257004,572.708541 C716.631701,572.708541 713.690418,569.767258 713.690418,566.141955 C713.690418,564.900949 714.051971,563.689257 714.706676,562.653457 C712.107402,563.425421 710.250778,565.809717 710.250778,568.643511 C710.250778,572.092923 713.055257,574.897402 716.504669,574.897402 C718.390608,574.897402 720.159287,574.037492 721.331891,572.620595 Z M723.315547,571.79 C722.094084,574.438132 719.416637,576.148181 716.504669,576.148181 C712.371238,576.148181 709,572.776943 709,568.643511 C709,564.588254 712.175804,561.29519 716.22129,561.148614 C716.494897,561.138842 716.719647,561.29519 716.817364,561.529711 C716.924852,561.774003 716.856451,562.057383 716.670788,562.233273 C715.556814,563.249531 714.941196,564.637113 714.941196,566.141955 C714.941196,569.073466 717.325492,571.457762 720.257004,571.457762 C721.028968,571.457762 721.771618,571.291643 722.484952,570.959405 C722.729245,570.851917 723.002853,570.900775 723.188515,571.086438 C723.374178,571.2721 723.423036,571.555479 723.315547,571.79 Z"}})])])]),_vm._v(" "),_c('button',{staticClass:"button button--icon"},[_c('svg',{attrs:{"viewBox":"0 0 16 16"}},[_c('g',{attrs:{"transform":"translate(-695.000000, -561.000000)"}},[_c('path',{attrs:{"d":"M705.590948,561.026 L710.926,561.026 L710.926,566.361052 L708.812598,566.361052 L708.812598,563.139402 L705.590948,563.139402 L705.590948,561.026 Z M708.812598,573.912598 L708.812598,570.690948 L710.926,570.690948 L710.926,576.026 L705.590948,576.026 L705.590948,573.912598 L708.812598,573.912598 Z M695.926,566.361052 L695.926,561.026 L701.261052,561.026 L701.261052,563.139402 L698.039402,563.139402 L698.039402,566.361052 L695.926,566.361052 Z M698.039402,570.690948 L698.039402,573.912598 L701.261052,573.912598 L701.261052,576.026 L695.926,576.026 L695.926,570.690948 L698.039402,570.690948 Z"}})])])])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Pagination","code":".group.group--gap--small","source":"group.css"}},[_c('div',{staticClass:"grid grid--gap-small"},[_c('div',{staticClass:"group group--gap--small"},[_c('a',{staticClass:"button button--flat button--icon",attrs:{"disabled":""}},[_c('svg',{attrs:{"width":"8","height":"10"}},[_c('path',{attrs:{"d":"M5.4 8.4C5.4 8.4 5.4 8.5 5.3 8.6L4.9 9C4.8 9.1 4.7 9.1 4.7 9.1 4.6 9.1 4.5 9.1 4.4 9L0.3 4.9C0.2 4.8 0.2 4.7 0.2 4.7 0.2 4.6 0.2 4.5 0.3 4.4L4.4 0.3C4.5 0.2 4.6 0.2 4.7 0.2 4.7 0.2 4.8 0.2 4.9 0.3L5.3 0.7C5.4 0.8 5.4 0.9 5.4 0.9 5.4 1 5.4 1.1 5.3 1.1L1.8 4.7 5.3 8.2C5.4 8.2 5.4 8.3 5.4 8.4ZM8.8 8.4C8.8 8.4 8.8 8.5 8.7 8.6L8.3 9C8.2 9.1 8.2 9.1 8.1 9.1 8 9.1 7.9 9.1 7.9 9L3.7 4.9C3.7 4.8 3.6 4.7 3.6 4.7 3.6 4.6 3.7 4.5 3.7 4.4L7.9 0.3C7.9 0.2 8 0.2 8.1 0.2 8.2 0.2 8.2 0.2 8.3 0.3L8.7 0.7C8.8 0.8 8.8 0.9 8.8 0.9 8.8 1 8.8 1.1 8.7 1.1L5.2 4.7 8.7 8.2C8.8 8.2 8.8 8.3 8.8 8.4Z"}})])]),_vm._v(" "),_c('a',{staticClass:"button button--flat button--icon",attrs:{"disabled":""}},[_c('svg',{attrs:{"width":"5","height":"10"}},[_c('path',{attrs:{"d":"M5.4 0.9C5.4 1 5.4 1.1 5.3 1.1L1.8 4.7 5.3 8.2C5.4 8.2 5.4 8.3 5.4 8.4 5.4 8.4 5.4 8.5 5.3 8.6L4.9 9C4.8 9.1 4.7 9.1 4.7 9.1 4.6 9.1 4.5 9.1 4.5 9L0.3 4.9C0.2 4.8 0.2 4.7 0.2 4.7 0.2 4.6 0.2 4.5 0.3 4.5L4.5 0.3C4.5 0.2 4.6 0.2 4.7 0.2 4.7 0.2 4.8 0.2 4.9 0.3L5.3 0.7C5.4 0.8 5.4 0.9 5.4 0.9Z"}})])]),_vm._v(" "),_c('div',{staticClass:"group"},[_c('a',{staticClass:"button button--icon frameless",attrs:{"disabled":"disabled"}},[_vm._v("\n                        1\n                    ")]),_c('a',{staticClass:"button button--icon frameless"},[_vm._v("\n                        2\n                    ")]),_c('a',{staticClass:"button button--icon frameless"},[_vm._v("\n                        3\n                    ")]),_c('a',{staticClass:"button button--icon frameless"},[_vm._v("\n                        4\n                    ")]),_c('a',{staticClass:"button button--icon frameless"},[_vm._v("\n                        5\n                    ")])]),_vm._v(" "),_c('a',{staticClass:"button button--flat button--icon"},[_c('svg',{staticClass:"pagination__arrow-icon",attrs:{"width":"5","height":"10"}},[_c('path',{attrs:{"d":"M5.3 4.7C5.3 4.7 5.2 4.8 5.2 4.9L1 9C1 9.1 0.9 9.1 0.8 9.1 0.7 9.1 0.6 9.1 0.6 9L0.1 8.6C0.1 8.5 0.1 8.5 0.1 8.4 0.1 8.3 0.1 8.2 0.1 8.2L3.7 4.7 0.1 1.1C0.1 1.1 0.1 1 0.1 0.9 0.1 0.9 0.1 0.8 0.1 0.7L0.6 0.3C0.6 0.2 0.7 0.2 0.8 0.2 0.9 0.2 1 0.2 1 0.3L5.2 4.5C5.2 4.5 5.3 4.6 5.3 4.7Z"}})])]),_vm._v(" "),_c('a',{staticClass:"button button--flat button--icon"},[_c('svg',{staticClass:"pagination__arrow-icon",attrs:{"width":"8","height":"10"}},[_c('path',{attrs:{"d":"M5.3 4.7C5.3 4.7 5.2 4.8 5.2 4.9L1 9C1 9.1 0.9 9.1 0.8 9.1 0.7 9.1 0.6 9.1 0.6 9L0.1 8.6C0.1 8.5 0.1 8.4 0.1 8.4 0.1 8.3 0.1 8.2 0.1 8.2L3.7 4.7 0.1 1.1C0.1 1.1 0.1 1 0.1 0.9 0.1 0.9 0.1 0.8 0.1 0.7L0.6 0.3C0.6 0.2 0.7 0.2 0.8 0.2 0.9 0.2 1 0.2 1 0.3L5.2 4.4C5.2 4.5 5.3 4.6 5.3 4.7ZM8.7 4.7C8.7 4.7 8.6 4.8 8.6 4.9L4.4 9C4.4 9.1 4.3 9.1 4.2 9.1 4.2 9.1 4.1 9.1 4 9L3.6 8.6C3.5 8.5 3.5 8.4 3.5 8.4 3.5 8.3 3.5 8.2 3.6 8.2L7.1 4.7 3.6 1.1C3.5 1.1 3.5 1 3.5 0.9 3.5 0.9 3.5 0.8 3.6 0.7L4 0.3C4.1 0.2 4.2 0.2 4.2 0.2 4.3 0.2 4.4 0.2 4.4 0.3L8.6 4.4C8.6 4.5 8.7 4.6 8.7 4.7Z"}})])])])])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33a39fc9", __vue__options__)
  } else {
    hotAPI.reload("data-v-33a39fc9", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],13:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'buttons',

    components: {
        'base-size': require('./base-size.vue'),
        'button-styles': require('./styles.vue'),
        'button-groups': require('./button-groups.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('base-size'),_vm._v(" "),_c('button-styles'),_vm._v(" "),_c('button-groups')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6de3104c", __vue__options__)
  } else {
    hotAPI.reload("data-v-6de3104c", __vue__options__)
  }
})()}
},{"./base-size.vue":11,"./button-groups.vue":12,"./styles.vue":20,"vue":6,"vue-hot-reload-api":5}],14:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'button-styles-accent'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('spec',{attrs:{"name":"Accent","code":".button.button--accent","hint":"To use with sets","source":"button.css"}},[_c('div',{staticClass:"group group--gap--large"},[_c('div',{staticClass:"box box--mono group group--semi-merged"},[_c('button',{staticClass:"button button--accent"},[_vm._v("All")]),_vm._v(" "),_c('button',{staticClass:"button"},[_vm._v("Live")]),_vm._v(" "),_c('button',{staticClass:"button"},[_vm._v("Test")])]),_vm._v(" "),_c('div',{staticClass:"box bg--cool--dark group group--semi-merged"},[_c('button',{staticClass:"button button--accent"},[_vm._v("All")]),_vm._v(" "),_c('button',{staticClass:"button button--dark-mode"},[_vm._v("Live")]),_vm._v(" "),_c('button',{staticClass:"button button--dark-mode"},[_vm._v("Test")])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c9f49fe2", __vue__options__)
  } else {
    hotAPI.reload("data-v-c9f49fe2", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],15:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'button-styles-flat'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('spec',{attrs:{"name":"Flat button","code":".button.button--flat","source":"button.css"}},[_c('div',{staticClass:"group group--gap"},[_c('a',{staticClass:"button button--flat button--small"},[_vm._v("Small")]),_vm._v(" "),_c('a',{staticClass:"button button--flat"},[_vm._v("Regular")]),_vm._v(" "),_c('a',{staticClass:"button button--flat button--primary"},[_vm._v("Primary")]),_vm._v(" "),_c('a',{staticClass:"button button--secondary button--primary"},[_vm._v("Secondary")]),_vm._v(" "),_c('a',{staticClass:"button button--flat button--large"},[_vm._v("Large")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f78927e", __vue__options__)
  } else {
    hotAPI.reload("data-v-6f78927e", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],16:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'button-styles-icon-only'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('spec',{attrs:{"name":"Icon only","code":"button.button--icon\n    i.fas | svg","source":"button.css"}},[_c('div',{staticClass:"grid grid--gap--large"},[_c('div',{staticClass:"group group--gap box box--cool"},[_c('a',{staticClass:"button button--icon button--large"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--primary button--icon button--large"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--secondary button--icon button--large"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--icon"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--primary button--icon"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--secondary button--icon"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--icon button--small"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--primary button--icon button--small"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--secondary button--icon button--small"},[_c('i',{staticClass:"fas fa-bullseye"})])]),_vm._v(" "),_c('div',{staticClass:"group group--gap box bg--cool--dark"},[_c('a',{staticClass:"button button--dark-mode button--icon button--large"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--primary button--icon button--large"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--secondary button--icon button--large"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--dark-mode button--icon"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--primary button--icon"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--secondary button--icon"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--dark-mode button--icon button--small"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--primary button--icon button--small"},[_c('i',{staticClass:"fas fa-bullseye"})]),_vm._v(" "),_c('a',{staticClass:"button button--secondary button--icon button--small"},[_c('i',{staticClass:"fas fa-bullseye"})])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c7bbbb6a", __vue__options__)
  } else {
    hotAPI.reload("data-v-c7bbbb6a", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],17:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'button-styles-icon-within'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('spec',{attrs:{"name":"Icon within","code":".button\n    .button__icon.fas.fa-bullseye\n    ...","source":"button.css"}},[_c('div',{staticClass:"grid grid--gap--large"},[_c('div',{staticClass:"grid grid--gap",staticStyle:{"grid-template-columns":"repeat(7, auto)"}},[_c('a',{staticClass:"button button--large"},[_c('i',{staticClass:"button__icon fas fa-bullseye"}),_vm._v("\n                Large\n            ")]),_vm._v(" "),_c('a',{staticClass:"button"},[_c('i',{staticClass:"button__icon fas fa-bullseye"}),_vm._v("\n                Regular\n            ")]),_vm._v(" "),_c('a',{staticClass:"button button--small"},[_c('i',{staticClass:"button__icon fas fa-bullseye"}),_vm._v("\n                Small\n            ")])]),_vm._v(" "),_c('div',{staticClass:"grid grid--gap",staticStyle:{"grid-template-columns":"repeat(7, auto)"}},[_c('a',{staticClass:"button button--primary button--large"},[_c('i',{staticClass:"button__icon fas fa-bullseye"}),_vm._v("\n                Large\n            ")]),_vm._v(" "),_c('a',{staticClass:"button button--primary"},[_c('i',{staticClass:"button__icon fas fa-bullseye"}),_vm._v("\n                Regular\n            ")]),_vm._v(" "),_c('a',{staticClass:"button button--primary button--small"},[_c('i',{staticClass:"button__icon fas fa-bullseye"}),_vm._v("\n                Small\n            ")])]),_vm._v(" "),_c('div',{staticClass:"grid grid--gap",staticStyle:{"grid-template-columns":"repeat(7, auto)"}},[_c('a',{staticClass:"button button--secondary button--large"},[_c('i',{staticClass:"button__icon fas fa-bullseye"}),_vm._v("\n                Large\n            ")]),_vm._v(" "),_c('a',{staticClass:"button button--secondary"},[_c('i',{staticClass:"button__icon fas fa-bullseye"}),_vm._v("\n                Regular\n            ")]),_vm._v(" "),_c('a',{staticClass:"button button--secondary button--small"},[_c('i',{staticClass:"button__icon fas fa-bullseye"}),_vm._v("\n                Small\n            ")])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0e166c6c", __vue__options__)
  } else {
    hotAPI.reload("data-v-0e166c6c", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],18:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'button-styles-primary-secondary-custom'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('spec',{attrs:{"name":"Primary & Secondary custom","code":".button.button--primary\n.button.button--secondary","hint":"Amend variables:\n<code>--cta-color--accent</code>\n<code>--cta-color--accent--active</code>\n<code>--font-size</code>","source":"variables.css, button.css"}},[_c('div',{staticClass:"group group--gap",staticStyle:{"--cta-color--accent--active":"var(--color-brand-red--600)","--cta-color--accent":"var(--color-brand-red--500)","--font-size":"16px"}},[_c('a',{staticClass:"button button--primary"},[_vm._v("Primary")]),_vm._v(" "),_c('a',{staticClass:"button button--secondary"},[_vm._v("Secondary")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b0d42da", __vue__options__)
  } else {
    hotAPI.reload("data-v-7b0d42da", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],19:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'button-styles-primary-secondary'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('spec',{attrs:{"name":"Primary & Secondary","code":".button.button--primary\n.button.button--secondary","hint":"There supposed to be only one primary action per context","source":"button.css"}},[_c('div',{staticClass:"group group--gap"},[_c('a',{staticClass:"button button--primary"},[_vm._v("Primary")]),_vm._v(" "),_c('a',{staticClass:"button button--secondary"},[_vm._v("Secondary")]),_vm._v(" "),_c('a',{staticClass:"button button--primary",attrs:{"disabled":""}},[_vm._v("Disabled primary")]),_vm._v(" "),_c('a',{staticClass:"button button--secondary",attrs:{"disabled":""}},[_vm._v("Disabled secondary")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b5f01b4", __vue__options__)
  } else {
    hotAPI.reload("data-v-6b5f01b4", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],20:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'button-styles',

    components: {
        'styles-primary-secondary': require('./styles-primary-secondary.vue'),
        'styles-primary-secondary-custom': require('./styles-primary-secondary-custom.vue'),
        'styles-flat': require('./styles-flat.vue'),
        'styles-accent': require('./styles-accent.vue'),
        'styles-icon-within': require('./styles-icon-within.vue'),
        'styles-icon-only': require('./styles-icon-only.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',[_c('header',[_vm._v("Styles")]),_vm._v(" "),_c('styles-primary-secondary'),_vm._v(" "),_c('styles-flat'),_vm._v(" "),_c('styles-accent'),_vm._v(" "),_c('styles-primary-secondary-custom'),_vm._v(" "),_c('styles-icon-within'),_vm._v(" "),_c('styles-icon-only')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2dfbd8d8", __vue__options__)
  } else {
    hotAPI.reload("data-v-2dfbd8d8", __vue__options__)
  }
})()}
},{"./styles-accent.vue":14,"./styles-flat.vue":15,"./styles-icon-only.vue":16,"./styles-icon-within.vue":17,"./styles-primary-secondary-custom.vue":18,"./styles-primary-secondary.vue":19,"vue":6,"vue-hot-reload-api":5}],21:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'bg--dark'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"article"},[_c('header',{staticClass:"article__title"},[_vm._v("Dark background")]),_vm._v(" "),_c('spec',{attrs:{"name":"Grey colors","code":".color--[name]\n.bg--[name]--dark","source":"color.css, bg.css"}},[_c('div',{staticClass:"grid grid--gap",staticStyle:{"align-items":"stretch","grid-template-columns":"1fr 1fr 1fr"}},_vm._l((_vm.$root.colorsGrey),function(color){return _c('div',{key:color},[_c('div',{staticClass:"box--panel",class:("bg--" + color + "--dark color--" + color)},[_c('p',[_c('span',{staticClass:"badge badge--fixed badge--outline",class:("color--" + color)},[_vm._v(_vm._s(color))]),_vm._v(" "),_c('span',{staticClass:"badge badge--fixed",class:("badge--" + color)},[_vm._v(_vm._s(color))]),_vm._v(" "),_c('span',{staticClass:"badge badge--fixed",class:("badge--" + color + "--light")},[_vm._v(_vm._s(color))])]),_vm._v(" "),_c('p',{staticClass:"color--dark-mode"},[_c('b',[_vm._v("Inversed text")]),_vm._v(". Eu sodales neque.\n                    ")]),_vm._v(" "),_c('p',{staticClass:"color--muted"},[_c('b',[_vm._v("Muted text")]),_vm._v(".\n                        Ut non "),_c('a',[_vm._v("link")]),_vm._v(" mauris, eu "),_c('mark',[_vm._v("highlight")]),_vm._v("\n                        neque.\n                    ")]),_vm._v(" "),_c('p',[_c('small',{staticClass:"color--red"},[_vm._v("99.999%")]),_vm._v(" "),_c('span',{staticClass:"color--red"},[_vm._v("50.00%")]),_vm._v(" "),_c('big',{staticClass:"color--red"},[_vm._v("99.99%")]),_c('br'),_vm._v(" "),_c('big',{staticClass:"color--yellow"},[_vm._v("99.99%")]),_vm._v(" "),_c('span',{staticClass:"color--yellow"},[_vm._v("50.00%")]),_vm._v(" "),_c('small',{staticClass:"color--yellow"},[_vm._v("99.999%")]),_c('br'),_vm._v(" "),_c('small',{staticClass:"color--green"},[_vm._v("99.999%")]),_vm._v(" "),_c('span',{staticClass:"color--green"},[_vm._v("50.00%")]),_vm._v(" "),_c('big',{staticClass:"color--green"},[_vm._v("99.99%")])],1),_vm._v(" "),_c('p',[_c('button',{staticClass:"button--primary"},[_vm._v("Primary")]),_vm._v(" "),_c('button',{staticClass:"button--secondary"},[_vm._v("Secondary")])]),_vm._v(" "),_c('p',[_c('button',[_vm._v("Default")]),_vm._v(" "),_c('button',{staticClass:"button--dark-mode"},[_vm._v("Default")]),_vm._v(" "),_c('i',{staticClass:"color--primary fas fa-bullseye"}),_vm._v(" "),_c('i',{staticClass:"color--secondary fas fa-bullseye"}),_vm._v(" "),_c('i',{staticClass:"color--muted fas fa-bullseye"})])])])}))])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4924e892", __vue__options__)
  } else {
    hotAPI.reload("data-v-4924e892", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],22:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'bg--pale'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"article"},[_c('header',{staticClass:"article__title"},[_vm._v("Pale background (messages)")]),_vm._v(" "),_c('spec',{attrs:{"name":"Grey colors","code":".color--[name]\n.bg--[name]--pale","source":"color.css, bg.css"}},[_c('div',{staticClass:"grid grid--gap",staticStyle:{"align-items":"stretch","grid-template-columns":"1fr 1fr 1fr"}},_vm._l((_vm.$root.colorsGrey),function(color){return _c('div',{key:color},[_c('div',{staticClass:"box--panel",class:("bg--" + color + "--pale color--" + color)},[_c('b',[_vm._v(_vm._s(color.toUpperCase())+" text")]),_vm._v(".\n                    Ut non condimentum mauris, eu sodales\n                    neque.\n                ")])])}))]),_vm._v(" "),_c('spec',{attrs:{"name":"Semaphore colors","code":".color--[name]\n.bg--[name]--pale","source":"color.css, bg.css"}},[_c('div',{staticClass:"grid grid--gap",staticStyle:{"align-items":"stretch","grid-template-columns":"1fr 1fr 1fr 1fr"}},_vm._l((_vm.$root.colorsSemaphore),function(color){return _c('div',{key:color},[_c('div',{staticClass:"box",class:("bg--" + color + "--pale color--" + color)},[_c('b',[_vm._v("Lorem ipsum")]),_vm._v(".\n                    Ut non condimentum mauris, eu sodales\n                    neque.\n                ")])])}))])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d216246", __vue__options__)
  } else {
    hotAPI.reload("data-v-1d216246", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],23:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'bg-white',

    components: {
        'text-variations-sample': require('./text-variations-sample.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"article"},[_c('header',{staticClass:"article__title"},[_vm._v("Default background (white)")]),_vm._v(" "),_c('spec',{attrs:{"name":"Text samples","code":".color--[name]","source":"color.css"}},[_c('div',{staticStyle:{"display":"grid","grid-template-columns":"1fr 1fr 1fr"}},_vm._l((_vm.$root.colors),function(color){return _c('div',{key:color,staticClass:"box"},[_c('p',[_c('span',{staticClass:"badge badge--small",class:("badge--" + color)},[_vm._v("\n                        "+_vm._s(color)+"\n                    ")])]),_vm._v(" "),_c('text-variations-sample',{class:("color--" + color + " bg--default")})],1)}))])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c42fd86", __vue__options__)
  } else {
    hotAPI.reload("data-v-2c42fd86", __vue__options__)
  }
})()}
},{"./text-variations-sample.vue":26,"vue":6,"vue-hot-reload-api":5}],24:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'colour',

    components: {
        'swatches': require('./swatches.vue'),
        'bg-white': require('./bg-white.vue'),
        'bg-dark': require('./bg-dark.vue'),
        'bg-pale': require('./bg-pale.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('article',{staticClass:"article"},[_c('header',{staticClass:"article__title"},[_vm._v("Palette")]),_vm._v(" "),_c('swatches')],1),_vm._v(" "),_c('bg-white'),_vm._v(" "),_c('bg-pale'),_vm._v(" "),_c('bg-dark')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02e0a334", __vue__options__)
  } else {
    hotAPI.reload("data-v-02e0a334", __vue__options__)
  }
})()}
},{"./bg-dark.vue":21,"./bg-pale.vue":22,"./bg-white.vue":23,"./swatches.vue":25,"vue":6,"vue-hot-reload-api":5}],25:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".swatches {\n    display: flex;\n    flex-flow: row nowrap;\n}\n\n.swatches__column {\n    display: flex;\n    flex-flow: column nowrap;\n    min-width: 100px;\n}\n\n.swatches__name {\n    padding: var(--gap);\n}\n\n.swatches__step {\n    padding: var(--gap);\n}\n\n.swatches__hex,\n.swatches__hsl {\n    margin-top: var(--gap--small);\n    font-size: var(--font-size--small);\n    opacity: .75;\n}")
;(function(){


const parseColor = require('parse-color');

module.exports = {
    name: 'palette',

    data() {
        const swatchNumbers = ['000', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        return {
            swatchNumbers
        };
    },

    computed: {

        swatches() {
            const swatches = [];
            for (const name of this.$root.colors) {
                const steps = [];
                const swatch = { name, steps };
                swatches.push(swatch);
                for (const number of this.swatchNumbers) {
                    const variable = `--color-${name}--${number}`;
                    const fgColor = number >= '500' ? 'white' : 'black';
                    const style = `background: var(${variable}); color: ${fgColor}`;
                    const color = evalColor(style);
                    steps.push({
                        number,
                        variable,
                        style,
                        color
                    });
                }
            }
            return swatches;
        }

    }

};

function evalColor(style) {
    const e = document.createElement('div');
    e.style = style;
    document.documentElement.appendChild(e);
    const s = window.getComputedStyle(e);
    const bgColor = s['background-color'];
    document.documentElement.removeChild(e);
    return parseColor(bgColor);
}
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"swatches"},_vm._l((_vm.swatches),function(swatch){return _c('div',{staticClass:"swatches__column"},[_c('div',{staticClass:"swatches__name"},[_c('strong',[_vm._v(_vm._s(swatch.name))])]),_vm._v(" "),_c('div',{staticClass:"swatches__steps"},_vm._l((swatch.steps),function(step){return _c('div',{staticClass:"swatches__step",style:(step.style)},[_c('div',{staticClass:"swatches__number"},[_vm._v(_vm._s(step.number))]),_vm._v(" "),_c('div',{staticClass:"swatches__hex"},[_vm._v(_vm._s(step.color.hex))]),_vm._v(" "),_c('div',{staticClass:"swatches__hsl"},[_vm._v(_vm._s(step.color.hsl))])])}))])}))}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47f3d206", __vue__options__)
  } else {
    hotAPI.reload("data-v-47f3d206", __vue__options__)
  }
})()}
},{"parse-color":1,"vue":6,"vue-hot-reload-api":5,"vueify/lib/insert-css":7}],26:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'text-variations-sample'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"text-variations-sample"},[_vm._m(0),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"text-variations-sample__item"},[_c('big',[_c('span',{staticClass:"all-caps"},[_vm._v("all caps")]),_vm._v(" "),_c('b',[_vm._v("bold")]),_vm._v(" "),_c('strong',[_vm._v("strong")]),_vm._v(" "),_c('i',[_vm._v("italic")])])],1),_vm._v(" "),_c('div',{staticClass:"text-variations-sample__item"},[_vm._m(2),_vm._v(" "),_c('i',{staticClass:"fas fa-bullseye"}),_vm._v(" "),_c('big',[_c('i',{staticClass:"fas fa-bullseye"})])],1)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"text-variations-sample__item"},[_c('span',{staticClass:"all-caps"},[_vm._v("all caps")]),_vm._v(" "),_c('b',[_vm._v("bold")]),_vm._v(" "),_c('strong',[_vm._v("strong")]),_vm._v(" "),_c('i',[_vm._v("italic")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"text-variations-sample__item"},[_c('small',[_c('span',{staticClass:"all-caps"},[_vm._v("all caps")]),_vm._v(" "),_c('b',[_vm._v("bold")]),_vm._v(" "),_c('strong',[_vm._v("strong")]),_vm._v(" "),_c('i',[_vm._v("italic")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('small',[_c('i',{staticClass:"fas fa-bullseye"})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f7ec755a", __vue__options__)
  } else {
    hotAPI.reload("data-v-f7ec755a", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],27:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'box-outline'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"article"},[_c('header',{staticClass:"article__title"},[_vm._v("Outlined box")]),_vm._v(" "),_c('spec',{attrs:{"name":"blue","code":"p.box.box--blue.box--outline","source":"typography.css"}},[_c('p',{staticClass:"box box--blue box--outline"},[_vm._v("Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"green","code":"p.box.box--green.box--outline","source":"typography.css"}},[_c('p',{staticClass:"box box--green box--outline"},[_vm._v("Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"yellow","code":"p.box.box--yellow.box--outline","source":"typography.css"}},[_c('p',{staticClass:"box box--yellow box--outline"},[_vm._v("Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"red","code":"p.box.box--red.box--outline","source":"typography.css"}},[_c('p',{staticClass:"box box--red box--outline"},[_vm._v("Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.")])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-63111d8c", __vue__options__)
  } else {
    hotAPI.reload("data-v-63111d8c", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],28:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'boxes'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"article"},[_c('header',{staticClass:"article__title"},[_vm._v("Tinted box")]),_vm._v(" "),_c('spec',{attrs:{"name":"blue","code":"p.box.box--blue","source":"typography.css"}},[_c('p',{staticClass:"box box--blue"},[_vm._v("Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"green","code":"p.box.box--green","source":"typography.css"}},[_c('p',{staticClass:"box box--green"},[_vm._v("Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"yellow","code":"p.box.box--yellow","source":"typography.css"}},[_c('p',{staticClass:"box box--yellow"},[_vm._v("Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"red","code":"p.box.box--red","source":"typography.css"}},[_c('p',{staticClass:"box box--red"},[_vm._v("Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.")])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a0fd1b2", __vue__options__)
  } else {
    hotAPI.reload("data-v-1a0fd1b2", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],29:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'containers-boxes',

    components: {
        'box-tinted': require('./box-tinted.vue'),
        'box-outlined': require('./box-outlined.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('article',[_c('header',{staticClass:"article__title"},[_vm._v("Boxes")]),_vm._v(" "),_c('spec',{attrs:{"name":"Sizing","code":".box\n.box.box--small\n.box.box--large","source":"box.css"}},[_c('div',{staticClass:"group group--gap"},[_c('div',{staticClass:"grid grid--gap"},[_c('div',{staticClass:"box box--blue"},[_c('p',[_c('span',{staticClass:"badge badge--blue"},[_vm._v("Regular box")])]),_vm._v(" "),_c('p',[_vm._v("Mauris suscipit pretium lectus")])]),_vm._v(" "),_c('div',{staticClass:"box box--small box--red"},[_c('p',[_c('span',{staticClass:"badge badge--red"},[_vm._v("Small box")])]),_vm._v(" "),_c('p',[_vm._v("Mauris suscipit pretium lectus, nec pharetra.")])])]),_vm._v(" "),_c('div',{staticClass:"box box--large box--green"},[_c('p',[_c('span',{staticClass:"badge badge--green"},[_vm._v("Large box")])]),_vm._v(" "),_c('p',[_vm._v("Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie, nec pharetra mauris vulputate molestie.")])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Custom size","code":".box.box--yellow","hint":"Amend variables:\n<code>--font-size</code>","source":"variables.css, button.css"}},[_c('div',{staticClass:"box box--yellow stretch",staticStyle:{"--font-size":"16px"}},[_c('p',[_c('i',{staticClass:"icon far fa-clock"}),_c('b',[_vm._v("This might take a moment")])]),_vm._v(" "),_c('p',{staticClass:"shift"},[_vm._v("We generate live data for test jobs. Hold on while we get it.")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Tinting & outline","code":".box.box--outline.bg--cool--pale.color--blue","source":"box.css"}},[_c('div',{staticClass:"box box--outline color--blue bg--cool--pale stretch"},[_c('p',[_c('b',[_vm._v("Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque.")])]),_vm._v(" "),_c('p',[_vm._v(" Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.")])])])],1),_vm._v(" "),_c('box-tinted'),_vm._v(" "),_c('box-outlined')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2adc8d13", __vue__options__)
  } else {
    hotAPI.reload("data-v-2adc8d13", __vue__options__)
  }
})()}
},{"./box-outlined.vue":27,"./box-tinted.vue":28,"vue":6,"vue-hot-reload-api":5}],30:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'containers',

    components: {
        'boxes': require('./boxes.vue'),
        'tabs': require('./tabs.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('article',[_c('header',{staticClass:"article__title"},[_vm._v("Blocks")]),_vm._v(" "),_c('spec',{attrs:{"name":"Sizing & tinting","code":".block.block--small.block--mono\n.block.block--warm\n.block.block--large.block--cool","source":"box.css"}},[_c('div',{staticClass:"grid grid--gap stretch"},[_c('div',{staticClass:"block block--small block--mono"},[_c('b',[_vm._v("Small block panel")]),_vm._v("\n                    Mauris suscipit pretium lectus, nec pharetra.\n                ")]),_vm._v(" "),_c('div',{staticClass:"block block--warm"},[_c('b',[_vm._v("Regular block panel")]),_vm._v("\n                    Mauris suscipit pretium lectus.\n                ")]),_vm._v(" "),_c('div',{staticClass:"block block--large block--cool"},[_c('b',[_vm._v("Large block panel")]),_vm._v("\n                    Mauris suscipit pretium lectus, nec pharetra.\n                ")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Bordered","code":".block.block--border.block--[color]","source":"box.css"}},[_c('div',{staticClass:"grid grid--gap stretch"},[_c('div',{staticClass:"block block--large block--border block--yellow"},[_c('b',[_vm._v("Large block panel")]),_vm._v("\n                    Mauris suscipit pretium lectus.\n                ")]),_vm._v(" "),_c('div',{staticClass:"block block--border block--blue"},[_c('b',[_vm._v("Regular block panel")]),_vm._v("\n                    Mauris suscipit pretium lectus.\n                ")]),_vm._v(" "),_c('div',{staticClass:"block block--border block--red"},[_c('b',[_vm._v("Regular block panel")]),_vm._v("\n                    Mauris suscipit pretium lectus.\n                ")]),_vm._v(" "),_c('div',{staticClass:"block block--small block--border block--green"},[_c('b',[_vm._v("Small block panel")]),_vm._v("\n                    Mauris suscipit pretium lectus.\n                ")])])])],1),_vm._v(" "),_c('boxes'),_vm._v(" "),_c('tabs')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a1b784a8", __vue__options__)
  } else {
    hotAPI.reload("data-v-a1b784a8", __vue__options__)
  }
})()}
},{"./boxes.vue":29,"./tabs.vue":31,"vue":6,"vue-hot-reload-api":5}],31:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'tabs',

    data() {
        return {
            tabs: ['Database', 'Magic', 'Check'],
            activeTab: 'Database',
            activeTabIcons: 'Database'
        };
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',[_c('header',{staticClass:"article__title"},[_vm._v("Tabs")]),_vm._v(" "),_c('spec',{attrs:{"name":"Basic tabs","code":".tabs .tabs__item[.tabs__item--active]\n.tab","source":"base.css"}},[_c('div',[_c('menu',{staticClass:"tabs"},_vm._l((_vm.tabs),function(tab){return _c('span',{staticClass:"tabs__item",class:{ 'tabs__item--active': tab === _vm.activeTab },on:{"click":function($event){_vm.activeTab = tab}}},[_vm._v("\n                    "+_vm._s(tab)+"\n                ")])})),_vm._v(" "),_c('div',{staticClass:"box--panel"},[_c('p',[_c('b',[_vm._v(_vm._s(_vm.activeTab)+" content")]),_vm._v("\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet sollicitudin tellus, eget eleifend sapien volutpat sed. Curabitur vestibulum vitae dui et tincidunt. Proin tellus magna, imperdiet nec rutrum id, pulvinar vitae nunc. Quisque eu ligula eleifend, fringilla enim sit amet, porttitor felis.\n                ")])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Tabs with icons","code":".tabs__item[.tabs__item--active]","source":"base.css"}},[_c('div',[_c('menu',{staticClass:"tabs"},_vm._l((_vm.tabs),function(tab){return _c('span',{staticClass:"tabs__item",class:{ 'tabs__item--active': tab === _vm.activeTabIcons },on:{"click":function($event){_vm.activeTabIcons = tab}}},[_c('i',{class:("tabs__icon fas fa-" + (tab.toLowerCase()))}),_vm._v(" "),_c('span',[_vm._v(_vm._s(tab))])])})),_vm._v(" "),_c('div',{staticClass:"box--panel"},[_c('p',[_c('b',[_vm._v(_vm._s(_vm.activeTabIcons)+" content")]),_vm._v("\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet sollicitudin tellus, eget eleifend sapien volutpat sed. Curabitur vestibulum vitae dui et tincidunt. Proin tellus magna, imperdiet nec rutrum id, pulvinar vitae nunc. Quisque eu ligula eleifend, fringilla enim sit amet, porttitor felis. Donec nec varius felis, non imperdiet nunc.\n                ")])])])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e826b94", __vue__options__)
  } else {
    hotAPI.reload("data-v-5e826b94", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],32:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'inputs',

    components: {
        'input-base': require('./input-base.vue'),
        'input-styles': require('./input-styles.vue'),
        'input-groups': require('./input-groups.vue'),
        'input-toggle': require('./input-toggle.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input-base'),_vm._v(" "),_c('input-styles'),_vm._v(" "),_c('input-toggle'),_vm._v(" "),_c('input-groups')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cc485b7a", __vue__options__)
  } else {
    hotAPI.reload("data-v-cc485b7a", __vue__options__)
  }
})()}
},{"./input-base.vue":33,"./input-groups.vue":34,"./input-styles.vue":35,"./input-toggle.vue":36,"vue":6,"vue-hot-reload-api":5}],33:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'input-base'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',[_c('header',[_vm._v("Base (pure HTML)")]),_vm._v(" "),_c('spec',{attrs:{"name":"Base input","code":"input, input:disabled, input:readonly","source":"base.css"}},[_c('div',{staticClass:"grid grid--gap stretch",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('input',{attrs:{"placeholder":"Placeholder","type":"text"}}),_vm._v(" "),_c('input',{attrs:{"placeholder":"Placeholder","disabled":"","type":"text"}}),_vm._v(" "),_c('input',{attrs:{"placeholder":"Placeholder","readonly":"","type":"text"}}),_vm._v(" "),_c('input',{attrs:{"value":"Value","type":"text"}}),_vm._v(" "),_c('input',{attrs:{"value":"Value","disabled":"","type":"text"}}),_vm._v(" "),_c('input',{attrs:{"value":"Value","readonly":"","type":"text"}})])]),_vm._v(" "),_c('spec',{attrs:{"name":"Base textarea","code":"textarea, textarea:disabled, textarea:readonly","source":"base.css"}},[_c('div',{staticClass:"grid grid--gap stretch",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('textarea',{attrs:{"placeholder":"Placeholder"}}),_vm._v(" "),_c('textarea',{attrs:{"placeholder":"Placeholder","disabled":""}}),_vm._v(" "),_c('textarea',{attrs:{"placeholder":"Placeholder","readonly":""}}),_vm._v(" "),_c('textarea',[_vm._v("Ut non condimentum mauris, eu sodales neque.")]),_vm._v(" "),_c('textarea',{attrs:{"disabled":""}},[_vm._v("Ut non condimentum mauris, eu sodales neque.")]),_vm._v(" "),_c('textarea',{attrs:{"readonly":""}},[_vm._v("Ut non condimentum mauris, eu sodales neque.")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Base text (email, password) input, disabled, readonly","code":"input[type=text|email|password]","source":"base.css"}},[_c('div',{staticClass:"grid grid--gap stretch",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('input',{attrs:{"value":"text","type":"text"}}),_vm._v(" "),_c('input',{attrs:{"value":"text","disabled":"","type":"text"}}),_vm._v(" "),_c('input',{attrs:{"value":"text","readonly":"","type":"text"}})])]),_vm._v(" "),_c('spec',{attrs:{"name":"Base number","code":"input[type=number]","source":"base.css"}},[_c('div',{staticClass:"grid grid--gap stretch",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('input',{attrs:{"value":"10","type":"number"}}),_vm._v(" "),_c('input',{attrs:{"value":"10","disabled":"","type":"number"}}),_vm._v(" "),_c('input',{attrs:{"value":"10","readonly":"","type":"number"}})])]),_vm._v(" "),_c('spec',{attrs:{"name":"Base select","code":"big select\nselect:disabled\nsmall select","source":"base.css"}},[_c('div',{staticClass:"grid grid--gap--large",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('big',[_c('select',[_c('option',{domProps:{"value":undefined}},[_vm._v("Please select an option")]),_vm._v(" "),_c('option',{attrs:{"value":"1"}},[_vm._v("Bourbon")]),_vm._v(" "),_c('option',{attrs:{"value":"2"}},[_vm._v("Custard cream")]),_vm._v(" "),_c('option',{attrs:{"value":"3"}},[_vm._v("Digestive")])])]),_vm._v(" "),_c('select',{attrs:{"disabled":""}},[_c('option',{domProps:{"value":undefined}},[_vm._v("Please select an option")]),_vm._v(" "),_c('optgroup',{attrs:{"label":"Set 1"}},[_c('option',{attrs:{"value":"1"}},[_vm._v("Bourbon")]),_vm._v(" "),_c('option',{attrs:{"value":"2"}},[_vm._v("Custard cream")]),_vm._v(" "),_c('option',{attrs:{"value":"3"}},[_vm._v("Digestive")])]),_vm._v(" "),_c('optgroup',{attrs:{"label":"Set 2"}},[_c('option',{attrs:{"value":"4"}},[_vm._v("Chocolate hobnob")]),_vm._v(" "),_c('option',{attrs:{"value":"5"}},[_vm._v("Garibaldi")]),_vm._v(" "),_c('option',{attrs:{"value":"6"}},[_vm._v("Brandy snap")])])]),_vm._v(" "),_c('small',[_c('select',[_c('option',{domProps:{"value":undefined}},[_vm._v("Please select an option")]),_vm._v(" "),_c('option',{attrs:{"value":"1"}},[_vm._v("Bourbon")]),_vm._v(" "),_c('option',{attrs:{"value":"2"}},[_vm._v("Custard cream")]),_vm._v(" "),_c('option',{attrs:{"value":"3"}},[_vm._v("Digestive")])])])],1)]),_vm._v(" "),_c('spec',{attrs:{"name":"Base checkbox (initial, active, disabled)","code":"input[type=checkbox]","source":"base.css"}},[_c('div',{staticClass:"grid grid--gap stretch",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('label',[_c('input',{attrs:{"value":"10","type":"checkbox"}}),_vm._v("\n                Initial\n            ")]),_vm._v(" "),_c('label',[_c('input',{attrs:{"value":"10","type":"checkbox","checked":""}}),_vm._v("\n                Active\n            ")]),_vm._v(" "),_c('label',{attrs:{"disabled":""}},[_c('input',{attrs:{"value":"10","disabled":"","type":"checkbox"}}),_vm._v("\n                Disabled\n            ")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Base radio (initial, active, disabled)","code":"input[type=radio]","source":"base.css"}},[_c('div',{staticClass:"grid grid--gap stretch",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('label',[_c('input',{attrs:{"value":"10","type":"radio"}}),_vm._v("\n                Initial\n            ")]),_vm._v(" "),_c('label',[_c('input',{attrs:{"value":"10","type":"radio","checked":""}}),_vm._v("\n                Active\n            ")]),_vm._v(" "),_c('label',{attrs:{"disabled":""}},[_c('input',{attrs:{"value":"10","disabled":"","type":"radio"}}),_vm._v("\n                Disabled\n            ")])])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46368753", __vue__options__)
  } else {
    hotAPI.reload("data-v-46368753", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],34:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'controls-groups'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',[_c('header',[_vm._v("Groups")]),_vm._v(" "),_c('spec',{attrs:{"name":"Labeled input","code":".group.group--gap","source":"group.css"}},[_c('div',{staticClass:"group group--gap"},[_c('label',{attrs:{"for":"input1"}},[_vm._v("Label")]),_vm._v(" "),_c('input',{attrs:{"id":"input1","placeholder":"Placeholder","type":"text"}})])]),_vm._v(" "),_c('spec',{attrs:{"name":"Labeled input stretched","code":".group.group--gap.stretch","source":"group.css"}},[_c('div',{staticClass:"group group--gap stretch"},[_c('label',{attrs:{"for":"input2"}},[_vm._v("Label")]),_vm._v(" "),_c('input',{attrs:{"id":"input2","placeholder":"Placeholder","type":"text"}})])]),_vm._v(" "),_c('spec',{attrs:{"name":"Labeled input","code":".grid.box, .grid.box.stretch","source":"grid.css"}},[_c('div',{staticClass:"group stretch group--gap--large"},[_c('div',{staticClass:"grid box box--cool"},[_c('label',{attrs:{"for":"input3"}},[_vm._v("Label")]),_vm._v(" "),_c('input',{attrs:{"id":"input3","placeholder":"Placeholder","type":"text"}})]),_vm._v(" "),_c('div',{staticClass:"grid box bg--cool--dark color--dark-mode stretch"},[_c('label',{attrs:{"for":"input4"}},[_vm._v("Label")]),_vm._v(" "),_c('input',{attrs:{"id":"input4","placeholder":"Placeholder","type":"text"}})])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Icon label","code":".group","source":"group.css"}},[_c('div',{staticClass:"box box--mono group"},[_c('label',{staticClass:"icon"},[_c('i',{staticClass:"fa fa-search"})]),_vm._v(" "),_c('input',{attrs:{"type":"text","placeholder":"Search"}})])]),_vm._v(" "),_c('spec',{attrs:{"name":"Icon label stretch","code":".group.stretch","source":"group.css"}},[_c('div',{staticClass:"box box--warm group stretch"},[_c('label',{staticClass:"icon"},[_c('i',{staticClass:"fa fa-search"})]),_vm._v(" "),_c('input',{attrs:{"type":"text","placeholder":"Search"}})])]),_vm._v(" "),_c('spec',{attrs:{"name":"Icon inside","code":".input.stretch\n    .icon.color--muted\n    input[type=text]","source":"input.css"}},[_c('span',{staticClass:"input stretch"},[_c('span',{staticClass:"icon color--muted"},[_c('i',{staticClass:"fa fa-search"})]),_vm._v(" "),_c('input',{attrs:{"type":"text","placeholder":"key for user@ub.io"}})])]),_vm._v(" "),_c('spec',{attrs:{"name":"Frameless button inside","code":".button.button--icon frameless","source":"input.css, button.css"}},[_c('div',{staticClass:"group group--gap--large"},[_c('span',{staticClass:"input stretch"},[_c('input',{attrs:{"type":"text","placeholder":"key for user@ub.io"}}),_vm._v(" "),_c('button',{staticClass:"button button--primary button--icon frameless"},[_c('i',{staticClass:"fa fa-sync"})])]),_vm._v(" "),_c('span',{staticClass:"input"},[_c('input',{attrs:{"type":"text","placeholder":"key for user@ub.io"}}),_vm._v(" "),_c('button',{staticClass:"button--secondary button--icon frameless"},[_c('i',{staticClass:"fa fa-sync"})])]),_vm._v(" "),_c('span',{staticClass:"input"},[_c('input',{attrs:{"type":"text","placeholder":"key for user@ub.io"}}),_vm._v(" "),_c('button',{staticClass:"button--accent button--icon frameless"},[_c('i',{staticClass:"fa fa-sync"})])]),_vm._v(" "),_c('span',{staticClass:"input"},[_c('input',{attrs:{"type":"text","placeholder":"key for user@ub.io"}}),_vm._v(" "),_c('button',{staticClass:"button--icon frameless"},[_c('i',{staticClass:"fa fa-sync"})])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Icon inside","code":".input\n    .icon.color--muted\n    input[type=text]","source":"input.css"}},[_c('span',{staticClass:"input"},[_c('span',{staticClass:"icon color--muted"},[_c('i',{staticClass:"fa fa-search"})]),_vm._v(" "),_c('input',{attrs:{"type":"text","placeholder":"key for user@ub.io"}})])]),_vm._v(" "),_c('spec',{attrs:{"name":"Button aside","code":".group.group--gap--small","source":"input.css, button.css"}},[_c('div',{staticClass:"grid"},[_c('div',{staticClass:"group group--gap--small"},[_c('input',{attrs:{"type":"text","placeholder":"key for user@ub.io"}}),_vm._v(" "),_c('button',{staticClass:"button button--primary"},[_c('i',{staticClass:"icon fa fa-sync"}),_vm._v("\n                    Search\n                ")])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Button merged with input","code":".group.group--merged","source":"input.css, button.css"}},[_c('div',{staticClass:"grid"},[_c('div',{staticClass:"group group--merged"},[_c('input',{staticClass:"input",attrs:{"type":"text","placeholder":"key for user@ub.io"}}),_vm._v(" "),_c('button',{staticClass:"button button--primary"},[_vm._v("\n                    Search\n                ")])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Buttons merged with input","code":".group.group--merged","source":"input.css, button.css"}},[_c('div',{staticClass:"grid"},[_c('div',{staticClass:"group group--merged"},[_c('input',{staticClass:"input",attrs:{"type":"text","placeholder":"key for user@ub.io"}}),_vm._v(" "),_c('button',{staticClass:"button button--icon button--secondary"},[_c('i',{staticClass:"fa fa-cog"})]),_vm._v(" "),_c('button',{staticClass:"button button--icon button--flat button--primary"},[_c('i',{staticClass:"fas fa-mouse-pointer"})])])])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fe12e56", __vue__options__)
  } else {
    hotAPI.reload("data-v-4fe12e56", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],35:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'input-class'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',[_c('header',[_vm._v("Styles")]),_vm._v(" "),_c('spec',{attrs:{"name":".input","code":"input.input input, textarea.input","source":"input.css"}},[_c('div',{staticClass:"grid grid--gap stretch",staticStyle:{"grid-template-columns":"1fr 1fr"}},[_c('input',{staticClass:"input",attrs:{"type":"text","placeholder":"I'm input"}}),_vm._v(" "),_c('textarea',{staticClass:"input"},[_vm._v("I'm text area")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Text area input","code":".input.input--area\n.input.input--area.input--area--fixed","source":"input.css"}},[_c('div',{staticClass:"group group--gap stretch box box--warm"},[_c('textarea',{staticClass:"input input--area"},[_vm._v("I'm flexible text area")]),_vm._v(" "),_c('textarea',{staticClass:"input input--area input--area--fixed"},[_vm._v("I'm fixed width text area")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Inner text area","code":".input.input--area textarea","source":"input.css"}},[_c('div',{staticClass:"box box--cool stretch"},[_c('div',{staticClass:"input input--area stretch"},[_c('textarea',[_vm._v("I'm text area")])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Frameless input","code":".input.frameless input|textarea","source":"input.css"}},[_c('div',{staticClass:"grid grid--gap stretch",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('div',[_c('input',{staticClass:"input frameless",attrs:{"type":"text","placeholder":"I'm input"}})]),_vm._v(" "),_c('div',{staticClass:"input frameless"},[_c('textarea',[_vm._v("I'm text area")])])])]),_vm._v(" "),_c('spec',{attrs:{"name":".input--area","code":".input.input--area textarea","source":"input.css"}},[_c('div',{staticClass:"grid grid--gap stretch",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('div',{staticClass:"input input--area"},[_c('textarea',[_vm._v("I'm text area")])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Input-styled dropdowns","code":"big.input select\nspan.input select\nsmall.input select","source":"input.css"}},[_c('div',{staticClass:"grid grid--gap--large",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('big',{staticClass:"input"},[_c('select',[_c('option',{domProps:{"value":undefined}},[_vm._v("Please select an option")]),_vm._v(" "),_c('option',{attrs:{"value":"1"}},[_vm._v("Bourbon")]),_vm._v(" "),_c('option',{attrs:{"value":"2"}},[_vm._v("Custard cream")]),_vm._v(" "),_c('option',{attrs:{"value":"3"}},[_vm._v("Digestive")])])]),_vm._v(" "),_c('span',{staticClass:"input"},[_c('select',[_c('option',{domProps:{"value":undefined}},[_vm._v("Please select an option")]),_vm._v(" "),_c('optgroup',{attrs:{"label":"Set 1"}},[_c('option',{attrs:{"value":"1"}},[_vm._v("Bourbon")]),_vm._v(" "),_c('option',{attrs:{"value":"2"}},[_vm._v("Custard cream")]),_vm._v(" "),_c('option',{attrs:{"value":"3"}},[_vm._v("Digestive")])]),_vm._v(" "),_c('optgroup',{attrs:{"label":"Set 2"}},[_c('option',{attrs:{"value":"4"}},[_vm._v("Chocolate hobnob")]),_vm._v(" "),_c('option',{attrs:{"value":"5"}},[_vm._v("Garibaldi")]),_vm._v(" "),_c('option',{attrs:{"value":"6"}},[_vm._v("Brandy snap")])])])]),_vm._v(" "),_c('small',{staticClass:"input"},[_c('select',[_c('option',{domProps:{"value":undefined}},[_vm._v("Please select an option")]),_vm._v(" "),_c('option',{attrs:{"value":"1"}},[_vm._v("Bourbon")]),_vm._v(" "),_c('option',{attrs:{"value":"2"}},[_vm._v("Custard cream")]),_vm._v(" "),_c('option',{attrs:{"value":"3"}},[_vm._v("Digestive")])])])],1)]),_vm._v(" "),_c('spec',{attrs:{"name":"Button-styled dropdowns","code":".button.button--large select\n.button select\n.button.button--small select","source":"button.css"}},[_c('div',{staticClass:"grid grid--gap--large",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('span',{staticClass:"button button--large"},[_c('select',[_c('option',{domProps:{"value":undefined}},[_vm._v("Please select an option")]),_vm._v(" "),_c('option',{attrs:{"value":"1"}},[_vm._v("Bourbon")]),_vm._v(" "),_c('option',{attrs:{"value":"2"}},[_vm._v("Custard cream")]),_vm._v(" "),_c('option',{attrs:{"value":"3"}},[_vm._v("Digestive")])])]),_vm._v(" "),_c('span',{staticClass:"button"},[_c('select',[_c('option',{domProps:{"value":undefined}},[_vm._v("Please select an option")]),_vm._v(" "),_c('optgroup',{attrs:{"label":"Set 1"}},[_c('option',{attrs:{"value":"1"}},[_vm._v("Bourbon")]),_vm._v(" "),_c('option',{attrs:{"value":"2"}},[_vm._v("Custard cream")]),_vm._v(" "),_c('option',{attrs:{"value":"3"}},[_vm._v("Digestive")])]),_vm._v(" "),_c('optgroup',{attrs:{"label":"Set 2"}},[_c('option',{attrs:{"value":"4"}},[_vm._v("Chocolate hobnob")]),_vm._v(" "),_c('option',{attrs:{"value":"5"}},[_vm._v("Garibaldi")]),_vm._v(" "),_c('option',{attrs:{"value":"6"}},[_vm._v("Brandy snap")])])])]),_vm._v(" "),_c('span',{staticClass:"button button--small"},[_c('select',[_c('option',{domProps:{"value":undefined}},[_vm._v("Please select an option")]),_vm._v(" "),_c('option',{attrs:{"value":"1"}},[_vm._v("Bourbon")]),_vm._v(" "),_c('option',{attrs:{"value":"2"}},[_vm._v("Custard cream")]),_vm._v(" "),_c('option',{attrs:{"value":"3"}},[_vm._v("Digestive")])])])])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0bc9b664", __vue__options__)
  } else {
    hotAPI.reload("data-v-0bc9b664", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],36:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'input-toggle',

    data() {
        return {
            bool: false
        };
    },

    components: {
        'toggle': require('../../../inbox-components/toggle.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('spec',{attrs:{"name":"Toggle","code":"small toggle[label=Small]\ntoggle[label=Regular]\nbig toggle[label=Big]","source":"vue-component"}},[_c('div',{staticClass:"grid grid--gap stretch",staticStyle:{"grid-template-columns":"1fr 1fr 1fr"}},[_c('small',[_c('toggle',{attrs:{"bool":_vm.bool,"label":"Small"},on:{"update":function (val) { return _vm.bool = val; }}})],1),_vm._v(" "),_c('toggle',{attrs:{"bool":_vm.bool,"label":"Regular"},on:{"update":function (val) { return _vm.bool = val; }}}),_vm._v(" "),_c('big',[_c('toggle',{attrs:{"bool":_vm.bool,"label":"Big"},on:{"update":function (val) { return _vm.bool = val; }}})],1)],1)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60d56054", __vue__options__)
  } else {
    hotAPI.reload("data-v-60d56054", __vue__options__)
  }
})()}
},{"../../../inbox-components/toggle.vue":46,"vue":6,"vue-hot-reload-api":5}],37:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'loaders',

    components: {
        spinner: require('./spinner.vue'),
        loader: require('./loader.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('article',[_c('spec',{attrs:{"name":"Basic loaders","code":".loader.loader--small.color--default\n.loader.color--primary\n.loader.loader--large.color--muted","source":"loader.css"}},[_c('div',{staticClass:"group group--gap--large"},[_c('div',{staticClass:"box box--mono group group--gap--large"},[_c('loader',{staticClass:"loader--small color--default"}),_vm._v(" "),_c('loader',{staticClass:"color--primary"}),_vm._v(" "),_c('loader',{staticClass:"color--secondary"}),_vm._v(" "),_c('loader',{staticClass:"loader--large color--muted"})],1),_vm._v(" "),_c('div',{staticClass:"box bg--dark-mode group group--gap--large"},[_c('loader',{staticClass:"loader--small color--dark-mode"}),_vm._v(" "),_c('loader',{staticClass:"color--primary"}),_vm._v(" "),_c('loader',{staticClass:"color--secondary"}),_vm._v(" "),_c('loader',{staticClass:"loader--large color--muted"})],1)])]),_vm._v(" "),_c('spec',{attrs:{"name":"Spinners","code":".spinner.spinner--small\n.spinner\n.spinner.spinner--large","source":"spinner.css"}},[_c('div',{staticClass:"group group--gap--large"},[_c('div',{staticClass:"box box--mono group group--gap--large"},[_c('spinner',{staticClass:"spinner--small color--default"}),_vm._v(" "),_c('spinner',{staticClass:"color--primary"}),_vm._v(" "),_c('spinner',{staticClass:"color--secondary"}),_vm._v(" "),_c('spinner',{staticClass:"spinner--large color--muted"})],1),_vm._v(" "),_c('div',{staticClass:"box bg--dark-mode group group--gap--large"},[_c('spinner',{staticClass:"spinner--small color--dark-mode"}),_vm._v(" "),_c('spinner',{staticClass:"color--primary"}),_vm._v(" "),_c('spinner',{staticClass:"color--secondary"}),_vm._v(" "),_c('spinner',{staticClass:"spinner--large color--muted"})],1)])]),_vm._v(" "),_c('spec',{attrs:{"name":"Progress bar","source":"progress-bar.css","code":".progress-bar\n.progress-bar.progress-bar--large"}},[_c('div',{staticClass:"grid grid--gap--large"},[_c('div',{staticClass:"group group--gap--large"},[_c('div',{staticClass:"progress-bar"},[_c('span',{staticClass:"progress-bar__width",style:("width: 0%")}),_vm._v(" "),_c('span',{staticClass:"progress-bar__counter"},[_vm._v("0%")])]),_vm._v(" "),_c('div',{staticClass:"progress-bar"},[_c('span',{staticClass:"progress-bar__width",style:("width: 50%")}),_vm._v(" "),_c('span',{staticClass:"progress-bar__counter"},[_vm._v("50%")])]),_vm._v(" "),_c('div',{staticClass:"progress-bar"},[_c('span',{staticClass:"progress-bar__width",style:("width: 100%")}),_vm._v(" "),_c('span',{staticClass:"progress-bar__counter"},[_vm._v("100%")])])]),_vm._v(" "),_c('div',{staticClass:"group group--gap--large"},[_c('div',{staticClass:"progress-bar progress-bar--large"},[_c('span',{staticClass:"progress-bar__width",style:("width: 0%")}),_vm._v(" "),_c('span',{staticClass:"progress-bar__counter"},[_vm._v("0%")])]),_vm._v(" "),_c('div',{staticClass:"progress-bar progress-bar--large"},[_c('span',{staticClass:"progress-bar__width",style:("width: 50%")}),_vm._v(" "),_c('span',{staticClass:"progress-bar__counter"},[_vm._v("50%")])]),_vm._v(" "),_c('div',{staticClass:"progress-bar progress-bar--large"},[_c('span',{staticClass:"progress-bar__width",style:("width: 100%")}),_vm._v(" "),_c('span',{staticClass:"progress-bar__counter"},[_vm._v("100%")])])])])])],1)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c6a813c", __vue__options__)
  } else {
    hotAPI.reload("data-v-3c6a813c", __vue__options__)
  }
})()}
},{"./loader.vue":38,"./spinner.vue":39,"vue":6,"vue-hot-reload-api":5}],38:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'loader'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"loader no-print",attrs:{"title":"Loading..."}},[_c('span',{staticClass:"loader__rect loader__rect1"}),_vm._v(" "),_c('span',{staticClass:"loader__rect loader__rect2"}),_vm._v(" "),_c('span',{staticClass:"loader__rect loader__rect3"}),_vm._v(" "),_c('span',{staticClass:"loader__rect loader__rect4"}),_vm._v(" "),_c('span',{staticClass:"loader__rect loader__rect5"})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-38ae1c99", __vue__options__)
  } else {
    hotAPI.reload("data-v-38ae1c99", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],39:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'spinner'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"spinner no-print",attrs:{"title":"Loading...","viewBox":"0 0 25 25","xmlns":"http://www.w3.org/2000/svg"}},[_c('circle',{attrs:{"cx":"50%","cy":"50%","stroke":"currentColor","stroke-width":"3","fill":"none","stroke-dasharray":"30 18","r":"10.5"}})])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e15a283", __vue__options__)
  } else {
    hotAPI.reload("data-v-5e15a283", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],40:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'badges'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('article',[_c('spec',{attrs:{"name":"Basic tags","code":".tag","source":"tag.css"}},[_c('div',{staticClass:"control-grid control-grid--gap",staticStyle:{"grid-template-columns":"repeat(6, auto)"}},[_c('small',{staticClass:"tag"},[_c('span',{staticClass:"tag__label"},[_vm._v("Small")]),_vm._v(" "),_c('a',{staticClass:"tag__remover"},[_c('i',{staticClass:"fas fa-times"})])]),_vm._v(" "),_c('span',{staticClass:"tag"},[_c('span',{staticClass:"tag__label"},[_vm._v("Default")]),_vm._v(" "),_c('a',{staticClass:"tag__remover"},[_c('i',{staticClass:"fas fa-times"})])]),_vm._v(" "),_c('big',{staticClass:"tag"},[_c('span',{staticClass:"tag__label"},[_vm._v("Big")]),_vm._v(" "),_c('a',{staticClass:"tag__remover"},[_c('i',{staticClass:"fas fa-times"})])])],1)]),_vm._v(" "),_c('spec',{attrs:{"name":"Tinted","code":".tag.tag--[name]","source":"tag.css"}},[_c('div',{staticClass:"control-grid control-grid--gap",staticStyle:{"grid-template-columns":"repeat(4, auto)"}},_vm._l((_vm.$root.colors),function(color){return _c('span',{key:color,staticClass:"tag",class:("tag--" + color)},[_c('span',{staticClass:"tag__label"},[_vm._v("Lorem")]),_vm._v(" "),_c('a',{staticClass:"tag__remover"},[_c('i',{staticClass:"fas fa-times"})])])}))])],1)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2dfee1d3", __vue__options__)
  } else {
    hotAPI.reload("data-v-2dfee1d3", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],41:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'typography-base-copy'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"article"},[_c('header',{staticClass:"article__title"},[_vm._v("Base: Copy styles")]),_vm._v(" "),_c('spec',{attrs:{"name":"Standard paragraph","code":"p","source":"base.css"}},[_c('p',[_vm._v("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare non odio sed lobortis. Mauris in tortor vitae ex venenatis tempus. Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Proin porttitor bibendum ullamcorper. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"Inline elements <br />(bolds, italics, links, code, time)","code":"b, strong\ni, em\na\ncode, time\nmark","source":"base.css"}},[_c('p',[_c('b',[_vm._v("Lorem "),_c('strong',[_vm._v("STRONGER TEXT")]),_vm._v(" dolor sit amet")]),_vm._v(", consectetur "),_c('code',[_vm._v("I'm code sample: 1ee37a17-a730-405e-b066")]),_vm._v(" adipiscing elit. Ut ornare non odio sed lobortis. "),_c('i',[_vm._v("Mauris in tortor")]),_vm._v(" vitae ex venenatis tempus. "),_c('em',[_vm._v("Donec efficitur "),_c('a',{attrs:{"href":"#"}},[_vm._v("eget")]),_vm._v(" lectus "),_c('mark',[_vm._v("eget placerat. Ut non condimentum mauris, eu sodales neque")])]),_vm._v(". "),_c('time',[_vm._v("I'm time sample: 11.12.2019")]),_vm._v(" porttitor bibendum ullamcorper. Mauris suscipit pretium lectus, nec "),_c('strong',[_vm._v("pharetra")]),_vm._v(" mauris vulputate molestie.\n    ")])]),_vm._v(" "),_c('spec',{attrs:{"name":"Preformated code","code":"pre","source":"base.css"}},[_c('pre',[_vm._v(_vm._s("curl -X GET \\\nhttps://api.automationcloud.net/services \\\n-H 'authorization: $BASIC_AUTH_HEADER' \\\n-H 'content-type: application/json'")+"\n        ")])]),_vm._v(" "),_c('spec',{attrs:{"name":"Unordered list","code":"ul li","source":"base.css"}},[_c('ul',[_c('li',[_vm._v("Lorem ipsum dolor sit amet")]),_vm._v(" "),_c('li',[_vm._v("Consectetur adipiscing elit")]),_vm._v(" "),_c('li',[_vm._v("Ut ornare non odio sed lobortis")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Ordered list","code":"ol li","source":"base.css"}},[_c('ol',[_c('li',[_vm._v("Lorem ipsum dolor sit amet")]),_vm._v(" "),_c('li',[_vm._v("Consectetur adipiscing elit")]),_vm._v(" "),_c('li',[_vm._v("Ut ornare non odio sed lobortis")])])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a275ba8", __vue__options__)
  } else {
    hotAPI.reload("data-v-2a275ba8", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],42:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'typography-base-headings'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"article"},[_c('header',{staticClass:"article__title"},[_vm._v("Base: Headings")]),_vm._v(" "),_c('spec',{attrs:{"name":"h1","source":"base.css"}},[_c('h1',[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"h2","source":"base.css"}},[_c('h2',[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"h3","source":"base.css"}},[_c('h3',[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"h4","source":"base.css"}},[_c('h4',[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"h5","source":"base.css"}},[_c('h5',[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"h6","source":"base.css"}},[_c('h6',[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ee92938", __vue__options__)
  } else {
    hotAPI.reload("data-v-4ee92938", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],43:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'typography',

    components: {
        'base-headings': require('./base-headings.vue'),
        'base-copy': require('./base-copy.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('base-headings'),_vm._v(" "),_c('base-copy'),_vm._v(" "),_c('article',{staticClass:"article"},[_c('header',{staticClass:"article__title"},[_vm._v("Custom headings")]),_vm._v(" "),_c('spec',{attrs:{"name":"All caps h1","code":"h1.all-caps.color--secondary","source":"typography.css"}},[_c('h1',{staticClass:"all-caps color--secondary"},[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"All caps h2","code":"h2.all-caps.color--secondary","source":"typography.css"}},[_c('h2',{staticClass:"all-caps color--secondary"},[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"All caps h3","code":"h3.all-caps.color--secondary","source":"typography.css"}},[_c('h3',{staticClass:"all-caps color--secondary"},[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"All caps h4","code":"h4.all-caps.color--secondary","source":"typography.css"}},[_c('h4',{staticClass:"all-caps color--secondary"},[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"All caps h5","code":"h5.all-caps.color--secondary","source":"typography.css"}},[_c('h5',{staticClass:"all-caps color--secondary"},[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])]),_vm._v(" "),_c('spec',{attrs:{"name":"All caps h6","code":"h6.all-caps.color--secondary","source":"typography.css"}},[_c('h6',{staticClass:"all-caps color--secondary"},[_vm._v("We are "),_c('strong',[_vm._v("ubio")]),_vm._v(". We automate the web.")])])],1),_vm._v(" "),_c('article',{staticClass:"article"},[_c('header',{staticClass:"article__title"},[_vm._v("Text helpers")]),_vm._v(" "),_c('spec',{attrs:{"name":"Highlight","code":".text--highlight","source":"typography.css"}},[_c('p',[_c('b',{staticClass:"text--highlight"},[_vm._v("Lorem ipsum dolor sit amet")]),_vm._v(", consectetur adipiscing elit. Ut ornare non odio sed lobortis. "),_c('i',[_vm._v("Mauris in tortor")]),_vm._v(" vitae ex venenatis tempus. "),_c('em',{staticClass:"text--highlight"},[_vm._v("Donec efficitur "),_c('a',{attrs:{"href":"#"}},[_vm._v("eget")]),_vm._v(" lectus eget placerat. Ut non condimentum mauris, eu sodales neque")]),_vm._v(". Proin porttitor bibendum ullamcorper. Mauris suscipit pretium lectus, nec "),_c('strong',[_vm._v("pharetra")]),_vm._v(" "),_c('span',{staticClass:"text--highlight"},[_vm._v("mauris vulputate molestie.")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Truncate","code":".text--truncate","source":"typography.css"}},[_c('p',{staticClass:"text--truncate"},[_c('b',[_vm._v("Lorem ipsum dolor sit amet")]),_vm._v(", consectetur adipiscing elit. Ut ornare non odio sed lobortis. "),_c('i',[_vm._v("Mauris in tortor")]),_vm._v(" vitae ex venenatis tempus. Proin porttitor bibendum ullamcorper. Mauris suscipit pretium lectus, nec "),_c('strong',[_vm._v("pharetra")]),_vm._v(" "),_c('span',{staticClass:"text--highlight"},[_vm._v("mauris vulputate molestie.")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"All caps","code":".all-caps","source":"typography.css"}},[_c('p',{staticClass:"all-caps"},[_c('b',[_vm._v("Lorem ipsum dolor sit amet")]),_vm._v(", consectetur adipiscing elit. "),_c('i',[_vm._v("Mauris in tortor")]),_vm._v(" vitae ex venenatis tempus. Mauris suscipit pretium lectus, nec "),_c('strong',[_vm._v("pharetra")])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Monospaced","code":".text--mono","source":"typography.css"}},[_c('p',{staticClass:"text--mono"},[_vm._v("\n                THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG."),_c('br'),_vm._v("\n                The quick brown fox jumped over the lazy dog."),_c('br'),_vm._v("\n                0123456789"),_c('br'),_vm._v("\n                11111.11"),_c('br'),_vm._v("\n                88888.88"),_c('br'),_vm._v("\n                0Oo il1I! Z2z 8$s5S😺‼✏⚠😭⤴⤵")])]),_vm._v(" "),_c('spec',{attrs:{"name":"Code","code":".code","source":"typography.css"}},[_c('div',[_c('p',[_c('strong',[_vm._v("During the lifecycle of a Job its state changes. You poll to get the latest status.")]),_c('br'),_vm._v(" "),_c('code',{staticClass:"code"},[_vm._v("processing")]),_vm._v(",\n                    "),_c('span',{staticClass:"code"},[_vm._v("awaitingInput")]),_vm._v(",\n                    "),_c('code',{staticClass:"code"},[_vm._v("awaitingTds")]),_vm._v(",\n                    "),_c('span',{staticClass:"code"},[_vm._v("success")]),_vm._v(",\n                    "),_c('code',{staticClass:"code"},[_vm._v("fail")])])])]),_vm._v(" "),_c('spec',{attrs:{"name":"Dark preformated code snippet","code":".pre","source":"base.css"}},[_c('div',{staticClass:"pre stretch"},[_vm._v("curl -X GET \\\n    https://api-staging.automationcloud.net/services \\\n    -H 'authorization: $BASIC_AUTH_HEADER' \\\n    -H 'content-type: application/json'")])])],1)],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-79496e89", __vue__options__)
  } else {
    hotAPI.reload("data-v-79496e89", __vue__options__)
  }
})()}
},{"./base-copy.vue":41,"./base-headings.vue":42,"vue":6,"vue-hot-reload-api":5}],44:[function(require,module,exports){
;(function(){


module.exports = {
    name: 'snippet',

    props: {
        code: { type: String, required: true },
        source: { type: String, required: true }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"demo__snippet"},[_c('em',{staticClass:"demo__snippet-source"},[_vm._v(_vm._s(_vm.source))]),_vm._v(" "),_c('pre',{staticClass:"demo__snippet-code"},[_vm._v(_vm._s(_vm.code))])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a7fd371a", __vue__options__)
  } else {
    hotAPI.reload("data-v-a7fd371a", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],45:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".spec {\n    display: grid;\n    grid-template-columns: 160px 2fr 1fr;\n    grid-column-gap: 40px;\n    align-items: start;\n    justify-items: start;\n}\n\n.spec__description {\n    color: var(--color-blue--500);\n    line-height: 1.5;\n    margin: .5rem 0;\n}\n\n.spec__hint {\n    word-wrap: break-word;\n    word-break: break-word;\n    white-space: pre-wrap;\n    font-size: var(--font-size--small);\n}\n\n.spec__name {\n    font-weight: 600;\n    grid-gap: var(--gap--small);\n    display: inline-grid;\n    grid-auto-flow: column;\n    align-items: center;\n}")
;(function(){


module.exports = {
    name: 'spec',

    props: {
        name: { type: String, required: true },
        source: { type: String, required: true },
        code: { type: String, required: false, default: '' },
        hint: { type: String, required: false, default: '' }
    },

    components: {
        snippet: require('./snippet.vue')
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spec"},[_c('div',{staticClass:"spec__description"},[_c('div',{staticClass:"spec__name"},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.name)}}),_vm._v(" "),_vm._t("name")],2),_vm._v(" "),_c('div',{staticClass:"spec__hint",domProps:{"innerHTML":_vm._s(_vm.hint)}})]),_vm._v(" "),_vm._t("default"),_vm._v(" "),_c('snippet',{attrs:{"source":_vm.source,"code":_vm.code || _vm.name}})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18f33655", __vue__options__)
  } else {
    hotAPI.reload("data-v-18f33655", __vue__options__)
  }
})()}
},{"./snippet.vue":44,"vue":6,"vue-hot-reload-api":5,"vueify/lib/insert-css":7}],46:[function(require,module,exports){
;(function(){


module.exports = {
    props: {
        label: { type: String, required: false, default: '' },
        bool: { type: Boolean, required: true }
    },

    data() {
        return {
            val: this.bool
        };
    },

    watch: {
        bool(value) {
            this.val = value;
        },

        val(value) {
            this.$emit('update', value);
        }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"toggle"},[_c('span',{staticClass:"toggle__toggler"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.val),expression:"val"}],staticClass:"toggle__input",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.val)?_vm._i(_vm.val,null)>-1:(_vm.val)},on:{"change":function($event){var $$a=_vm.val,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.val=$$a.concat([$$v]))}else{$$i>-1&&(_vm.val=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.val=$$c}}}}),_vm._v(" "),_c('span',{staticClass:"toggle__slider",class:{
                'toggle__slider--on': _vm.bool,
                'toggle__slider--off': !_vm.bool }})]),_vm._v(" "),(_vm.label)?_c('span',{staticClass:"toggle__label"},[_vm._v("\n        "+_vm._s(_vm.label)+"\n    ")]):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a75d0d4", __vue__options__)
  } else {
    hotAPI.reload("data-v-6a75d0d4", __vue__options__)
  }
})()}
},{"vue":6,"vue-hot-reload-api":5}],47:[function(require,module,exports){
'use strict';

const Vue = require('vue');
Vue.component('spec', require('./demo/spec.vue'));

const App = Vue.component('app', require('./demo/index.vue'));

new App({
    el: '#app',
    data: {
        colors: ['mono', 'cool', 'warm', 'blue', 'yellow', 'red', 'green', 'brand-blue', 'brand-red'],
        colorsGrey: ['mono', 'cool', 'warm'],
        colorsSemaphore: ['blue', 'yellow', 'red', 'green'],
        colorsBrand: ['brand-blue', 'brand-red']
    }
});

},{"./demo/index.vue":8,"./demo/spec.vue":45,"vue":6}]},{},[47]);
