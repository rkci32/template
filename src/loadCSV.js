

import Papa from 'papaparse';

export async function loadCSV(filePath) {
    console.log('Attempting to load CSV from:', filePath);
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                complete: results => {
                    const data = results.data
                        .filter(row => row.Division && row.DSOE) // Filter out empty rows
                        .map(row => ({
                            Division: row.Division,
                            DSOE: row.DSOE,
                            DSOE_Photo: row.DSOE_Photo,
                            BackupDSOE: row.BackupDSOE
                        }));
                    console.log('Filtered data:', data);
                    resolve(data);
                },
                error: error => reject(error)
            });
        });
    } catch (error) {
        console.error('CSV loading error:', error);
        throw error;
    }
}

export async function loadSubstations(division) {
    try {
        const response = await fetch('/data/SubstationList.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                complete: results => {
                    // Filter substations by division and sort alphabetically
                    const substations = results.data
                        .filter(row => row.Division === division)
                        .map(row => row.Substation)
                        .filter(Boolean) // Remove empty values
                        .sort((a, b) => a.localeCompare(b)); // Sort alphabetically
                    
                    console.log(`Substations for ${division}:`, substations);
                    resolve(substations);
                },
                error: error => reject(error)
            });
        });
    } catch (error) {
        console.error('Substation loading error:', error);
        throw error;
    }
}