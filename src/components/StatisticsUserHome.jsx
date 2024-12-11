import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import classes from '../styles/StatisticsChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = ({completed, notCompleted}) => {
	completed = completed ? completed : 0;
	notCompleted = notCompleted ? notCompleted : 0;
	const data = {
		labels: ['Completed', 'Remaining'],
		datasets: [
			{
				data: [completed *100, notCompleted *100],
				backgroundColor: ['#36A2EB', '#FF6384'],
				hoverBackgroundColor: ['#36A2EB', '#FF6384'],
			},
		],
	};

	const options = {
		responsive: true,
		cutout: '70%',
		plugins: {
			tooltip: {
				callbacks: {
					label: (tooltipItem) => {
						return `${tooltipItem.label}: ${tooltipItem.raw}%`;
					},
				},
			},
		},
	};

	return (
		<div className={classes.statistic_wrapper}>
			<div className={classes.statistic_inner_wrapper}>
				<h3>Статистика выполнения курсов</h3>
				<Doughnut data={data} options={options} />
			</div>
			<div className={classes.statistic_inner_wrapper}>
				<h3>Статистика участия в проектах</h3>
				<h2>{completed + notCompleted}</h2>
			</div>
		</div>
	);
};

export default StatisticsChart;
