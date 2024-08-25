export function replaceSpecialChars(str: string) {
    return str
        .toLowerCase()                
        .replace(/[\s\u00C0-\u017F]+/g, '-')
        .replace(/-{2,}/g, '-')   
        .replace(/^-|-$/g, '');
}