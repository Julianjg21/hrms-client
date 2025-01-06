
//function to create object with permissions and their corresponding actions
export const selectPermissions = (userAction) => {
//Get all permissions from localStorage
  const storedPermissions = localStorage.getItem("AllPermissions");
//Parse the permissions to an array
  const permissionsArray = JSON.parse(storedPermissions);
//Filter the permissions that match the userAction
  const permissionFinded = permissionsArray.filter((item) =>
    userAction.includes(item.action)
  );
 //Convert the array to an object with action as key and permission as value
  const resultado = permissionFinded.reduce((acc, item) => {
    acc[item.action] = item.permission;
    return acc;
  }, {});
//Return the object with the permissions
  return resultado;
};

//function to extract the permissions from the object
export const extractUsedPermissions = (permissions) => {
  //Get the values from the object
  const usedPermissions = Object.values(permissions);
  //Return the values
  return usedPermissions;
};
