import React, { useEffect, useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';

const cacheName = 'images';

const chunk = (arr: any, size: number) =>
  Array.from(
    {
      length: Math.ceil(arr.length / size)
    },
    (v, i) => arr.slice(i * size, i * size + size)
  );

function App() {
  const [images, setImages] = useState<any[][]>([[]]);

  useEffect(() => {
    const q = async () => {
      if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();
        // quota.usage -> Number of bytes used.
        // quota.quota -> Maximum number of bytes available.
        console.log('quota');
        console.log(quota.quota);
        console.log('usage');
        console.log(quota.usage);
        const percentageUsed = (quota.usage! / quota.quota!) * 100;
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota! - quota.usage!;
        console.log(`You can write up to ${remaining / 1024 / 1024} more MB.`);
      }
    };
    q();

    caches.open(cacheName).then((cache) => {
      console.log(cache);
      cache.keys().then((keys) => {
        setImages(chunk(keys, 7));
      });
    });
  }, []);

  const handleClick = (event: any) => {
    console.log(event.target.files);
    console.log(event.target.files);

    Object.values(event.target.files).forEach((file: any) => {
      let url = URL.createObjectURL(file);
      console.log(url);
      fetch(url).then((res) => {
        caches.open(cacheName).then(async (cache) => {
          // SAVE IMAGE INTO CACHE
          await cache.put('pic-' + nanoid() + '.png', res);
          URL.revokeObjectURL(url);
        });
      });
    });
  };

  console.log(images);

  return (
    <div className="App">
      <h3>Total Images</h3>
      <h2>{images.flat().length}</h2>

      <input type="file" id="input" onChange={handleClick} multiple />
      {/*{images.map((imageList) => imageList.map((image) => <img key={image.url} src={image.url} />))}*/}

      <div className="row">
        {images.map((imageList) => (
          <div className="column">
            {imageList.map((image) => (
              <img key={image.url} src={image.url} />
            ))}
          </div>
        ))}
      </div>

      {/*<div className="row">*/}
      {/*  <div className="column">*/}
      {/*    <img src="https://www.w3schools.com/w3images/wedding.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/rocks.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/falls2.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/paris.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/nature.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/mist.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/paris.jpg" style={{ width: '100%' }} />*/}
      {/*  </div>*/}
      {/*  <div className="column">*/}
      {/*    <img src="https://www.w3schools.com/w3images/underwater.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/ocean.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/wedding.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/mountainskies.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/rocks.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/underwater.jpg" style={{ width: '100%' }} />*/}
      {/*  </div>*/}
      {/*  <div className="column">*/}
      {/*    <img src="https://www.w3schools.com/w3images/wedding.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/rocks.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/falls2.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/paris.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/nature.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/mist.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/paris.jpg" style={{ width: '100%' }} />*/}
      {/*  </div>*/}
      {/*  <div className="column">*/}
      {/*    <img src="https://www.w3schools.com/w3images/underwater.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/ocean.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/wedding.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/mountainskies.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/rocks.jpg" style={{ width: '100%' }} />*/}
      {/*    <img src="https://www.w3schools.com/w3images/underwater.jpg" style={{ width: '100%' }} />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default App;
