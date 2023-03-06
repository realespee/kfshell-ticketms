# Copyright (c) 2023, Simon Wanyama and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	return get_columns(), get_data(filters)

def get_data(filters):

	# conditions
	conditions = []
	
	if filters.get("name"): conditions.append(["name", "=", filters.get("name")])
	if filters.get("site_name"): conditions.append(["site_name", "=", filters.get("site_name")])
	if filters.get("raise_date"): conditions.append(["raise_date", "=", filters.get("raise_date")])
	if filters.get("nmpi_action"): conditions.append(["nmpi_action", "=", filters.get("nmpi_action")])
	if filters.get("nmpi_category"): conditions.append(["nmpi_category", "=", filters.get("nmpi_category")])
	if filters.get("state"): conditions.append(["state", "=", filters.get("state")])
	if filters.get("city"): conditions.append(["city", "=", filters.get("city")])


	# Data
	data = frappe.db.get_all('NMPI Ticket', [
		"name",
		"raise_date",
		"site_name",
		"type",
		"state",
		"city",
		"nmpi_category",
		"nmpi_action",
		"description",
		"comment",
		"upload_photos_videos_or_documents"
	], filters=conditions)
	return data

def get_columns():
	return [
		"Name:Data:170",
		"Raise Date:Date:150",
		"Site Name:Link/Site:170",
		"Type:Select:170",
		"State:Link/India State:120",
		"City:Data:120",
		"NMPI Category:Link/NMPI Category:170",
		"NMPI Action:Select:130",
		"Description:Text:150",
		"Comment:Small Text:150"
		"Company:Link/Company:100"
		"Attachments:Attach:200"
	]

