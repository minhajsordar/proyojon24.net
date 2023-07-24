import { unlink } from 'node:fs';
import { readdir } from 'node:fs';

readdir('./uploads', (err, data) => {
  if (err) throw err;
  console.log(data);
  data.forEach(file =>{
    unlink(`./uploads/${file}`, (err) => {
        if (err) throw err;
        console.log(`successfully deleted /uploads/${file}`);
      });
  })
  console.log(data);
}); 