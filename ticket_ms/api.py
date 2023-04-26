import frappe

@frappe.whitelist(allow_guest=True)
def response(message, data, success, status_code):
    '''method to generates responses of an API
       args:
            message : response message string
            data : json object of the data
            success : True or False depending on the API response
            status_code : status of the request'''
    frappe.clear_messages()
    frappe.local.response["message"] = message
    frappe.local.response["data"] = data
    frappe.local.response["success"] = success
    frappe.local.response["http_status_code"] = status_code
    return

@frappe.whitelist(allow_guest=True)
def login(user, pwd):
    """
        metohd to login user and get api key and secret
        args:
            user: email of user
            pwd: password of user
    """
    try:
        login_manager = frappe.auth.LoginManager()
        login_manager.authenticate(user, pwd)
        login_manager.post_login()
    except frappe.exceptions.AuthenticationError:
        return response( "Authentication Error!", {}, False, 400)
    # generate api key and secret
    frappe.set_user('Administrator')
    api_secret = frappe.core.doctype.user.user.generate_keys(user)
    data = {
            'api_secret': api_secret['api_secret'],
            'api_key': frappe.db.get_value('User', user, 'api_key')
            }
    return response('Success', data, True, 200)