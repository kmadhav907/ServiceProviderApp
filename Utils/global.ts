
export const validatePhoneNumber = (phoneNumber:string) => {
	// const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	// return pattern.test(phoneNumber);
	const pattern = /^\+91[1-9]\d{9}$/; 
	return pattern.test(phoneNumber);
};