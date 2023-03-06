// Copyright (c) 2023, Simon Wanyama and contributors
// For license information, please see license.txt

frappe.ui.form.on('Issue Ticket', {
	on_submit: function(frm) {
		frm.doc.assign_to ? frappe.msgprint({
			title: __('Confirmation'),
			indicator: 'green',
			message: __(
				`Your NMPI No. ${frm.doc.name} is successfully submitted and email sent to 
				Observer (${frm.doc.email_id}) & assigned to (${frm.doc.assign_to}).
				`
				)
		}) : frappe.msgprint({
			title: __('Confirmation'),
			indicator: 'green',
			message: __(
				`Your NMPI No. ${frm.doc.name} is successfully submitted and email sent to 
				Observer (${frm.doc.email_id})
				`
				)
		})
	}
});
