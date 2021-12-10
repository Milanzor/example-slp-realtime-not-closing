const { SlpFolderStream, SlpRealTime } = require('@vinceau/slp-realtime');
const folderStream = new SlpFolderStream();
const path = require('path');

const realtime = new SlpRealTime();
realtime.setStream(folderStream);

folderStream.start(path.resolve(__dirname, 'slps'), true);

let gameStartSubscription = realtime.game.start$.subscribe((data) => {
    console.log('game started');
});

// None of these stop the process
gameStartSubscription.unsubscribe();
folderStream.end();
folderStream.endReadStream();
folderStream.stop();
folderStream.destroy();
realtime.stream$.observers.forEach(observer => observer.unsubscribe());
