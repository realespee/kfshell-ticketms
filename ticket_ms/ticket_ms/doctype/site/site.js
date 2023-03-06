// Copyright (c) 2023, Simon Wanyama and contributors
// For license information, please see license.txt

frappe.ui.form.on('Site', {
	refresh: function(frm) {
		frm.trigger("state")
	},
	state: function(frm){
		if(frm.doc.state){
			frappe.call({
				method: 'ticket_ms.ticket_ms.doctype.site.site.cities_for_state',
				args: {
					'state': frm.doc.state
				},
				callback: function(r) {
					console.log(r.message)
					frm.set_df_property("city", "options", r.message)
					// frm.refresh_field("city")
				}
			});
		}
	}
});
