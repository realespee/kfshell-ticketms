import frappe


@frappe.whitelist()
def nmpi_page_data():
    # Ticket Stats
    total_nmpi = frappe.db.count('NMPI Ticket')
    total_open_tickets = frappe.db.count('NMPI Ticket', {'workflow_state': 'Open'})
    total_closed_tickets = frappe.db.count('NMPI Ticket', {'workflow_state': 'Closed'})
    # Assigned Ticket List
    assigned_tickets = frappe.db.get_all('ToDo',
        filters={
            "allocated_to": frappe.get_user().doc.email,
            "status":"Open"
        },
        fields=['description', 'status', 'priority', 'reference_name']
    )
    return {
        'total_nmpi':total_nmpi, 
        'total_open_tickets':total_open_tickets, 
        'total_closed_tickets':total_closed_tickets,
        'cancelled': total_nmpi - (total_open_tickets + total_closed_tickets),
        'assigned':assigned_tickets
    }


@frappe.whitelist()
def fetch_assiged_tickets():
    # assigned = frappe.get_list("Todo", {"allocated_to": frappe.get_user().doc.email})
    assigned_tickets = frappe.db.get_all('ToDo',
        filters={
            "allocated_to": frappe.get_user().doc.email,
            "status":"Open"
        },
        fields=['description', 'status', 'priority', 'reference_name']
    )
    return assigned_tickets