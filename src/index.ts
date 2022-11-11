import express, { Request, Response } from "express"
import cors from 'cors'
import { userAccount, accounts } from "./data"

const app = express()
app.use(express.json())
app.use(cors())

// Get all accounts
app.get("/accounts", (req: Request, res: Response) => {
    res.status(200).send(accounts)
})

// Get account balance
app.get("/account/balance", (req: Request, res: Response) => {
    const cpf = Number(req.query.cpf)

    let accountBalance = 0
    let accountExists = false
    for (const account of accounts) {
        if (account.cpf === cpf) {
            accountBalance = account.balance
            accountExists = true
        }
    }
    if (accountExists) {
        res.status(200).send(`Account balance:${accountBalance}`)
    } else {
        res.status(400).send('CPF not found.')
    }
})

// Add new account
app.post("/accounts", (req: Request, res: Response) => {
    const name = req.body.name
    const cpf = req.body.cpf
    const birthdate = req.body.birthdate

    const accountBirthInMilisec = new Date(birthdate).getTime()
    const eighteenYearsInMilisec = 568080000000
    const todayInMilisec = Date.now()

    if ((todayInMilisec - accountBirthInMilisec) < eighteenYearsInMilisec) {
        res.status(400).send("account must be over 18.")
    } else {
        let accountExists = false
        for (const account of accounts) {
            if (account.cpf === cpf) {
                accountExists = true
            }
        }
        if (!accountExists) {
            const newaccount: userAccount = {
                name,
                cpf,
                birthdate,
                balance: 0,
                transactions: []
            }
            accounts.push(newaccount)
            res.status(200).send(accounts)
        } else {
            res.status(400).send('CPF already registered.')
        }
    }
})

// Add a deposit to transactions history
app.put("/account", (req: Request, res: Response) => {
    const accountName = req.body.name
    const cpf = req.body.cpf
    const amount = req.body.amount

    let accountFound = false
    for (const account of accounts) {
        if (account.name === accountName && account.cpf === cpf) {
            accountFound = true
            account.transactions.push({
                date: Date(),
                amount: amount,
                description: 'Deposit in cash.'
            })
        }
    }
    if (accountFound) {
        res.status(200).send(accounts)
    } else {
        res.status(400).send("No account found.")
    }
})

// Add a debt to transactions history
app.put("/account/pay", (req: Request, res: Response) => {
    const dueDate = req.body.date
    const description = req.body.description
    const amount = req.body.amount
    const cpf = req.body.cpf

    try {
        const dueDateInMilisec = new Date(dueDate).getTime()
        const milisec23_59 = 84924000
        const dateCheck = dueDateInMilisec + milisec23_59 >= new Date().getTime()

        let accountFound = false
        let enoughBalance = false
        for (const i of accounts) {
            if (i.cpf === cpf) {
                accountFound = true
                if (i.balance >= amount) {
                    enoughBalance = true
                    i.transactions.push({
                        date: dueDate ? dueDate : new Date(),
                        amount: amount,
                        description: description
                    })
                }
            }
        }
        if (!dateCheck) {
            throw new Error("Overdue bills can't be accepted.")
        }
        if (!accountFound) {
            throw new Error("account not found.")
        }
        if (!enoughBalance) {
            throw new Error("Not enough balance.")
        }
        res.status(200).send(accounts)
    } catch (error: any) {
        res.status(401).send(error.message)
    }
})

// Update account balance according to transactions history
app.put("/account/update-balance", (req: Request, res: Response) => {
    const cpf = req.body.cpf

    let accountFound = false
    for (const account of accounts) {
        if (account.cpf === cpf) {
            accountFound = true
            let sumTransactions = 0
            for (const transaction of account.transactions) {
                if (new Date(transaction.date) < new Date()) {
                    account.balance += transaction.amount
                }
            }
            account.balance -= sumTransactions
        }
    }
    if (accountFound) {
        res.status(200).send(accounts)
    } else {
        res.status(400).send("No account found.")
    }
})

// # Add transfer between accounts to transactions history
app.post("/transfer", (req: Request, res: Response) => {
    const senderName = req.body.senderName
    const senderCpf = req.body.senderCpf
    const recipientName = req.body.recipientName
    const recipientCpf = req.body.recipientCpf
    const amount = req.body.amount

    let senderFound = false
    let recipientFound = false
    try {
        for (const account of accounts) {
            if (account.name === senderName && account.cpf === senderCpf) {
                senderFound = true
            }
            if (account.name === recipientName && account.cpf === recipientCpf) {
                recipientFound = true
            }
        }
        let senderHasBalance = false
        if (senderFound && recipientFound) {
            for (const account of accounts) {
                if (account.name === senderName && account.cpf === senderCpf) {
                    if (account.balance >= amount) {
                        senderHasBalance = true
                        account.transactions.push({
                            date: Date(),
                            amount: -amount,
                            description: `Transfer sent to ${recipientName}`
                        })
                    }
                }
                if (account.name === recipientName && account.cpf === recipientCpf && senderHasBalance) {
                    account.transactions.push({
                        date: Date(),
                        amount: amount,
                        description: `Transfer received from ${senderName}`
                    })
                }
            }
        }
        if (!senderFound) {
            throw new Error("Sender account not found.")
        }
        if (!recipientFound) {
            throw new Error("Recipient account not found.")
        }
        if (!senderHasBalance) {
            throw new Error("Sender balance not enough.")
        }
        res.status(200).send(accounts)
    } catch (error: any) {
        res.status(401).send(error.message)
    }
})

app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003")
})