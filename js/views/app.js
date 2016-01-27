/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/services',
	'views/services',
	'text!templates/stats.html',
	'common'
], function ($, _, Backbone, Services, ServiceView, statsTemplate, Common) {
	'use strict';
;
	// Our overall **AppView** is the top-level piece of UI.
	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#serviceapp',

		// Compile our stats template
		template: _.template(statsTemplate),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'keypress #selectservice':		'createOnEnter',
			'click #clear-completed':	'clearCompleted',
			'click #toggle-all':		'selectAllServices'
		},

		// At initialization we bind to the relevant events on the `Services`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {
			this.allCheckbox = this.$('#toggle-all')[0];
			this.$input = this.$('#new-service');
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');
			this.$serviceList = this.$('#service-list');

			this.listenTo(Services, 'add', this.addOne);
			this.listenTo(Services, 'reset', this.addAll);
			this.listenTo(Services, 'change:completed', this.filterOne);
			this.listenTo(Services, 'filter', this.filterAll);
			this.listenTo(Services, 'all', this.render);

			Services.fetch({reset:true});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			var completed = Services.completed().length;
			var remaining = Services.remaining().length;
			var checkedServices = Services.checkedServices().length;
			var totalPrice = Services.getTotalPrice();

			if (Services.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.template({
					completed: completed,
					remaining: remaining,
					checkedServices: checkedServices,
					totalPrice: totalPrice
				}));

				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (Common.ServiceFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		// Add a single service item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (service) {
			var view = new ServiceView({ model: service });
			this.$serviceList.append(view.render().el);
		},

		// Add all items in the **Services** collection at once.
		addAll: function () {
			this.$serviceList.empty();
			Services.each(this.addOne, this);
		},

		filterOne: function (service) {
			service.trigger('visible');
		},

		filterAll: function () {
			Services.each(this.filterOne, this);
		},

		// Generate the attributes for a new Todo item.
		newAttributes: function () {
			return {
				title: this.$('#new-service').val().trim(),
				order: Services.nextOrder(),
				completed: false,
		        servicename: this.$('#service').val().trim(),
		        price: this.$('#charge').val().trim()
			};
		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function (e) {
			if (e.which !== Common.ENTER_KEY || !this.$input.val().trim()) {
				return;
			}

			Services.create(this.newAttributes());
			this.$input.val('');
		},

		// Clear all completed service items, destroying their models.
		clearCompleted: function () {
			_.invoke(Services.completed(), 'destroy');
			return false;
		},

		selectAllServices: function () {
			var completed = this.allCheckbox.checked;

			Services.each(function (service) {
				service.save({
					completed: completed
				});
			});
		}
	});

	return AppView;
});
