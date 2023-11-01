function findDuplicateTransactions(transactions) {
    const groupedTransactions = {};
 
    // Create a unique key for each transaction based on sourceAccount, targetAccount, category, and amount
    transactions.forEach((transaction) => {
        const key = `${transaction.sourceAccount}-${transaction.targetAccount}-${transaction.category}-${transaction.amount}`;
        if (!groupedTransactions[key]) {
            groupedTransactions[key] = [transaction];
        } else {
            groupedTransactions[key].push(transaction);
        }
    });
 
    // Find and collect groups of transactions with time difference less than 1 minute
    const duplicateGroups = [];
 
    for (const key in groupedTransactions) {
        const group = groupedTransactions[key];
        if (group.length > 1) {
            group.sort((a, b) => new Date(a.time) - new Date(b.time));
            const timeThreshold = 60 * 1000; // 1 minute in milliseconds
            let currentGroup = [group[0]];
 
            for (let i = 1; i < group.length; i++) {
                const prevTime = new Date(currentGroup[currentGroup.length - 1].time);
                const currentTime = new Date(group[i].time);
                const timeDifference = Math.abs(currentTime - prevTime);
 
                if (timeDifference <= timeThreshold) {
                    currentGroup.push(group[i]);
                } else {
                    if (currentGroup.length > 1) {
                        duplicateGroups.push(currentGroup);
                    }
                    currentGroup = [group[i]];
                }
            }
 
            if (currentGroup.length > 1) {
                duplicateGroups.push(currentGroup);
            }
        }
    }
 
    // Sort groups by the time of the first transaction in each group
    duplicateGroups.sort((a, b) => new Date(a[0].time) - new Date(b[0].time));
 
    return duplicateGroups;
}
 
export default findDuplicateTransactions;