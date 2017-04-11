var path = require('path');

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Case Model
 * ==========
 */
var Case = new keystone.List('Case', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: '-createdAt'
});

var imageDirectory = 'images';
var imageStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: path.join(process.env.PATH, imageDirectory),
		publicPath: path.join(process.env.PUBLIC_PATH, imageDirectory)
	}
});

Case.add({
	title: { type: String, required: true, initial: true },
	slug: { type: String, readonly: true },
	image: { type: Types.File, storage: imageStorage },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
    createdAt: { type: Date, hidden: true },
    updatedAt: { type: Date, hidden: true }
});

Case.schema.pre('save', function(next) {
	var currentDate = new Date();

	this.updatedAt = currentDate;

    if( !this.createdAt )
        this.createdAt = currentDate;

	next();
});

Case.defaultColumns = 'title, slug|20%';
Case.register();
