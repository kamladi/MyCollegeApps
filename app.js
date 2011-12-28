/*
* 'College' Model
*/
var College = Backbone.Model.extend({
	defaults: {
		name: "New College",
		deadline: new Date(),
		address: "college address",
		notes: "notes"
	},
	initialize: function() {
		console.log('new college created');
	},
	validate: function(data) {
		if(!data.name) {
			return "No name entered";
		}
		if(!data.deadline) {
			return "No deadline entered";
		}
		if(!data.name) {
			return "No address entered";
		}
	}
});

/*
* 'Colleges' Collection
*/
var CollegeCollection = Backbone.Collection.extend({
	model: College,
	initialize: function() {
		
	}
});

var Colleges = new CollegeCollection();

/*
* 'College List' View
*/
var collegeListView = Backbone.View.extend({
	el: $('#collegeList ul#college-list'),
	render: function() {
		var ids = Colleges.pluck('')
		var names = Colleges.pluck('name');
		var deadlines = Colleges.pluck('deadline');
		var length = Colleges.length;
		for(int i=0; i<length; i++) {
			var tmpl = 
				'<li id=""><h3>'+names[i]+'</h3><p>Due '+deadlines[i]+'</p></li>';
			
		}
	}
})

/*
* 'College Detail' View
*/
var collegeDetailView = Backbone.View.extend({
	el: $('#collegeDetail'),
	render: function() {
		this.el = ich.college(this.model.toJSON())
	},
	serialize: function() {
		return {
			name: this.$('#name').text();
			deadline: new Date(this.$('#deadline').text());
			address: this.$('#deadline').text();
			notes: this.$('#notes').text();
		}
	}
})

$(document).ready(function() {
	$('#collegeDetail #addCollegeSubmit').click(function() {
		//grab values
		var form = $(#addCollege form);
		var newName = form.find('#name').val();
		var newDeadline = form.find('#deadline').val();
		var newAddress = form.find('#address').val();
		var newNotes = form.find('#notes').val();
		/*
		* TODO: perform validations, throw errors if necessary
		*/
		//Update values of College
		/*
		Colleges.add({
			name: newName,
			deadline: newDeadline,
			address: newaddress,
			notes: newNotes
		});
		*/
		
		return false;
	});
	$('#collegeDetail .college-info-link').click(function() {
		var info = $('#collegeDetail .college-info');
		var tasks = $('#collegeDetail .college-tasks');
		if(info.css('display') === 'none') {
			return false;
		}
		info.fadeOut('slow');
		tasks.fadeIn('slow');
		return false;
	})
});