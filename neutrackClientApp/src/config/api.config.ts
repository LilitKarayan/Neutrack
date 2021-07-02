
export const userLoginEndpoint = "/users/login";
export const userSignUpEndpoint = "/users/newuser";
export const nutritionistSignUpEndpoint = "/users/newnutritionist";
export const nutritionistAddPatientEndpoint = "/nutritionists/addpatient";
export const nutritionistGetAllPatients = (nutritionistId: number) => {
  return `/nutritionists/${nutritionistId}/patients`;
}
export const nutritionistGetAPatient = (nutritionistId: number, patientId: number) => {
  return `/nutritionists/${nutritionistId}/patients/${patientId}`;
}
export const nutritionistDeleteAPatient = (nutritionistId: number, patientId: number) => {
  return `/nutritionists/${nutritionistId}/patients/${patientId}`;
}
export const getNutritionist = (nutritionistId: number) => {
  return `/nutritionists/${nutritionistId}`;
}
export const nutritionistUpdatePatient = (nutritionistId: number, patientId: number) => {
  return `/nutritionists/${nutritionistId}/patients/${patientId}/update`;
}
export const  nutritionistDashboardData = (nutritionistId: number) => {
  return `/nutritionists/${nutritionistId}/dashboard`;
}
