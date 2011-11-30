Ext.define('App.model.<%= singular_table_name.capitalize %>', {
	extend: 'Ext.data.Model',
	mixins: {
		updateable: 'App.ux.data.Updateable'
	},
	
	fields: [
		{ name: 'id', type: 'int' }
		<% attributes.each_with_index do |attribute, index| %>
			,{<%= create_ext_record(attribute) -%>}	
		<% end %>
	],
	
	proxy: {
		type: 'rails',
		url: '/<%= plural_table_name %>',
		format: 'json',
		addActions: {
			destroy_all: {
				method: 'POST',
				collection: true
			}
		},
		reader: {
			type: 'json',
			root: '<%= singular_table_name %>'
		},
		writer: {
			type: 'json',
			root: '<%= singular_table_name %>',
			encode: true,
			writeAllFields: false,
			allowSingle: false
		}
	}
});