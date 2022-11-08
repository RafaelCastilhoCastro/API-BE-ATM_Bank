import express, { Request, Response } from "express"
import cors from 'cors'
import { userAccount, users } from "./data"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/users", (req:Request, res:Response)=>{
    res.status(200).send(users)
})

app.post("/users", (req:Request, res:Response)=>{
    const name = req.body.name
    const cpf = req.body.cpf
    const birthday = req.body.birthday

    const newUser:userAccount = {
        name,
        cpf,
        birthday,
        balance : 0,
        transactions:[]
    }

    users.push(newUser)

    res.status(200).send(users)
})

app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});
