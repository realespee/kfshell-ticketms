# Copyright (c) 2023, Simon Wanyama and contributors
# For license information, please see license.txt

import frappe
from datetime import datetime
from frappe.model.naming import make_autoname
from frappe.model.document import Document

class NMPITicket(Document):
	def autoname(self):
		# first prefix
		pref = ''
		# YY and MM
		d = datetime.now() # returns date and time 
		date_today = str(d.strftime("%x")) # formats date to MM/DD/YY
		mm = date_today.split('/')[0]
		yy = date_today.split('/')[-1]

		if self.type == 'Near Miss':
			pref = 'NM'
		elif self.type == 'Potential Incident':
			pref = 'PI'
		else:
			pref = 'PO'

		# return f'{pref}{yy}{mm}.#####'
		self.name = make_autoname(
				f'{pref}{yy}{mm}.#####'
			)


# WHITELISTED METHODS
@frappe.whitelist()
def fetch_observer_email(site):
	doc = frappe.db.get("Address", {"name": site})
	return doc.email_id

# WHITELISTED METHODS
@frappe.whitelist()
def close_todo_ticket(ticket):
	assigned_ticket = frappe.db.get_all('ToDo',
        filters={
            "allocated_to": frappe.get_user().doc.email,
            "status": "Open",
			"reference_name": ticket
        }
    )
	if(len(assigned_ticket)>0):
		doc = frappe.get_doc("ToDo", assigned_ticket[0]["name"])
		doc.status = "Closed"
		doc.save(ignore_permissions=True)