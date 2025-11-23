/**
 * Vytvoří URL-friendly slug z textu
 * @param text - Text k převodu (např. "Letní tábor 2025")
 * @returns slug - URL-friendly verze (např. "letni-tabor-2025")
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD") // Rozloží diakritiku
        .replace(/[\u0300-\u036f]/g, "") // Odstraní diakritiku
        .replace(/[^a-z0-9]+/g, "-") // Nahradí non-alphanumeric znaky pomlčkou
        .replace(/^-+|-+$/g, "") // Odstraní pomlčky na začátku/konci
        .substring(0, 60) // Omezí délku
}

/**
 * Vytvoří unikátní slug pro událost
 * @param name - Název události
 * @param existingSlugs - Pole existujících slugů (pro kontrolu duplicit)
 * @returns Unikátní slug
 */
export function generateEventSlug(name: string, existingSlugs: string[] = []): string {
    let slug = slugify(name)

    // Pokud slug už existuje, přidej číslo
    if (existingSlugs.includes(slug)) {
        let counter = 1
        while (existingSlugs.includes(`${slug}-${counter}`)) {
            counter++
        }
        slug = `${slug}-${counter}`
    }

    return slug
}
