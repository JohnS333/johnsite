const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFile = 'sp500_stocks.csv';
const outputDir = 'stocks';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const stockData = {};

// Read the CSV file line by line
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const stock = row['Symbol']; // Adjust if your column name is different
    if (!stockData[stock]) {
      stockData[stock] = [];
    }
    stockData[stock].push(row);
  })
  .on('end', () => {
    console.log('Finished reading the CSV, now writing files...');
    
    // Write each stock's data to a separate file
    for (const [stock, rows] of Object.entries(stockData)) {
      const outputPath = path.join(outputDir, `${stock}.csv`);
      const headers = Object.keys(rows[0]).join(',') + '\n';
      const data = rows.map(row => Object.values(row).join(',')).join('\n');

      fs.writeFileSync(outputPath, headers + data);
    }

    console.log('Splitting completed!');
  });