// Routes for the APIS
export const API_ROUTES = {
  login: `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
  getAllPermissions: `${process.env.REACT_APP_API_BASE_URL}/requestUserRole/getAllPermissions`,
  findEmail: `${process.env.REACT_APP_API_BASE_URL}/requestResetPassword/findEmail`,
  verifyCode: `${process.env.REACT_APP_API_BASE_URL}/requestResetPassword/verifyCode`,
  resetPassword: `${process.env.REACT_APP_API_BASE_URL}/requestResetPassword/resetPassword`,
  searchUsers: `${process.env.REACT_APP_API_BASE_URL}/requestUserManagement/searchUsers`,
  searchEmployees: `${process.env.REACT_APP_API_BASE_URL}/requestUserManagement/searchEmployees`,
  deleteUser: `${process.env.REACT_APP_API_BASE_URL}/requestUserManagement/deleteUser`,
  editUserData: `${process.env.REACT_APP_API_BASE_URL}/requestUserManagement/editUserData`,
  createUser: `${process.env.REACT_APP_API_BASE_URL}/requestUserManagement/createUsers`,
  verifyPassword: `${process.env.REACT_APP_API_BASE_URL}/auth/verifyUserPassword`,
  uploadUserDocuments: `${process.env.REACT_APP_API_BASE_URL}/requestUserDocuments/uploadUserDocuments`,
  getUserDocuments: `${process.env.REACT_APP_API_BASE_URL}/requestUserDocuments/getUserDocuments`,
  downloadUserDocuments: `${process.env.REACT_APP_API_BASE_URL}/requestUserDocuments/downloadUserDocuments`,
};
