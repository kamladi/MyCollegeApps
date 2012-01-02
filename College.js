(function($) {
	var College = Backbone.Model.extend({
		defaults: {
			name: 'College Name',
			deadline: new Date(),
			address: 'College Address',
			notes: 'Notes about college',
			app_sent: 'incomplete',
			app_confirm: 'incomplete',
			rec_given: 'incomplete',
			rec_sent: 'incomplete',
			rec_confirm: 'incomplete',
			transcript_given: 'incomplete',
			transcript_sent: 'incomplete',
			transcript_confirm: 'incomplete',
			test_sat: 'incomplete',
			test_ap: 'incomplete',
			test_act: 'incomplete',
			test_confirm: 'incomplete',
			fin_fafsa: 'incomplete',
			fin_profile: 'incomplete',
			fin_confirm: 'incomplete'
		},
		deadlineString: function() {
			var date = new Date(this.get('deadline'));
			var toString = date.format('n/j/y');
			return toString;
		},
		initialize: function() {
			console.log('new college instance created');
		}
	});
	
	var Colleges = Backbone.Collection.extend({
		model: College
	});
	
	var collegeListView = Backbone.View.extend({
		el: $('#collegeList'),
		events: {
			//events...
		},
		initialize: function() {
			_.bindAll(this, 'render'); //sets 'this' context for view functions
			this.collection = new Colleges();
			this.collection.bind('add', this.render);
			this.render();
		},
		render: function() {
			var ul = $('ul#listview', this.el);
			_(this.collection.models).each(function(college) {
				ul.append('<li><a href="'+college.id+'" class="college-list-item">'+
					'<h1>'+college.get('name')+'</h1>'+
					'<p>Due '+college.deadlineString()+'</p>'+
				'</a></li>');
			});
			ul.listview('refresh');
			$.mobile.changePage(this.el, 'slide', false, false);
		}
	});
	
	var collegeDetailView = Backbone.View.extend({
		el: $('#collegeDetail'),
		events: {
			'click a#save': 'save'
		},
		initialize: function() {
			this.bind('change', render);
			_.bindAll(this, 'render', 'save'); //sets 'this' context for view functions
		},
		render: function() {
			var template = _.template($('#detail-template').html(), this.model.toJSON());
			this.el.page();
			$.mobile.changePage(this.el, 'slide', false, false);
			this.el.trigger('pagecreate');
		},
		save: function(event) {
			this.model.set({
				name: this.el.find('#name').value(),
				deadline: this.el.find('#deadline').value(),
				address: this.el.find('#address').value(),
				notes: this.el.find('#notes').value(),
			});
			this.model.trigger('change');
			event.preventDefault();
		}
	});
	
	var collegeRouter = Backbone.Router.extend({
		routes: {
			'college/:id': 'showDetail',
			'index': 'home'
		},
		showDetail: function(id) {
			//set up collegeDetail page with desired model
			var model = Colleges.get(id);
			console.log('model requested: '+model.toJSON());
			collegeDetail.model = model;
			collegeDetail.el.find('h1').text(model.get('name'));
			collegeDetailView.render();
		},
		home: function() {
			
		}
	})
	
	var collegeList = new collegeListView();
})(jQuery);


/*
structure of one 'college' object...
{
	id: 1,
	name: Carnegie Mellon,
	deadline: new Date(),
	address: 5000 Forbes Ave\nPittsburgh, PA\n15213,
	notes: blah\blah\blah,
	app_sent: 'incomplete',
	app_confirm: 'incomplete',
	rec_given: 'incomplete',
	rec_sent: 'incomplete',
	rec_confirm: 'incomplete',
	transcript_given: 'incomplete',
	transcript_sent: 'incomplete',
	transcript_confirm: 'incomplete',
	test_sat: 'incomplete',
	test_ap: 'incomplete',
	test_act: 'incomplete',
	test_confirm: 'incomplete',
	fin_fafsa: 'incomplete',
	fin_profile: 'incomplete',
	fin_confirm: 'incomplete'	
}
*/