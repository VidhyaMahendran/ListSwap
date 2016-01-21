/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/lists',
	'views/listView',
	'text!templates/stats.html',
	'common'
], function ($, _, Backbone, Lists, ListView, statsTemplate, Common) {
	'use strict';

	// Our overall **AppView** is the top-level piece of UI.
	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#listswapapp',

		// Compile our stats template
		template: _.template(statsTemplate),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
		},

		// At initialization we bind to the relevant events on the `Lists`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting lists that might be saved in *localStorage*.
		initialize: function () {
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
		}
	});

	return AppView;
});
