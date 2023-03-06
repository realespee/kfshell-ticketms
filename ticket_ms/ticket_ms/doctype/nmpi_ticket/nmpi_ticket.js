// Copyright (c) 2023, Simon Wanyama and contributors
// For license information, please see license.txt

frappe.ui.form.on('NMPI Ticket', {
	refresh: function(frm){
		// Hide Action button and pull out Resolve
		$(".actions-btn-group").hide()

		if(frm.doc.workflow_state == "Open"){
			frm.add_custom_button("Resolve", ()=>{
				let d = new frappe.ui.Dialog({
					title: 'Confirm',
					indicator: 'blue',
					message: __('Are you sure you want to Close this ticket?'),
					primary_action_label: 'Close',
					primary_action(values) {
						console.log(values);
						// Submit
						frm.set_value("workflow_state", "Closed")
						frm.refresh_field("workflow_state")
						frm.save()

						//Update To Do close_todo_ticket
						frappe.call({
							method:"ticket_ms.ticket_ms.doctype.nmpi_ticket.nmpi_ticket.close_todo_ticket",
							args: {"ticket": frm.doc.name},
							callback: function(r){
								// Nothing here | May change this call to proper one
							}
						})

						// Hide the acknowledgement
						d.hide();

						// Show Success
						frm.doc.assign_to ? frappe.msgprint({
							title: __('Success'),
							indicator: 'green',
							message: __(
								`Your NMPI No. ${frm.doc.name} is successfully submitted and email sent to 
								Observer (${frappe.session.user}) & assigned to (${frm.doc.assign_to}).
								`
								)
						}) : frappe.msgprint({
							title: __('Confirmation'),
							indicator: 'green',
							message: __(
								`Your NMPI No. ${frm.doc.name} is successfully submitted and email sent to 
								Observer (${frappe.session.user})
								`
								)
						})
					}
				});
				
				d.show();
			}).addClass('btn btn-primary')
		}

	},
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
	on_submit: function(frm) {
		frappe.call({
			method: 'ticket_ms.ticket_ms.doctype.nmpi_ticket.nmpi_ticket.fetch_observer_email',
			args: {
				'site': frm.doc.site_name
			},
			callback: function(r) {
				frm.doc.assign_to ? frappe.msgprint({
					title: __('Confirmation'),
					indicator: 'green',
					message: __(
						`Your NMPI No. ${frm.doc.name} is successfully submitted and email sent to 
						Observer (${frappe.session.user}) & assigned to (${frm.doc.assign_to}).
						`
						)
				}) : frappe.msgprint({
					title: __('Confirmation'),
					indicator: 'green',
					message: __(
						`Your NMPI No. ${frm.doc.name} is successfully submitted and email sent to 
						Observer (${frappe.session.user})
						`
						)
				})
			}
		});
	}
});
