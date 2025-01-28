//function to create object with permits and their corresponding actions
export const selectPermissions = (userAction) => {
  //Get all permissions from localStorage
  const storedPermissions = localStorage.getItem("AllPermissions");

//Verify if  storedPermissions is empty or not a valid array
  if (!storedPermissions) {
    return {}; //return an empty object if there are no stored permits
  }

 //Convert permissions into an array, or assign an empty array if the parso fails
  const permissionsArray = JSON.parse(storedPermissions) || [];

//Verify if userAction is empty or not a valid array
  if (!userAction || !Array.isArray(userAction)) {
    return {}; //Return an empty object if userAction is invalid
  }

//Filter the permits that coincide with the Userction
  const permissionFinded = permissionsArray.filter((item) =>
    userAction.includes(item.action)
  );

//Convert the array to an object with the action as key and the permission as value
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
