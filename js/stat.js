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

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;
  var maxIndex = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }

  var histogramHeight = 150; // px;
  var step = histogramHeight / (max - 0); // px;
  console.log(step);

  // ctx.fillText('Худшее время: ' + max.toFixed(2) + 'мс у игрока ' + names[maxIndex], 120, 60);
  console.log('Худшее время: ', max, 'мс у игрока ', names[maxIndex]);

  var barWhidth = 30; // px;
  var barHeight = 240; // px;
  var indent = 80; // px;
  var initialX = 170; // px;
  var initialY = 80; // px;

  ctx.textBaseline = 'top'; // положение надписи от левого верхнего угла

  // ctx.fillRect(initialX, initialY, 20, barHeigth);
  // ctx.fillText(names[0], initialX, initialY + histogramHeight);

  for (i = 0; i < times.length; i++) {
    ctx.fillRect(initialX + indent * i, initialY + (histogramHeight - (times[i] * step)), barWhidth, times[i] * step);
    ctx.fillText(names[i], initialX + indent * i, barHeight);
    ctx.fillText(names[i], initialX + indent * i, barHeight);
  //   ctx.fillRect(initialX + indent * i, initialY, times[i] * step, barHeigth);
  //   ctx.fillText(names[i], initialX + indent * i, initialY + histogramWidth);
  }

};


