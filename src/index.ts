import express, { Request, Response } from "express"
import cors from 'cors'
import { userAccount, users } from "./data"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/user/balance", (req: Request, res: Response) => {
    const cpf = Number(req.query.cpf)

    let userBalance = 0
    let userExists = false
    for (const i of users) {
        if (i.cpf === cpf) {
            userBalance = i.balance
            userExists = true
        }
    }
    if (userExists) {
        res.status(200).send(`User balance:${userBalance}`)
    } else {
        res.status(400).send('CPF not found.')
    }

})



app.post("/users", (req: Request, res: Response) => {
    const name = req.body.name
    const cpf = req.body.cpf
    const birthdate = req.body.birthdate

    const userBirthInMilisec = new Date(birthdate).getTime()
    const eighteenYearsInMilisec = 568080000000
    const todayInMilisec = Date.now()

    if ((todayInMilisec - userBirthInMilisec) < eighteenYearsInMilisec) {
        res.status(400).send("User must be over 18.")
    } else {
        let userExists = false
        for (const i of users) {
            if (i.cpf === cpf) {
                userExists = true
            }
        }
        if (!userExists) {
            const newUser: userAccount = {
                name,
                cpf,
                birthdate,
                balance: 0,
                transactions: []
            }
            users.push(newUser)
            res.status(200).send(users)
        } else {
            res.status(400).send('CPF already registered.')
        }
    }
})

app.put("/user", (req:Request, res:Response)=>{
    const userName = req.body.name
    const cpf = req.body.cpf
    const amount = req.body.amount

    let userFound = false
    for (const i of users) {
        if (i.name === userName && i.cpf === cpf) {
            i.balance = i.balance+amount
            userFound = true
        }
    }
    if (userFound) {
        res.status(200).send(`$${amount} deposited into ${userName}'s account.`)
    } else {
        res.status(400).send("No user found.")
    }
})

app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003")
})