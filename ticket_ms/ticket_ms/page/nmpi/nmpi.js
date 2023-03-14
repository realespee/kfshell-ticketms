frappe.pages['nmpi'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: '',
		single_column: true
	});

	// Fetch Some Data for Cards
	frappe.call({
		method: "ticket_ms.ticket_ms.page.nmpi.nmpi.nmpi_page_data", 
		callback: function(r) {

			// Button | New Ticket
			let $btn = page.set_primary_action('New Ticket', () => frappe.set_route('Form', 'NMPI Ticket', 'new-nmpi-ticket'), 'octicon octicon-plus')
			document.getElementsByTagName('span')[54].className = ``
			// Render HTML Template
			$(frappe.render_template("nmpi", {
				data: r.message
		
			})).appendTo(page.body);

			// NMPI Template JS

			const sidebar = document.querySelector(".sidebar");
			const closeBtn = document.querySelector("#btn");
			// const searchBtn = document.querySelector(".bx-search")

			closeBtn.addEventListener("click",function(){
				sidebar.classList.toggle("open")
				menuBtnChange()
			})

			// searchBtn.addEventListener("click",function(){
			// 	sidebar.classList.toggle("open")
			// 	menuBtnChange()
			// })

			function menuBtnChange(){
				if(sidebar.classList.contains("open")){
					closeBtn.classList.replace("bx-menu","bx-menu-alt-right")
				}else{
					closeBtn.classList.replace("bx-menu-alt-right", "bx-menu")
				}
			}
		}
	});
}