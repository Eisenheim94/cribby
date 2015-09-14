// js/collections/todos.js
var app = app || {};
// Коллекция задач
// ---------------
// Коллекция задач сохраняется в локальном хранилище,
// а не на удаленном сервере.
var QuestionsList = Backbone.Collection.extend({
	// Ссылка на модель этой коллекции.
	model: app.Question,
	// Сохранение всех задач в пространстве имен `"todos-backbone"`.
	// Для работы этого кода потребуется, чтобы библиотека Backbone
	// загрузила плагин локального хранилища в вашу страницу. В противном случае
	// при тестировании кода в консоли закомментируйте
	// следующую строку, чтобы не вызвать исключение.
	localStorage: new Backbone.LocalStorage('cribby-backbone'),
	// Мы поддерживаем последовательный порядок задач, хотя сохранение в базе
	// данных происходит по неупорядоченному GUID.
	// This генерирует следующий порядковый номер для новых элементов.
	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},
	// Задачи сортируются в порядке их ввода.
	comparator: function( todo ) {
		return todo.get('order');
	}
});
// Создание глобальной коллекции задач **Todos**.
app.Questions = new QuestionsList();