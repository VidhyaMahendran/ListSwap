/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/lists.html',
	'common'
], function ($, _, Backbone, listsTemplate, Common) {
	'use strict';

	var ListView = Backbone.View.extend({

		tagName:  'li',

		template: _.template(listsTemplate),

		// The DOM events specific to an item.
		events: {
		},

		// The ListView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **List** and a **ListView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function () {
		},

		// Re-render the titles of the List item.
		render: function () {
		},

		toggleVisible: function () {
		}
	});

	return ListView;
});
