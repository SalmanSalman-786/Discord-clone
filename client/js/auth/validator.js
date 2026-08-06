export const Validator = {

    isRequired(value) {
        return value.trim() !== "";
    },

    isEmail(value) {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(value.trim());

    },

    minLength(value, length) {

        return value.length >= length;

    },

    maxLength(value, length) {

        return value.length <= length;

    },

    hasUppercase(value) {

        return /[A-Z]/.test(value);

    },

    hasLowercase(value) {

        return /[a-z]/.test(value);

    },

    hasNumber(value) {

        return /\d/.test(value);

    },

    hasSpecialCharacter(value) {

        return /[!@#$%^&*(),.?":{}|<>]/.test(value);

    }

};