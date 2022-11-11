export type Transaction = {
    date: string,
    amount: number,
    description: string
}

export type userAccount = {
    name: string,
    cpf: number,
    birthdate: string,
    balance: number,
    transactions: Transaction[]
}

export let accounts: userAccount[] = [
    {
        name: 'Maria',
        cpf: 12345678901,
        birthdate: '01/01/1950',
        balance: 1000,
        transactions: [
            {
                date: '02/02/2002',
                amount: -10,
                description: 'Groceries'
            }
        ]
    },
    {
        name: 'Belle',
        cpf: 23456789123,
        birthdate: '10/02/1960',
        balance: 100,
        transactions: [
            {
                date: '01/05/2000',
                amount: 50,
                description: 'Deposit in cash'
            },
            {
                date: '12/07/2024',
                amount: -15,
                description: 'Amazon Prime'
            }
        ]
    },
    {
        name: 'Mel',
        cpf: 34567891234,
        birthdate: '25/07/1975',
        balance: 1500,
        transactions: [
            {
                date: '03/09/2021',
                amount: -90,
                description: 'Pizza'
            },
            {
                date: '04/08/2001',
                amount: 300,
                description: 'Deposit in cash'
            },
            {
                date: '02/09/2023',
                amount: -500,
                description: 'Wines'
            }
        ]
    }
]
