
// Change the Page to redirect to after login
$(document).on("startup", function () {
    frappe.set_route("/nmpi");
});