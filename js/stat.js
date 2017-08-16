'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 220, 40);
  ctx.fillText('Список результатов:', 210, 60);

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150; // px;
  var step = histogramHeight / (max - 0); // px;

  var barWhidth = 40; // px;
  var barHeight = 255; // px;
  var indent = 90; // px;
  var initialX = 155; // px;
  var initialY = 100; // px;

  ctx.textBaseline = 'top'; // положение надписи от левого верхнего угла

  for (i = 0; i < times.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 250,' + String(Math.random()) + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(initialX + indent * i, initialY + (histogramHeight - (times[i] * step)), barWhidth, times[i] * step);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[i], initialX + indent * i, barHeight);
    ctx.fillText(Math.floor(times[i]), initialX + indent * i, initialY + (histogramHeight - (times[i] * step)) - 20);
  }

};


