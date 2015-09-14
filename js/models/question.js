// js/models/todo.js
var app = app || {};
// модель задачи
// ----------
// Модель задачи имеет атрибуты 'title', 'order' и 'completed'.
app.Question = Backbone.Model.extend({
// Атрибуты по умолчанию определяют, что у каждой созданной задачи будут ключи
// `title` и `completed`.
	defaults: {
		title: '#. Question title',
		author: 'Demid Ganenko',
		edited: 'Never',
		content: 'Content of the question'
	},
	// переключение состояния задачи `completed`.
	/*toggle: function() {
		this.save({
			completed: !this.get('completed')
		});
	}*/
});