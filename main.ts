type Person = {
    readonly id: number,
    readonly name: string,
    bearth_year: number,
    death_year?: number,
    biography: string,
    image: string
}

type Actress = Person & {
    most_famous_movies: [string, string, string],
    awards: string,
    nationality: "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"
}

async function getActress(id: number): Promise<Actress | null>{
    try{
        const response = await fetch(`http://localhost:3333/acctresses/:${id}`)
        const dati: unknown = await response.json()
        if(!isActress(dati)) {
            throw new Error("i dati nn sono validi")
        }
        return dati
    } catch(err) {
        if(err instanceof Error) {
            console.error("errore durante il recupero dei dati", err)
        } else {
            console.error("errore sconosciuto", err)
        }
        return null
    }
}

function isActress(dati: unknown): dati is Actress{
    return(
        typeof dati === "object" && dati !== null &&
        "id" in dati && typeof dati.id === "number" &&
        "name" in dati && typeof dati.name === "string" &&
        "bearth_year" in dati && typeof dati.bearth_year === "number" &&
        "death_year" in dati && typeof dati.death_year === "number" &&
        "biography" in dati && typeof dati.biography === "string" &&
        "image" in dati && typeof dati.image === "string" &&
        "most_famous_movies" in dati && 
        dati.most_famous_movies instanceof Array && 
        dati.most_famous_movies.length === 3 &&
        dati.most_famous_movies.every(m => typeof m === "string") &&
        "awards" in dati && dati.awards === "string" &&
        "nationality" in dati && 
        dati.nationality instanceof Array &&
        typeof dati.nationality === "string"
    )
}