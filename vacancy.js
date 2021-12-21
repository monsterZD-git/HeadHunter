$(document).ready(function() {
	//id вакансии
	var vacancy = 1;
  //id организации
  var employer_id = 1;
	//запрос на все вакансии компании	
	$.ajax({
		url: "https://api.hh.ru/vacancies/",
		cache: true,
		type: "GET",
		dataType: 'JSON',
		async: false,
		data: {
			'host': 'hh.ru',
			'employer_id': employer_id,
			'specialization': '1',
			'page': 0,
			'per_page': 100
		},
		success: function(result) {
			var list = result.items;
			for (i = 0; i < list.length; i++) {
        //запрос на детальную информацию по вакансии
				$.ajax({
					url: "https://api.hh.ru/vacancies/" + list[i].id,
					cache: true,
					type: "GET",
					dataType: 'JSON',
					data: {
						'host': 'hh.ru'
					},
					success: function(res) {
						console.log(res);
					},
					error: function(res) {
						console.error(res.error);
					},
          //делаем с интервалом, чтобы не забанили
					timeout: 1000 // установка 3-х секундного тайм-аута
				})
			}
		},
		error: function(result) {
			console.error(result.error);
		}
	});
})
