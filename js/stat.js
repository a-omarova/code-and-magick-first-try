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
  text: {
    str1: 'Ура вы победили!',
    str2: 'Список результатов:'
  },
  textX: {
    str1: 220,
    str2: 210
  },
  textY: {
    str1: 40,
    str2: 60
  }
};

window.renderStatistics = function (ctx, names, times) {
  drawCloud(ctx, cloudColor, cloudPosition);
  drawTitle(ctx, titleData);

  var histogramHeight = 150; // px;
  var step = histogramHeight / getMaxTime(times); // px;

  var barWidth = 40; // px;
  var barHeight = 255; // px;
  var indent = 90; // px;
  var initialX = 155; // px;
  var initialY = 100; // px;

  ctx.textBaseline = 'top'; // положение надписи от левого верхнего угла


  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 250,' + getRandomBlueColor() + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(initialX + indent * i, initialY + (histogramHeight - (times[i] * step)), barWidth, times[i] * step);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[i], initialX + indent * i, barHeight);
    ctx.fillText(Math.floor(times[i]), initialX + indent * i, initialY + (histogramHeight - (times[i] * step)) - 20);
  }

};


function drawCloud(ctx, color, cloud) {
  ctx.fillStyle = color.shadow;
  ctx.strokeRect(cloud.shadowX, cloud.shadowY, cloud.width, cloud.height);
  ctx.fillRect(cloud.shadowX, cloud.shadowY, cloud.width, cloud.height);

  ctx.fillStyle = color.cloud;
  ctx.strokeRect(cloud.x, cloud.y, cloud.width, cloud.height);
  ctx.fillRect(cloud.x, cloud.y, cloud.width, cloud.height);
}

function drawTitle(ctx, title) {
  ctx.fillStyle = title.color;
  ctx.font = title.font;

  ctx.fillText(title.text.str1, title.textX.str1, title.textY.str1);
  ctx.fillText(title.text.str2, title.textX.str2, title.textY.str2);
}


function getRandomBlueColor() {
  var n = Math.random();
  return n.toFixed(1);
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


