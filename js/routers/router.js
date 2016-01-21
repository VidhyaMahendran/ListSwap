/*global define*/
define([
	'jquery',
	'backbone',
	'collections/lists',
	'common'
], function ($, Backbone, Lists, Common) {
	'use strict';

	var ListRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			Common.ListFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of the List view items
			Lists.trigger('filter');
		}
	});

	return ListRouter;
});
