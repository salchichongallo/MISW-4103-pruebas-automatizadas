export function generateSpecialString() {
    const specialChars = "!@#$%^&*()";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const combined = letters + specialChars;

    let result = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * combined.length);
        result += combined[randomIndex];
    }

    return result;
}