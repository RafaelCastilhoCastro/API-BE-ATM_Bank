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

export let users: userAccount[] = [
    {
        name: 'Maria',
        cpf: 12345678901,
        birthdate: '01/01/1950',
        balance: 1000,
        transactions: [
            {
                date: '02/02/2002',
                amount: 10,
                description: 'Mercado'
            }
        ]
    },
    {
        name: 'Martha',
        cpf: 23456789123,
        birthdate: '10/02/1960',
        balance: 100,
        transactions: [
            {
                date: '01/05/2000',
                amount: 50,
                description: 'Pet-shop'
            },
            {
                date: '12/07/2004',
                amount: 15,
                description: 'Hot-dog'
            }
        ]
    },
    {
        name: 'Eva',
        cpf: 34567891234,
        birthdate: '25/07/1975',
        balance: 550,
        transactions: [
            {
                date: '03/09/2021',
                amount: 90,
                description: 'Pizza'
            },
            {
                date: '04/08/2001',
                amount: 101,
                description: 'Calça jeans'
            },
            {
                date: '02/09/2010',
                amount: 500,
                description: 'Vinhos'
            }
        ]
    }
]
