<h2>Технические условия, Входящие параметры:</h2>
<b>Числа M, N, X</b>
<h3>(1) Подготовка:</h3>
<ul>
    <li>Создать матрицу M*N (строчки, колонки)</li>	
    <li>Значение места пресечения — объект с уникальным идентификатором ID и количеством Amount: 
        int (3-х значный рандом)</li>
	<li>Найти сумму по каждой строчке M и среднее по каждому столбику N</li>
</ul>
<h3>(2) Вывод таблицы:</h3>
<ul>
    <li>Вывести результирующие данные в таблицу с хорошим UX. В основных ячейках таблицы выводится Amount, ранее 
        автоматически сгенерированный, справа сумма по строкам M, снизу — сумма по столбцам N.</li>
</ul>

<h3>(3) Динамика ячеек:</h3>
<ul>
	<li>При нажатии на ячейку увеличивать значение Amount на 1 и соответственно менять среднее этого столбика и 
        сумму этой строки</li>
	<li>При наведении на ячейку подсветить X ячеек, Amount которых самый близкий к Amount текущей ячейки.</li>
	<li>При наведении на ячейку суммы по строчке необходимо заменять значение ячеек на процент их вклада в общую сумму 
        и добавить фон: столбик, который наглядно покажет величину процента. Фактически закрасить часть ячейки.</li>
</ul>
<h3>(4) Динамика строк:</h3>
<ul>
    <li>Дать возможность удалить строку с таблицы, при этом должны поменяться средние значения по каждому столбику</li>
	<li>Дать возможность добавить строку, фактически M+1. При этом строка заполняется по всем правилам таблицы."</li>
</ul>
