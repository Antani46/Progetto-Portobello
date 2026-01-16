import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('./db.json');

/**
 * Script di riordino ID per db.json.
 * Legge il database, ordina i prodotti per ID numerico,
 * e riassegna ID sequenziali da 1 a N per evitare buchi.
 */
try {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    console.log('ID Originali:', db.products.map(p => p.id));

    // Ordinamento rigoroso numerico
    db.products.sort((a, b) => Number(a.id) - Number(b.id));

    // Riassegnazione ID sequenziali
    db.products.forEach((product, index) => {
        product.id = index + 1;
    });

    console.log('Nuovi ID:', db.products.map(p => p.id));

    // Salvataggio su file
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log('Database reindicizzato con successo.');
} catch (error) {
    console.error("Errore durante la reindicizzazione:", error);
}
