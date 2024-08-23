export function transNameShopForVoucher(input: string) {
    // Remove diacritics (accents), spaces, and convert to uppercase
    let transformed = input
        .normalize('NFD')  // Normalize to separate letters and accents
        .replace(/[\u0300-\u036f]/g, '')  // Remove the accents
        .replace(/\s+/g, '')  // Remove all spaces
        .toUpperCase();  // Convert to uppercase

    // Trim to 4 characters
    return transformed.slice(0, 4);
}