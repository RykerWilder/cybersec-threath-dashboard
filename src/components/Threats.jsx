import React, { useEffect, useRef } from "react";
import * as Chart from 'chart.js';

const RadarChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Registra i componenti necessari di Chart.js
    Chart.Chart.register(
      Chart.RadarController,
      Chart.RadialLinearScale,
      Chart.PointElement,
      Chart.LineElement,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend,
      Chart.Filler
    );

    // Distruggi il grafico precedente se esiste
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Crea il nuovo grafico
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart.Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
        }, {
          label: 'My Second Dataset',
          data: [28, 48, 40, 19, 96, 27, 100],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#94a3b8',
              font: {
                size: 12
              }
            },
            ticks: {
              color: '#94a3b8',
              backdropColor: 'transparent'
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              padding: 15
            }
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });

    // Cleanup: distruggi il grafico quando il componente viene smontato
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="break-inside-avoid border border-stone-500 rounded-lg p-4 bg-slate-700">
      <canvas ref={chartRef} className="h-100"></canvas>
    </div>
  );
};

export default RadarChart;