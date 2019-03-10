
export const transformEmployee = ({ name, id }) => reports => ({ [name]: { id, reports } });