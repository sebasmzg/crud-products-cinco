import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import jsonDB from '../db.json';

export function addJson(json: any) {
    // Agregar el nuevo objeto al array de posts
    jsonDB.posts.push(json);

    // Definir la ruta al archivo db.json
    const filePath = path.join(process.cwd(), 'db.json');

    // Escribir el archivo con los datos actualizados
    fs.writeFileSync(filePath, JSON.stringify(jsonDB, null, 2), 'utf-8');

    return `El objeto con título "${json.title}" se ha añadido correctamente.`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const jsonData = req.body;

        try {
            const message = addJson(jsonData);
            res.status(200).json({ message});
            
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al agregar el objeto.' });
        }
    } else if (req.method=="GET"){
        res.status(200).json(jsonDB);
    }
}
