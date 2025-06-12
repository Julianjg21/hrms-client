// Routes for the APIS
export const API_ROUTES = {
  //Login
  login: `${process.env.REACT_APP_API_BASE_URL}/auth/login`,

  //Permissions
  getAllPermissions: `${process.env.REACT_APP_API_BASE_URL}/requestUserRole/getAllPermissions`,

  //Reset password
  findEmail: `${process.env.REACT_APP_API_BASE_URL}/requestResetPassword/findEmail`,
  verifyCode: `${process.env.REACT_APP_API_BASE_URL}/requestResetPassword/verifyCode`,
  resetPassword: `${process.env.REACT_APP_API_BASE_URL}/requestResetPassword/resetPassword`,

  //Search users
  searchUsers: `${process.env.REACT_APP_API_BASE_URL}/requestUserManagement/searchUsers`,
  searchEmployees: `${process.env.REACT_APP_API_BASE_URL}/requestUserManagement/searchEmployees`,

  //Management users
  createUser: `${process.env.REACT_APP_API_BASE_URL}/requestUserManagement/createUsers`,
  editUserData: `${process.env.REACT_APP_API_BASE_URL}/requestUserManagement/editUserData`,
  deleteUser: `${process.env.REACT_APP_API_BASE_URL}/requestUserManagement/deleteUser`,

  //Verify credentials
  verifyPassword: `${process.env.REACT_APP_API_BASE_URL}/auth/verifyUserPassword`,

  //user documentation
  uploadUserDocuments: `${process.env.REACT_APP_API_BASE_URL}/requestUserDocuments/uploadUserDocuments`,
  getUserDocuments: `${process.env.REACT_APP_API_BASE_URL}/requestUserDocuments/getUserDocuments`,
  downloadUserDocuments: `${process.env.REACT_APP_API_BASE_URL}/requestUserDocuments/downloadUserDocuments`,
  //Generate, download and save  payroll pdf
  generatePayrollPdf: `${process.env.REACT_APP_API_BASE_URL}/requestUserDocuments/generatePayrollPdf`,
  getUserPayrollExtracts: `${process.env.REACT_APP_API_BASE_URL}/requestUserDocuments/getUserPayrollExtracts`,
  downloadUserPayrollExtracts: `${process.env.REACT_APP_API_BASE_URL}/requestUserDocuments/downloadUserPayrollExtracts`,
  //get,create, update and eliminate user events
  createNewEvent: `${process.env.REACT_APP_API_BASE_URL}/requestUserEvents/newEvent`,
  updateEvent: `${process.env.REACT_APP_API_BASE_URL}/requestUserEvents/updateEvent`,
  getAllEventsByDate: `${process.env.REACT_APP_API_BASE_URL}/requestUserEvents/getAllEventsByDate`,
  deleteEvent: `${process.env.REACT_APP_API_BASE_URL}/requestUserEvents/deleteEvent`,
};
