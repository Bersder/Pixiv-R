export function debounce(fun: Function, wait = 0): Function {
  let timeout: any;
  return function () {
    let args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => fun.apply(this, args), wait);
  }
}

export function throttle(fun: Function, wait = 0): Function {
  let previous = 0;
  return function () {
    let now = +new Date();
    if (now - previous > wait) {
      fun.apply(this, arguments);
      previous = now;
    }
  }
}