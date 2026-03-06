let users = [
    {id: 'dsdf2-sdfs-23', name: 'dimych', age: 34},
    {id: 'csdc3-ddfs-11', name: 'ivan', age: 30},
    {id: 'dsdc1-dwfs-31', name: 'ignat', age: 20},
    {id: '6sac3-1d1s-21', name: 'artem', age: 20},
    {id: '6sac3-1d1s-21', name: 'artem', age: 21},
    {id: '6sac3-1d1s-21', name: 'artem', age: 25},
    {id: '6sac3-1d1s-21', name: 'artem', age: 23},
]

type SortedBy<T> = {
    fieldName: keyof T
    direction: 'asc' | 'desc'
}

const getSortedItems = <T>(items: T[], sortBy: SortedBy<T>[]) => {
    return [...items].sort((u1, u2) => {

        for (let sortConfig of sortBy) {
            if (u1[sortConfig.fieldName] < u2[sortConfig.fieldName]) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }

            if (u1[sortConfig.fieldName] > u2[sortConfig.fieldName]) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
        }

        return 0
    });
}

console.log(getSortedItems(users,
    [{fieldName: 'name', direction: 'asc'}, {fieldName: 'age', direction: 'desc'}]
))