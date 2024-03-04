

export async function POST(data: any, who: string){
    try{
        await fetch(`http://localhost:3001/${who}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return console.log("deu certo!")
    }catch(err){
        return console.log(err)
    }
}

export async function PUT(data: any, who: string, id: string){
    try{
        await fetch(`http://localhost:3001/${who}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    }catch(err){
        console.error(err);
        throw new Error('Erro ao atualizar os dados.');
    }
}


export async function DELETE(id: number, who: string){
    try {
        await fetch(`http://localhost:3001/${who}/${id}`, {
            method: 'DELETE'
        })
        return 

    } catch (err) {
        return console.error(err);
    }  
}

export async function GETALL(who: string){
    try {
        const response = await fetch(`http://localhost:3001/${who}`, {
            method: 'GET',
        })
        const responseR = await response.json()
        return responseR
    } catch (err) {
        return console.error(err);
    }
}

export async function GETONE(who: string, id: number){
    try {
        const response = await fetch(`http://localhost:3001/${who}/${id}`, {
            method: 'GET',
        })
        const responseR = await response.json()
        return responseR
    } catch (err) {
        return console.error(err);
    }
}