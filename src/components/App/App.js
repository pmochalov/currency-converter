import React, { useEffect, useState, useRef } from 'react';
import s from './App.module.scss';
import Block from './../../components/Block/Block';

function App() {

	const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
	const rubObj = {
		RUB: {
			CharCode: "RUB",
			Nominal: 1,
			Name: "Российский рубль",
			Value: 1
		}
	};
	const [fromValue, setFromValue] = useState(1)
	const [fromSelect, setFromSelect] = useState('USD')
	const [toValue, setToValue] = useState(0)
	const [toSelect, setToSelect] = useState('RUB')
	const currencies = useRef({})
	const [date, setDate] = useState(null);

	const getResult = (data) => {
		const { actionFrom } = data;
		const from = currencies.current[fromSelect];
		const to = currencies.current[toSelect];

		if (!from || !to) return;

		if (actionFrom) {
			const result = fromValue * (from.Value / from.Nominal) / (to.Value / to.Nominal);
			setToValue(result);
			return;
		}

		const result = toValue * (to.Value / to.Nominal) / (from.Value / from.Nominal);
		setFromValue(result);
	}

	const changeFrom = () => {
		getResult({
			actionFrom: true
		})
	}

	const changeTo = () => {
		getResult({
			actionFrom: false
		})
	}

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				setDate(new Date(json.Date).toLocaleDateString());
				new Promise((resolve) => {
					currencies.current = { ...rubObj, ...json.Valute };
					resolve(currencies.current)
				}).then(() => {
					changeFrom()
				})
			})
			.catch((err) => {
				console.warn(err);
				console.log('Не удалось загрузить курс валют.')
			})
	}, []);

	useEffect(() => {
		changeFrom();
	}, [fromValue, fromSelect, toSelect])

	useEffect(() => {
		changeTo();
	}, [toValue])


	return (
		<div className={s.App}>

			<h1 className={s.App__title}>Конвертер валют</h1>
			<p>
				Курс валют ЦБ РФ на {date}
			</p>

			<Block
				value={fromValue}
				currencies={currencies.current}
				currency={fromSelect}
				onChangeValue={(value) => setFromValue(value)}
				onChangeSelect={(value) => setFromSelect(value)}
			/>

			<Block
				value={toValue}
				currencies={currencies.current}
				currency={toSelect}
				onChangeValue={(value) => setToValue(value)}
				onChangeSelect={(value) => setToSelect(value)}
			/>

			<div className={s.App__footer}>
				Источник: <a href="https://www.cbr-xml-daily.ru/">API для курсов ЦБ РФ</a>
			</div>

		</div>
	);
}

export default App;
