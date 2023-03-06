// Copyright (c) 2023, Simon Wanyama and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["NMPI"] = {
	"filters": [
		{
			"fieldname": "name",
			"label": __("NMPI"),
			"fieldtype": "Data",
			"width": 100,
			"reqd": 0,
		},
		{
			"fieldname": "site_name",
			"label": __("Site"),
			"fieldtype": "Link",
			"options": "Site",
			"width": 100,
			"reqd": 0,
		},
		{
			"fieldname": "raise_date",
			"label": __("Date"),
			"fieldtype": "Date",
			"width": 100,
			"reqd": 0,
		},
		{
			"fieldname": "nmpi_action",
			"label": __("NMPI Action"),
			"fieldtype": "Select",
			"options": ["", "Rectified At Site", "Training Given At Site", "Corrective Action Required"],
			"width": 100,
			"reqd": 0,
		},
		{
			"fieldname": "nmpi_category",
			"label": __("NMPI Category"),
			"fieldtype": "Link",
			"options": "NMPI Category",
			"width": 100,
			"reqd": 0,
		},
		{
			"fieldname": "state",
			"label": __("Region/State"),
			"fieldtype": "Link",
			"options": "India State",
			"width": 100,
			"reqd": 0,
		},
		{
			"fieldname": "city",
			"label": __("City"),
			"fieldtype": "Data",
			"width": 100,
			"reqd": 0,
		},
	]
};
