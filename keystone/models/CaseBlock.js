var keystone = require('keystone');
var Types = keystone.Field.Types;

var Case = require('./Case');

/**
 * CaseBlock Model
 * ==========
 */
var CaseBlock = new keystone.List('CaseBlock', {
	map: { name: 'slug' },
	defaultSort: 'title',
});

CaseBlock.add({
	case: { type: Types.Relationship, ref: 'Case' },
	title: {
		en: { type: String, required: true, initial: true },
		ru: { type: String },
		ua: { type: String },
	},
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	order: { type: Number },
});

CaseBlock.schema.pre('save', function (next) {
	Case.model.count({}, (err, count) => {
		this.order = ++count;

		next();
	});
});

CaseBlock.defaultColumns = 'title.en, slug|20%';
CaseBlock.register();
