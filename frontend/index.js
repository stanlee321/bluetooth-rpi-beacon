import Plotly from 'plotly.js-basic-dist';

function rand() {
    return Math.random();
 }
 var time = new Date();

 var data1 = {
         x: [],
         y: [],
         mode: 'lines',
         line: {color: '#80CAF6', shape: 'spline'}
     }

 var data2 = {
     x: [],
     y: [],
     mode: 'lines',
     line: {color: '#DF56F1'}
 }

 var temp = {
     x: [],
     y: [],
     xaxis: 'x2',
     yaxis: 'y2',
     mode: 'lines',
     line: {color: '#EB124B'}
 }
 var layout = {
         title: 'Time Series with Rangeslider',
         xaxis: {
             type: 'date',
             domain: [0, 1],
             showticklabels: false
         },
         yaxis: {domain: [0.6,1]},

         xaxis2: {
             type: 'date',
             anchor: 'y2',
             domain: [0, 1]
         },
         yaxis2: {
             anchor: 'x2',
             domain: [0, 0.4]},
     }

 var data = [data1,data2, temp]

 
 Plotly.plot('graph', data, layout);

 var cnt = 0;

 var interval = setInterval(function() {
     var time = new Date();

     var update = {
         x:  [[time], [time], [time]],
         y: [[rand()], [rand()], [rand()]]
     }

     var olderTime = time.setMinutes(time.getMinutes() - 1);
     var futureTime = time.setMinutes(time.getMinutes() + 1);

     var minuteView = {
         xaxis: {
         type: 'date',
         range: [olderTime, futureTime]
         }
     };

     Plotly.relayout('graph', minuteView);
     Plotly.extendTraces('graph', update, [0,1,2])
     //cnt++
     if(cnt === 100) clearInterval(interval);
     /*
     if(cnt > 500) {
         Plotly.relayout('graph',{
             xaxis: {
                 range: [time-500, cnt]
             }
         });
     }
     */
 }, 1000);