var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CaseBlock Model
 * ==========
 */
var CaseBlock = new keystone.List('CaseBlock', {
	map: { name: 'title.en' },
	defaultSort: 'case order',
	defaultColumns: 'title.en, case, order',
});

CaseBlock.add({
	case: { type: Types.Relationship, ref: 'Case', required: true, initial: true },
	title: {
		en: { type: String, required: true, initial: true },
		ru: { type: String },
		ua: { type: String },
	},
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	order: { type: Number },
});

CaseBlock.schema.pre('save', function (next) {
	if (this.order) {
		return next();
	}

	CaseBlock.model.count({ case: this.case }, (err, count) => {
		this.order = ++count;

		next();
	});
});

CaseBlock.register();
