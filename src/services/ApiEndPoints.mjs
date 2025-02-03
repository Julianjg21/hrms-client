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
};
