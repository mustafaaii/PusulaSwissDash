

/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name capitalize
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */
interface capitalize {
    text?: any
}
const capitalize = ({ text }: capitalize) => {
    if (!text) return '';
    if (text === "undefined") return '';

    const charMap: any = {
        'i': 'İ',
        'ı': 'I',
        'İ': 'i',
        'I': 'ı',
    };

    const result = text
        .split(' ')
        .map((word: any) => {
            const lowerCaseWord = word
                .split('')
                .map((char: any) => charMap[char] || char.toLowerCase())
                .join('');
            const firstChar = charMap[lowerCaseWord.charAt(0)] || lowerCaseWord.charAt(0).toUpperCase();
            return firstChar + lowerCaseWord.slice(1);
        })
        .join(' ');
    return result;

}














export const FlexFunction = {
    capitalize
};