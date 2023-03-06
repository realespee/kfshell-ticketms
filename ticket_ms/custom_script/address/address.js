frappe.ui.form.on("Address", {
    onload: function(frm){
        frm.set_df_property("address_type", "options", [
            "Site",
            "Office",
            "Plant",
            "Current",
            "Other"
            // Site
            // Office
            // Plant
            // Current
            // Other
           
        ])
    }
})

