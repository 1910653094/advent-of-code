const main = (input: string) => {
    const elves = input.split('\n\n');
    const elvesSum = elves
        .map((elvePackage: string) => elvePackage
            .split('\n')
            .map((packageCalories: string) => +packageCalories)
            .reduce((sum: number, packageCalories: number) => packageCalories + sum, 0)
        );
    
    const highestElve = Math.max(...elvesSum);
    console.log(highestElve);
};

const example = 
"1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000";

main(example);
