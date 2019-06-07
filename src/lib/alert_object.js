function alertObject(obj, title, maxlevel) {
  let str;

  if (title !== undefined) {
    str = title + "\n";
  }
  else {
    str = '';
  }

  let func = function(obj, prefix, level) {
    let locstr = ''
    if (typeof obj !== 'object') return;
    let i;
    for (i in obj) {
      if (typeof obj[i] === 'object') {
        if (maxlevel === undefined) {
          func(obj[i], i, level + 1);
        }
        else {
          if (level <= maxlevel) {
            func(obj[i], i, level + 1);
          }
          else {
            locstr += prefix + '.' + i + ' : ' + '(object)' + '\n';
          }
        }
      }
      else {
        locstr += prefix + '.' + i + ' : ' + obj[i] + '\n';
      }
    }
    return locstr;
  }

  str += func(obj, '', 0);
  alert(str);
}
