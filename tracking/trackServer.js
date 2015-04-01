// tracking server

var Server = require('bittorrent-tracker').Server;
var server = new Server({
  filter: function (infoHash, params) {
    // black/whitelist for disallowing/allowing torrents [default=allow all]
    // this example only allows this one torrent
    return infoHash === 'aaa67059ed6bd08362da625b3ae77f6f4a075aaa'

    // you can also block by peer id (whitelisting torrent clients) or by
    // secret key, as you get full access to the original http GET
    // request parameters in `params`
  });
});