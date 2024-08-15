
import { useEffect, useState } from "react";

export default function FormJson() {
    const [json, setJson] = useState({});
    const [image, setImage] = useState("" as string);
    const [title, settitle] = useState("" as string);
    const [price, setprice] = useState("" as string);
    const [description, setdescription] = useState("" as string);

    async function submitForm (e:any) {
        e.preventDefault();

        const jsonFormat = {
            title: title,
            description: description,
            price: price,
            image: image,
        }
        setJson(jsonFormat)
        console.log(json);
        try {
            const response = await fetch(`http://localhost:3000/api/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonFormat) ,
            });
            
            if (!response.ok) {
               
                
            }
            return await response.json()
        } catch (err) {
            console.error("Error al crear post", err);
            throw err;
        }  
        
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1>Formulario</h1>
            <form onSubmit={submitForm} className="flex flex-col space-2 text-color-black gap-5">
                <label>title</label>
                <input value={title} onChange={(e)=>{settitle(e.target.value)}} className="text-black"/>
                <label>descripcion</label>
                <textarea placeholder="description" value={description} onChange={(e)=>{setdescription(e.target.value)}} className="text-black"></textarea>
                <label>precio</label>
                <input value={price} onChange={(e) => {setprice(e.target.value) }} className="text-black" />
                <label>url image</label>
                <input value={image} onChange={(e)=>{setImage(e.target.value)}} className="text-black"/>
                <button type="submit">SEND</button>
            </form>
        </div>
    )
    
}
