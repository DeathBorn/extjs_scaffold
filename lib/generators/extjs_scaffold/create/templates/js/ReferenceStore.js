Ext.define('App.store.<%= singular_table_name.capitalize %><%= @reference_attribute.name.capitalize.pluralize %>', {
	extend: 'Ext.data.Store',

	singleton: true,
	requires: ['App.model.ParentCombo'],
	model: 'App.model.ParentCombo',
	
	storeId: '<%= singular_table_name.capitalize %><%= @reference_attribute.name.capitalize.pluralize %>',
	autoLoad: false,
	remoteSort: true,
	sorters: [
		{
			property: 'name',
			direction: 'ASC'
		}
	],
	
	proxy: {
		type: 'rest',
		url: '/<%= @reference_attribute.name.pluralize %>',
		format: 'json',
		reader: {
			type: 'json',
			root: '<%= @reference_attribute.name %>'
		}
	}
});