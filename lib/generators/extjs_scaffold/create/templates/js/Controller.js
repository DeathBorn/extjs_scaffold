Ext.define('App.controller.<%= plural_table_name.capitalize %>', {
	extend: 'Ext.app.Controller',
	
	models: ['ParentCombo'],
	stores: [<%= create_controller_store_list %>],
	
	init: function() {
		this.control({
			'<%= singular_table_name %>form': {
				actioncomplete: this.onFormActionComplete
			},
			'<%= singular_table_name %>grid': {
				afterrender: this.onGridAfterRender
			}
		})
	},
	
	onFormActionComplete: function(form, action){
		if (action.type == 'load') {
			
		<% attributes.select {|attr| attr.reference? }.each do |attribute| -%>
			// populate initial <%= attribute.name %> list value for existing records
			var store = this.get<%= singular_table_name.capitalize %><%= attribute.name.capitalize.pluralize %>Store();
			var <%= attribute.name %>_id = action.result.data.<%= attribute.name %>_id;
			var <%= attribute.name %>_name = action.result.data.<%= attribute.name %>_name;
			store.removeAll();
			if (<%= attribute.name %>_id > 0) {
				var newModel = Ext.ModelManager.create({id: <%= attribute.name %>_id, name: <%= attribute.name %>_name}, this.getParentComboModel());
				store.add(newModel);
				form.findField('<%= attribute.name %>_name').setValue(<%= attribute.name %>_id);
			}
		<% end -%>
			
		}
	},
	
	onGridAfterRender: function(grid) {
		grid.getStore().load();
	}
})