/*global define*/
define([
	'jquery',
	'backbone',
	'collections/services',
	'common'
], function ($, Backbone, Services, Common) {
	'use strict';

	var ServiceRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			Common.ServiceFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of the Todo view items
			Services.trigger('filter');
		}
	});

	return ServiceRouter;
});
