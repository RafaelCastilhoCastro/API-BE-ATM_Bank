import express, { Request, Response } from "express"
import cors from 'cors'
import { userAccount, users, Transaction } from "./data"

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

app.put("/user", (req: Request, res: Response) => {
    const userName = req.body.name
    const cpf = req.body.cpf
    const amount = req.body.amount

    let userFound = false
    for (const i of users) {
        if (i.name === userName && i.cpf === cpf) {
            userFound = true
            i.balance = i.balance + amount
            i.transactions.push({
                date: Date().slice(0, 24),
                amount: amount,
                description: 'Depóito em Dinheiro'
            })
        }
    }
    if (userFound) {
        console.log(`$${amount} deposited into ${userName}'s account.`)

        res.status(200).send(users)
    } else {
        res.status(400).send("No user found.")
    }
})

app.put("/user/pay", (req: Request, res: Response) => {
    const dueDate = req.body.date
    const description = req.body.description
    const amount = req.body.amount
    const cpf = req.body.cpf

    let userFound = false
    for (const i of users) {
        if (i.cpf === cpf) {
            userFound = true
            i.transactions.push({
                date: dueDate? dueDate : new Date(),
                amount: amount,
                description: description
            })
        }
    }
    if (userFound) {
        console.log("New transaction added.")
        res.status(200).send(users)
    } else {
        res.status(400).send("No user found.")
    }
})

app.put("/user/update-balance", (req: Request, res: Response) => {
    const cpf = req.body.cpf

    let userFound = false
    for (const user of users) {
        if (user.cpf === cpf) {
            userFound = true
            let sumTransactions = 0
            for (const transaction of user.transactions) {
                if (new Date(transaction.date) < new Date()) {
                    sumTransactions += transaction.amount
                }
            }
            user.balance -= sumTransactions
        }
    }
    if (userFound) {
        console.log("User balance updated.")
        res.status(200).send(users)
    } else {
        res.status(400).send("No user found.")
    }
})


app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003")
})