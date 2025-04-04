function sortArrayByColumn(array, column, order = 'ascending') {
    return array.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'ascending' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            const numA = parseFloat(valueA);
            const numB = parseFloat(valueB);
            return order === 'ascending' ? numA - numB : numB - numA;
        }
    });
}

// console.log(sortArrayByColumn(people, 'name', 'descending') )
// people.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));
// people.sort((a, b) => a.name.localeCompare(b.name))
// Output: [ { id: 2, name: 'Zack', age: 35 }, { id: 1, name: 'John', age: 41 }, { id: 3, name: 'Peter', age: 47 } ]


export {sortArrayByColumn }