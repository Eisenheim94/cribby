// js/views/app.js
var app = app || {};
// наше приложение
// ---------------
// Представление AppView – верхний уровень пользовательского интерфейса.
app.AppView = Backbone.View.extend({
	// вместо того чтобы генерировать новый элемент, мы подключаемся
	// к существующему скелету приложения, имеющемуся в HTML.
	el: '.cribbyapp',
	// Новый код
	// Делегированные события для создания новых задач и удаления завершенных.
	events: {
		'keypress .new-question': 'createOnEnter'
	},
	// при инициализации мы делаем привязку
	// к соответствующим событиям коллекции `Todos`
	// при добавлении и изменении событий.
	initialize: function() {
		this.$input = this.$('.new-question');
		this.$footer = this.$('.footer');
		this.$main = this.$('.main');
		this.listenTo(app.Questions, 'add', this.addOne);
		this.listenTo(app.Questions, 'reset', this.addAll);
		// Новое
		this.listenTo(app.Questions, 'change:completed', this.filterOne);
		this.listenTo(app.Questions,'filter', this.filterAll);
		this.listenTo(app.Questions, 'all', this.render);
		app.Questions.fetch();
	},
	// Новый код
	// Повторное отображение приложения означает лишь обновление статистики.
	// Остальная часть приложения не изменяется.
	render: function() {
		if ( app.Questions.length ) {
			this.$main.show();
			this.$footer.show();
		} else {
		this.$main.hide();
		this.$footer.hide();
		}
	},
	// Добавление в список единственной задачи путем создания
	// представления для нее и добавления ее элемента в `<ul>`.
	addOne: function( question ) {
		var view = new app.QuesionsView({ model: question });
		$('.questions-list').append( view.render().el );
	},
	// Одновременное добавление всех элементов в коллекцию Todos.
	addAll: function() {
		this.$('.questions-list').html('');
		app.Questions.each(this.addOne, this);
	},
	// Новое
	// Генерация атрибутов для новой задачи.
	newAttributes: function() {
		return {
			title: this.$input.val().trim(),
			order: app.Questions.nextOrder()
		};
	},
	// Создание новой задачи и ее сохранение
	// в локальном хранилище при нажатии return.
	createOnEnter: function( event ) {
		if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
			return;
		}
		app.Questions.create( this.newAttributes() );
		this.$input.val('');
	}
});