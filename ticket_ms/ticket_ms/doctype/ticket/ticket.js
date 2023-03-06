// Copyright (c) 2023, Simon Wanyama and contributors
// For license information, please see license.txt

frappe.ui.form.on('Ticket', {

	onload: function(frm) {
		frm.trigger("autofill_date_today")
	},
	nmpi_action: function(frm){
		frm.set_value("assign_to", "")
	},
	autofill_date_today: function(frm){
		const date = new Date();
		const formattedDate = date.toLocaleString("en-GB", {
			day: "numeric",
			month: "numeric",
			year: "numeric",
		});

		let date_today = formattedDate.split('/').reverse().join('-')
		frm.set_value("raise_date", date_today)
		frm.refresh_field('raise_date')
	},
});


