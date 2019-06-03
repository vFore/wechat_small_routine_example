function processSubject(subject) {
  var title = subject.title;
  var directors = subject.directors;
  var directorStr = '';
  // 导演
  for (var index in directors) {
    directorStr = directorStr + directors[index].name + " / ";
  }

  if (directorStr != '') {
    directorStr = directorStr.substring(0, directorStr.length - 2);
  }

  // 主演
  var casts = subject.casts;
  var castStr = '';
  for (var index in casts) {
    castStr = castStr + casts[index].name + " / ";
  }
  if (castStr != '') {
    castStr = castStr.substring(0, castStr.length - 2);
  }

  // 类型
  var genres = subject.genres;
  var genreStr = '';
  for (var index in genres) {
    genreStr = genreStr + genres[index] + " / ";
  }
  if (genreStr != '') {
    genreStr = genreStr.substring(0, genreStr.length - 2);
  }

  var year = subject.year;
  var text = "名称：" + title + "\n 导演：" + directorStr + "\n 主演：" + castStr + "\n 类型：" + genreStr + "\n 上映年份：" + year;
  subject.text = text;
}

function processSubjects(subjects) {
  for (var i = 0; i < subjects.length; i++) {
    var subject = subjects[i];
    this.processSubject(subject);
  }
}
// 对外提供方法
module.exports = {
  processSubject: processSubject,
  processSubjects: processSubjects
}