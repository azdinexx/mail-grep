import child_process , { spawn }  from 'child_process';
 import { createObjectCsvWriter } from 'csv-writer';
 import fs from 'fs'
 
// ------- Global Variables :----------------- ###

const CONDITIONS = {
  ADMIN_EMAIL : 'Admin Email: ',
  ADMIN_NAME : 'Admin Name: ',
  ADMIN_PHONE : 'Admin Phone: '
}
let input_file = 'output.txt';
const csvHeader = [
  { id: 'domain', title: 'Domain' },
  { id: 'name', title: 'Email' },
  { id: 'email', title: 'Name' },
  { id: 'phone', title: 'Phone' },
];
const csvWriter = createObjectCsvWriter({
  path: 'argan.csv', // Output file name
  header: csvHeader,
  append: true,
});

// ------------------------------------------- ###

const domains = TxtTOArray(input_file)
processDomains(domains)

// -------------- Functions :----------------- ###

// iterate over domains array
// status: #under_constructin
async function processDomains(domains) {
  const lastHandledDomain = getLastHandledDomain('argan.csv');
  const temp = domains;
  if (lastHandledDomain !== 0) {
    const index = temp.indexOf(lastHandledDomain);
    console.log(
      'continuing from index :  ' + index + ' of domain : ' + lastHandledDomain
    );
    domains.splice(0, index);
  }

  for (const domain of temp) {
    await executeChildProcess(domain);
  }
}

// scrape domain info and write to csv (main logic of this repo)
// status: #completed
function executeChildProcess(domain) {
    return new Promise((resolve, reject) => {
      const child = spawn('whois', [domain]);
      console.log('\n-----------------------------------------');
      console.log('domain : ' + domain)
  
      child.stdout.on('data', (stdout) => {
        const data = stdout.toString().split('\n')
        const info ={
          domain : domain,
          name : '',
          email : '',
          phone : '',
        }
        if (data.length> 0) {
          data.map((line)=>{
            if(line.startsWith(CONDITIONS.ADMIN_EMAIL)) info.email = line.split(': ').pop()
            if(line.startsWith(CONDITIONS.ADMIN_NAME)) info.name = line.split(': ').pop()
            if(line.startsWith(CONDITIONS.ADMIN_PHONE)) info.phone = line.split(': ').pop()
          })
        }
        if (info.name === "REDACTED FOR PRIVACY" || info.name === '' || info.email === 'Redacted for Privacy' || info.name === 'Domain Admin' || info.email.length>100 || info.name ===  'REDACTED FOR PRIVACY' ) {
          console.log('REDACTED FOR PRIVACY')
        }else{
          const csvFile = [];

          csvFile.push(info);
          // Write the data to the CSV file.
          csvWriter
            .writeRecords(csvFile)
            .then(() => console.log('CSV file written successfully'))
            .catch((error) => console.error('Error writing CSV file:', error));
        }
        
    });
    child.on('exit', (code) => {
      if (code === 0) {
        console.log('-----------------------------------------\n');

        resolve();
      } 
      resolve();

    });
  
      child.on('error', (err) => {
        console.error(
          `Error executing child process for ${domain}: ${err.message}`
        );
        reject(err);
      });
    });
  }
 

  export function TxtTOArray(filename) {
    const thefileToCovert = fs.readFileSync(filename, 'utf-8');
    console.log(typeof thefileToCovert);
    const arr = thefileToCovert.split('\n');
    console.log('done converting the txt file');
    return arr;
  }
  
  function getLastHandledDomain(output_file) {
    const exists = fs.existsSync(output_file);
    if (exists) {
      const csvFile = fs.readFileSync(output_file, 'utf-8');
      const arr = csvFile.split('\n');
      const lastLine = arr[arr.length - 2];
      const lastDomain = lastLine.split(',')[0];
      return lastDomain;
    } else {
      return 0;
    }
  }
  