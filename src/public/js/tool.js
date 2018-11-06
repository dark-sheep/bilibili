export function disposeTime(time) {
  let s = returnDoubleTime('' + time % 60);
  let m = returnDoubleTime('' + parseInt((time / 60) % 60));
  let h = returnDoubleTime('' + parseInt(time / 3600));
  let timeStr = '';
  if (h === '00') {
    timeStr = m + ':' + s
  } else {
    timeStr = h + ':' + m + ':' + s
  }
  return timeStr
}

function returnDoubleTime(time) {
  return ('00' + time).substring(time.length)
}
