import child_process , { spawn }  from 'child_process';
import fs from 'fs'

const output = new Set()
const filename = 'input.txt';
const keywords = new Set(TxtTOArray('keywords.txt'))

function executeChildProcess(keyword) {
    return new Promise((resolve, reject) => {
      console.log('greping for ' + keyword)

      const child = spawn('grep', ['-i' , keyword, filename]);
      child.stdout.on('data', (stdout) => {        
        stdout.toString().split('\n').map((domain)=>{
          output.add(domain)
        })
    });
    child.on('exit', (code) => {
      if (code === 0) {
        console.log('-------------')
        resolve();
      } 
      resolve();

    });
  
      child.on('error', (err) => {
        console.error(
          `Error executing child process for ${keyword}: ${err.message}`
        );
        reject(err);
      });
    });
  }
 
processKeywords(keywords).then(()=>{
    fs.writeFile('output.txt', Array.from(output).toString().replaceAll(',','\n'), (err) => {
      console.log('here is your file ' + output.length)
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Successfully wrote to file: output.txt');
      }
    })}
  )

function TxtTOArray(filename) {
  const thefileToCovert = fs.readFileSync(filename, 'utf-8');
  const arr = thefileToCovert.split('\n');
  console.log('done converting the txt file');
  return arr;
}

async function processKeywords(keywords) {
  for (const keyword of keywords) {
    await executeChildProcess(keyword);
  }
}