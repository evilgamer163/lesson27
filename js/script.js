//функция возвращает элементы массива
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	hideAllResponseBlocks = () => {
		// получили массив дивов
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// скрываем элементы
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},


	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		//у элмента с переданным селектором меняем свойство display
		document.querySelector(blockSelector).style.display = 'block';
		//если spanSelector меняем содержимое на msgText
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	//возвращаем блок с ошибкой
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	//возвращаем блок с результатом
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	//возвращаем блок с ничего
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn');

//обработчик события на кнопке
filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type'); //получили select
	const dataInput = document.querySelector('#data'); //получили input

	//если в input пустая строка
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

