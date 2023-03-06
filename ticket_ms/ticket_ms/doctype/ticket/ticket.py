# Copyright (c) 2023, Simon Wanyama and contributors
# For license information, please see license.txt

import frappe
from datetime import datetime
from frappe.model.document import Document
from frappe.model.naming import make_autoname

class Ticket(Document):
	def autoname(self):
		# first prefix
		pref = ''
		# YY and MM
		d = datetime.now() # returns date and time as string
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
