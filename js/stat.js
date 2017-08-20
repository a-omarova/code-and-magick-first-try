'use strict';

var cloudColor = {
  cloud: 'rgba(256, 256, 256, 1.0)',
  shadow: 'rgba(0, 0, 0, 0.7)'
};

var cloudPosition = {
  x: 100,
  y: 10,
  width: 420,
  height: 270,
  shadowX: 110,
  shadowY: 20
};

var titleData = {
  color: '#000000',
  font: '16px PT Mono',
  str1: {
    text: 'Ура вы победили!',
    textX: 220,
    textY: 35
  },
  str2: {
    text: 'Список результатов:',
    textX: 210,
    textY: 55
  }
};

var histogram = {
  height: 150,
  columnWidth: 40,
  indent: 60,
  firstColumnX: 150,
  firstColumnY: 100,
  textTopMargin: 20,
  textBaseline: 'top',
  playerColor: 'rgba(255, 0, 0, 1)',
  textColor: 'rgba(0, 0, 0, 1)',
  textY: 255
};

window.renderStatistics = function (ctx, names, times) {
  drawCloud(ctx, cloudColor, cloudPosition);
  drawTitle(ctx, titleData);

  drawHistogram(ctx, names, times, histogram);
};


function drawCloud(ctx, color, cloud) {
  ctx.fillStyle = color.shadow;
  ctx.strokeRect(cloud.shadowX, cloud.shadowY, cloud.width, cloud.height);
  ctx.fillRect(cloud.shadowX, cloud.shadowY, cloud.width, cloud.height);

  ctx.fillStyle = color.cloud;
  ctx.strokeRect(cloud.x, cloud.y, cloud.width, cloud.height);
  ctx.fillRect(cloud.x, cloud.y, cloud.width, cloud.height);
}

function drawTitle(ctx, stringParams) {
  ctx.fillStyle = stringParams.color;
  ctx.font = stringParams.font;

  ctx.fillText(stringParams.str1.text, stringParams.str1.textX, stringParams.str1.textY);
  ctx.fillText(stringParams.str2.text, stringParams.str2.textX, stringParams.str2.textY);
}

function getRandomBlueColor() {
  var n = Math.random();
  return 'rgba(0, 0, 250,' + n.toFixed(1) + ')';
}

function getMaxTime(times) {
  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }
  return max;
}

function drawColumn(ctx, histogramData, times, names, step, i) {
  var topIndentToColumn = histogramData.height - (times[i] * step);
  var x = histogramData.firstColumnX + histogramData.columnWidth + histogramData.indent * i;
  var y = histogramData.firstColumnY + topIndentToColumn;
  var columnHeight = times[i] * step;

  ctx.fillStyle = getRandomBlueColor();

  if (names[i] === 'Вы') {
    ctx.fillStyle = histogramData.playerColor;
  }

  ctx.fillRect(x, y, histogramData.columnWidth, columnHeight);

  ctx.fillStyle = histogramData.textColor;

  ctx.fillText(names[i], x, histogramData.textY);
  ctx.fillText(Math.floor(times[i]), x, y - histogramData.textTopMargin);
}

function drawHistogram(ctx, names, times, histogramData) {
  var step = histogramData.height / getMaxTime(times);
  ctx.textBaseline = histogramData.textBaseline;

  for (var i = 0; i < times.length; i++) {
    drawColumn(ctx, histogramData, times, names, step, i);
  }
}
