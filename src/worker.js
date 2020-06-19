import { attach } from 'perimeterx-axios-interceptor';
import { queue } from  'async-es';
import axios from 'axios';

import { db } from './';

// See https://www.npmjs.com/package/perimeterx-axios-interceptor
attach(axios, {
  modalConfig: {
    className: 'perimeterx-challenge-popup',
    title: 'Please complete the challenge',
    subtitle: 'This is a check for loading profile info about your friends.',
    quickfixes: [],
    suffix: 'It\'s okay to ignore this too.',
    timeout: 10000
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getUser(id) {
  const friend = await db.friends.where({ id }).count();

  if (friend) {
    console.log('Already in DB:',friend);
    return;
  }

  const corsAnywhereApi = 'https://jiu34h9ueghlkadfjs02foi2hjdajk.herokuapp.com';
  const url = `${corsAnywhereApi}/https://www.couchsurfing.com/users/${id}`;

  const nameRe =/<meta property="og:title" content="(.+?)" \/>/g;
  const imageRe = /<meta property="og:image" content="(.+?)" \/>/g;

  const axiosOptions = {};
  /*{
    transformResponse: [(data) => {
      console.log('transformResponse 1:',data);
      let newData;
      try {
        const parsedData = JSON.parse(data);
        if (parsedData.blockScript) {
          newData = {
            ...parsedData,
            blockScript: `${corsAnywhereApi}/https://www.couchsurfing.com/${parsedData.blockScript}`,
            jsClientSrc: `${corsAnywhereApi}/https://www.couchsurfing.com/${parsedData.jsClientSrc}`,
          }
        } else {
          newData = data;
        }
      } catch {
        newData = data;
      }

      return JSON.stringify(newData);
    }],
  };*/

  try {
    const { data } = await axios.get(url, axiosOptions);
    const [, name] = nameRe.exec(data);
    const [, image] = imageRe.exec(data);

    console.log({
      id, name, image
    });
    await db.friends.add({ name, image });
  } catch (error) {
    console.error(error);
  }
}

export function fetchUserProfiles(ids) {
  // Create a queue with concurrency 2
  const q = queue(async (id) => {
      //console.log('[WORKER] Processing user ' + id);
      if (id === 8273) {
        return await getUser(id);
      }
      return await sleep(5);
  }, 2);

  // assign a callback
  q.drain(() => {
    console.log('[WORKER] All items have been processed');
  });

  // or await the end
  // await q.drain()

  // assign an error callback
  q.error((err, task) => {
    console.error('[WORKER] Task experienced an error:', err, task);
  });

  q.push(ids, (err) => {
    //console.log('[WORKER] Finished processing user');
  });
}
