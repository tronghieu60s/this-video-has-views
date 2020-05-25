let { google } = require('googleapis');
let videoId = process.env.VIDEO_ID;
var service = google.youtube('v3');

async function countViewTitle(auth) {
    let statistics = await getStatisticsVideo(auth);
    service.videos.update({
        auth: auth,
        part: 'snippet',
        resource: {
            id: videoId,
            snippet: {
                title: `This Video Has ${statistics.viewCount} Views 😆 || How To Create Video With Title "This Video Has ${statistics.viewCount} Views"`,
                description: `Request Every 10 Minutes Update Quantity.\nThis Video Has:\n   + ${statistics.viewCount} Views 👁️‍🗨️\n   + ${statistics.likeCount} Likes 👍\n   + ${statistics.dislikeCount} Dislikes 👎\n   + ${statistics.favoriteCount} Favorite ❤️\n   + ${statistics.commentCount} Comments 🗨️\n\n☑️ Download Source: https://bit.ly/3cBCELp`,
                categoryId: '22'
            }
        }
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        if (response) console.log(`Request Success: ${new Date(Date.now())}`);
        else console.log('Error: Not Response');
    });
}

function getStatisticsVideo(auth) {
    return service.videos.list({
        auth: auth,
        part: 'statistics',
        id: videoId
    })
        .then(response => {
            let items = response.data.items;
            let itemsSize = items.length;
            if (itemsSize !== 0) {
                return items[0].statistics;
            }
        })
        .catch(err => {
            console.log('The API returned an error: ' + err);
            return;
        })
}

module.exports = { countViewTitle }