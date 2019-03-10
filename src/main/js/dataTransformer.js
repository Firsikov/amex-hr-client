
export const transformEmployee = ({ id, name, reports }) => ({ [name]: { id, reports } });