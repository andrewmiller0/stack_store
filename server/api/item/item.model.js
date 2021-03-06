'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Review = require('../review/review.model');

var ItemSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		default: 'https://placekitten.com/g/200/300'
	},
	defaultMessage: {
		type: String,
		default: 'Cold-pressed organic blog swag, Brooklyn pour-over jean shorts butcher skateboard fixie American Apparel hashtag PBR&B Schlitz fap. PBR readymade Thundercats cliche.'
	},
	description: {
		type: String,
		required: true
	},
	buyCount: {
		type: Number,
		default: 0
	},
	available: {
		type: Boolean,
		default: true
	},
	purchaseHistory: [Date],
	categories: [{
		type: Schema.Types.ObjectId,
		ref: 'Category'
	}],
	stars: Number
});

// Validate title is not taken
ItemSchema
	.path('title')
	.validate(function(value, respond) {
		var self = this;
		this.constructor.findOne({
			title: value
		}, function(err, item) {
			if (err) throw err;
			if (item) {
				if (self.id === item.id) return respond(true);
				return respond(false);
			}
			respond(true);
		});
	}, 'The specified item title is already in use.');

// Validate there is at least one category
ItemSchema
	.path('categories')
	.validate(function(value, respond) {
		var self = this;
		respond(value.length > 0);
	}, 'Items need at least 1 category.');

ItemSchema.virtuals.stars = function() {
	// this is an a product
	// return math...
}

ItemSchema.methods.purchase = function() {
	//make line item
	//inc buyCount
};

ItemSchema.methods.review = function() {
	//update average
}

ItemSchema.statics.getReviewsQuery = function() {
	return Review.find({
		item: this.id
	});
};

module.exports = mongoose.model('Item', ItemSchema);