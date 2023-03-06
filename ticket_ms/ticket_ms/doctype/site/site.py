# Copyright (c) 2023, Simon Wanyama and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Site(Document):
	pass


@frappe.whitelist()
def cities_for_state(state):
	cities_list = frappe.get_list('India City',
		filters={
			'parent': state
		},
		fields='city_name',
		as_list=True
	)
	cities = [i[0] for i in cities_list]

	return cities