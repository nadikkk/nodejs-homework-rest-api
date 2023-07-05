const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{6,128})/;
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionEnum = {
	starter: "starter",
	pro: "pro", 
	business: "business",
}

module.exports = {
	PASSWD_REGEX,
	EMAIL_REGEX,
	subscriptionEnum,
}