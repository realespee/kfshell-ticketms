// Copyright (c) 2023, Simon Wanyama and contributors
// For license information, please see license.txt

frappe.ui.form.on('NMPI Ticket', {
	refresh: function(frm){
		filter_site(frm)
		// Hide Action button and pull out Resolve
		$(".actions-btn-group").hide()

		if((!frm.is_new()) && (frm.doc.workflow_state == "Open")){
			frm.add_custom_button("Resolve", ()=>{
				frappe.confirm(
					"Are you sure you want to Resolve this Ticket?",
					function(){ // IF YES
						// show_alert('Thanks for continue here!')
						// Submit
						frm.set_value("workflow_state", "Closed")
						frm.save('Submit');
						// Close the Confirm dialogue
						window.close();
						// Update To Do
						frm.trigger("close_todo_ticket")
						// Show Success
						setTimeout(() => {
							frm.trigger("show_success_notification")
						  }, 1.0 * 1000);
					},
					function(){ // IF NO
						window.close();
					}
				)
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
	show_success_notification: function(frm){
		frm.doc.assign_to ? frappe.msgprint({
			title: __('Success'),
			indicator: 'green',
			message: __(
				`Your NMPI No. ${frm.doc.name} is successfully submitted and email sent to 
				Observer (${frappe.session.user}) & assigned to (${frm.doc.assign_to}).
				`
				)
		}) : frappe.msgprint({
			title: __('Success'),
			indicator: 'green',
			message: __(
				`Your NMPI No. ${frm.doc.name} is successfully submitted and email sent to 
				Observer (${frappe.session.user})
				`
				)
		})
	},
	close_todo_ticket: function(frm){
		console.log(frm.workflow_state)
		frappe.call({
			method:"ticket_ms.ticket_ms.doctype.nmpi_ticket.nmpi_ticket.close_todo_ticket",
			args: {"ticket": frm.doc.name},
			callback: function(r){
				// Nothing here | May change this call to proper one
			}
		})
	},
	region (frm){
		filter_site(frm)
		let filters = {}
		if (frm.doc.region) {
			filters = {region: frm.doc.region}
		}
		frm.set_query('city', function (frm) {
			return {
				filters: filters
			}
		});
	},
	city (frm){
		filter_site(frm)
	},
	division (frm) {
		filter_site(frm)
	}
});

let filter_site = function (frm){
	/*
		filter the site with region, city and division
	*/
	let filters = {};
	if (frm.doc.region) {
		filters['region'] = frm.doc.region
	}
	if (frm.doc.city) {
		filters['city'] = frm.doc.city
	}
	if (frm.doc.division) {
		filters['division'] = frm.doc.division
	}
	if (filters){
		frm.set_query('site_name', function (frm) {
			return {
				filters: filters
			}
		});
	}
}