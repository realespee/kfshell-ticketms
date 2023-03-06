frappe.pages['nmpi'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: '',
		single_column: true
	});

	// Fetch Some Data for Cards
	var fetch_data = function(){
		frappe.call({
			method: "ticket_ms.ticket_ms.page.nmpi.nmpi.nmpi_page_data", 
			callback: function(r) {
				console.log(r.message)
				//Set the values to the template
				// $("#total-nmpi")[0].innerText = r.message.total_nmpi
				// $("#open-nmpi")[0].innerText = r.message.total_open_tickets
				// $("#closed-nmpi")[0].innerText = r.message.total_closed_tickets

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
	//call fetch data
	fetch_data()

	// Implement the Refresh button
	// d = document.querySelectorAll(".refresh-data")
	// $("#refresh-nmpi").addEventListener("click", function(){
	// })
   
	// Fetch Some Data for DataTable
	var fetch_datatable = function(){
		frappe.call({
			method: "ticket_ms.ticket_ms.page.nmpi.nmpi.fetch_assiged_tickets", 
			callback: function(r) {
				if(r.message){
					console.log(r.message)
					
				}
			}
		});
	}
	// Render the templates
	// $(frappe.render_template("nmpi", {
	// 	data: fetch_data()

	// })).appendTo(page.body);

	// // NMPI Template JS
	// const sidebar = document.querySelector(".sidebar");
	// const closeBtn = document.querySelector("#btn");
	// // const searchBtn = document.querySelector(".bx-search")

	// closeBtn.addEventListener("click",function(){
	// 	sidebar.classList.toggle("open")
	// 	menuBtnChange()
	// })

	// // searchBtn.addEventListener("click",function(){
	// // 	sidebar.classList.toggle("open")
	// // 	menuBtnChange()
	// // })

	// function menuBtnChange(){
	// 	if(sidebar.classList.contains("open")){
	// 		closeBtn.classList.replace("bx-menu","bx-menu-alt-right")
	// 	}else{
	// 		closeBtn.classList.replace("bx-menu-alt-right", "bx-menu")
	// 	}
	// }
}