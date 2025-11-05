const { execSync } = require('child_process');
const fs = require('fs');

const FILE_NAME = 'history.txt';
// Tanggal target: 4 November 2026
const endDate = new Date('2026-11-04T12:00:00'); 
const startDate = new Date(endDate);
startDate.setFullYear(startDate.getFullYear() - 1); 

console.log('Memulai generasi commit...');

for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const numCommits = Math.floor(Math.random() * 6); 
    for (let i = 0; i < numCommits; i++) {
        const dateStr = d.toISOString();
        fs.appendFileSync(FILE_NAME, `Fake commit on ${dateStr}\n`);

        execSync('git add .');
        execSync(`git commit -m "Auto commit" --date="${dateStr}"`, {
            env: { ...process.env, GIT_COMMITTER_DATE: dateStr }
        });
    }
}

console.log('Selesai! Silakan push ke GitHub.');