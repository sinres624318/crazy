const getStyle = function (el, attr) {
  if (el.currentStyle) {
    return el.currentStyle[attr] || el.currentStyle;
  } else {
    return getComputedStyle(el)[attr] || getComputedStyle(el);
  }
}

export default getStyle
