const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')
const serviceAccount = require('../secrets/firebase-adminsdk.json')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const festivalId = 'H1jDo2vLM52hP4QnSUfj'
const teaserArtists = [
  'Adam Beyer',
  'Anfisa Letyago',
  'Anna',
  'Blawan',
  'The Blessed Madonna',
  'Carl Craig',
  'Claude Vonstroke',
  'DJ Minx',
  'Drama',
  'Eris Drew',
  'Octo Octa',
  'Goldie',
  'LTJ Bukem',
  'James Murphy',
  'Jeff Mills',
  'Louie Vega',
  'Maceo Plex',
  'Natasha Diggs',
  'Paula Temple',
  'Richie Hawtin',
  'Seth Troxler',
]
const richieHawtinResults = [
  {
    key: '/rhawtin/richie-hawtin-the-block-23917/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-the-block-23917/',
    name: 'Richie Hawtin @ The Block, Tel Aviv  22.09.2017',
    tags: [ [Object], [Object], [Object] ],
    created_time: '2017-10-06T12:58:20Z',
    updated_time: '2017-10-05T07:23:18Z',
    play_count: 126275,
    favorite_count: 4857,
    comment_count: 138,
    listener_count: 40558,
    repost_count: 954,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/2/d/0/9/86ae-6d71-467c-89ec-3f7685fe6859',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/2/d/0/9/86ae-6d71-467c-89ec-3f7685fe6859',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/2/d/0/9/86ae-6d71-467c-89ec-3f7685fe6859',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/2/d/0/9/86ae-6d71-467c-89ec-3f7685fe6859',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/2/d/0/9/86ae-6d71-467c-89ec-3f7685fe6859',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/2/d/0/9/86ae-6d71-467c-89ec-3f7685fe6859',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/2/d/0/9/86ae-6d71-467c-89ec-3f7685fe6859',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/2/d/0/9/86ae-6d71-467c-89ec-3f7685fe6859',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/2/d/0/9/86ae-6d71-467c-89ec-3f7685fe6859',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/2/d/0/9/86ae-6d71-467c-89ec-3f7685fe6859'
    },
    slug: 'richie-hawtin-the-block-23917',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 13786
  },
  {
    key: '/rhawtin/richie-hawtin-vs-deadmau5-aka-testpilot-live-sxsw-2013/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-vs-deadmau5-aka-testpilot-live-sxsw-2013/',
    name: 'Richie Hawtin vs. deadmau5 (aka testpilot) - Live @ SXSW 2013',
    tags: [ [Object], [Object], [Object], [Object], [Object] ],
    created_time: '2014-03-14T13:20:54Z',
    updated_time: '2014-03-14T13:20:54Z',
    play_count: 98078,
    favorite_count: 4489,
    comment_count: 126,
    listener_count: 28237,
    repost_count: 700,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/d/f/4/3/8c42-63b9-42dc-a6a9-03173e138092.jpg',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/d/f/4/3/8c42-63b9-42dc-a6a9-03173e138092.jpg',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/d/f/4/3/8c42-63b9-42dc-a6a9-03173e138092.jpg',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/d/f/4/3/8c42-63b9-42dc-a6a9-03173e138092.jpg',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/d/f/4/3/8c42-63b9-42dc-a6a9-03173e138092.jpg',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/d/f/4/3/8c42-63b9-42dc-a6a9-03173e138092.jpg',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/d/f/4/3/8c42-63b9-42dc-a6a9-03173e138092.jpg',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/d/f/4/3/8c42-63b9-42dc-a6a9-03173e138092.jpg',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/d/f/4/3/8c42-63b9-42dc-a6a9-03173e138092.jpg',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/d/f/4/3/8c42-63b9-42dc-a6a9-03173e138092.jpg'
    },
    slug: 'richie-hawtin-vs-deadmau5-aka-testpilot-live-sxsw-2013',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 6013
  },
  {
    key: '/rhawtin/celebration-of-curation-2013-canada-richie-hawtin/',
    url: 'https://www.mixcloud.com/rhawtin/celebration-of-curation-2013-canada-richie-hawtin/',
    name: 'Celebration of Curation 2013 #Canada: Richie Hawtin',
    tags: [ [Object], [Object], [Object], [Object], [Object] ],
    created_time: '2013-09-26T13:51:14Z',
    updated_time: '2013-10-21T16:45:19Z',
    play_count: 45611,
    favorite_count: 2201,
    comment_count: 89,
    listener_count: 13752,
    repost_count: 179,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/7/2/a/b/f556-2632-43c1-823e-4b59981d3d16.jpg',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/7/2/a/b/f556-2632-43c1-823e-4b59981d3d16.jpg',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/7/2/a/b/f556-2632-43c1-823e-4b59981d3d16.jpg',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/7/2/a/b/f556-2632-43c1-823e-4b59981d3d16.jpg',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/7/2/a/b/f556-2632-43c1-823e-4b59981d3d16.jpg',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/7/2/a/b/f556-2632-43c1-823e-4b59981d3d16.jpg',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/7/2/a/b/f556-2632-43c1-823e-4b59981d3d16.jpg',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/7/2/a/b/f556-2632-43c1-823e-4b59981d3d16.jpg',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/7/2/a/b/f556-2632-43c1-823e-4b59981d3d16.jpg',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/7/2/a/b/f556-2632-43c1-823e-4b59981d3d16.jpg'
    },
    slug: 'celebration-of-curation-2013-canada-richie-hawtin',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 14003
  },
  {
    key: '/rhawtin/richie-hawtin-bpm-festival-portugal-19092018mp/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-bpm-festival-portugal-19092018mp/',
    name: 'Richie Hawtin - BPM Festival Portugal 19.09.2018',
    tags: [ [Object], [Object], [Object], [Object] ],
    created_time: '2018-10-15T15:34:36Z',
    updated_time: '2018-10-15T14:03:15Z',
    play_count: 36872,
    favorite_count: 1666,
    comment_count: 40,
    listener_count: 12498,
    repost_count: 338,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/d/a/4/c/79f0-00f4-4988-8ade-a01915f0087e',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/d/a/4/c/79f0-00f4-4988-8ade-a01915f0087e',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/d/a/4/c/79f0-00f4-4988-8ade-a01915f0087e',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/d/a/4/c/79f0-00f4-4988-8ade-a01915f0087e',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/d/a/4/c/79f0-00f4-4988-8ade-a01915f0087e',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/d/a/4/c/79f0-00f4-4988-8ade-a01915f0087e',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/d/a/4/c/79f0-00f4-4988-8ade-a01915f0087e',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/d/a/4/c/79f0-00f4-4988-8ade-a01915f0087e',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/d/a/4/c/79f0-00f4-4988-8ade-a01915f0087e',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/d/a/4/c/79f0-00f4-4988-8ade-a01915f0087e'
    },
    slug: 'richie-hawtin-bpm-festival-portugal-19092018mp',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 6837
  },
  {
    key: '/rhawtin/richie-hawtin-close-live-mad-cool-festival-madrid/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-close-live-mad-cool-festival-madrid/',
    name: 'Richie Hawtin - CLOSE Live - Mad Cool Festival - Madrid - 14.07.2018',
    tags: [ [Object], [Object], [Object], [Object] ],
    created_time: '2018-10-08T16:00:00Z',
    updated_time: '2018-10-08T14:56:44Z',
    play_count: 32333,
    favorite_count: 1705,
    comment_count: 38,
    listener_count: 11909,
    repost_count: 376,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/1/4/6/2/9af3-ad27-4cbe-a8ec-7e5d086763dd',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/1/4/6/2/9af3-ad27-4cbe-a8ec-7e5d086763dd',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/1/4/6/2/9af3-ad27-4cbe-a8ec-7e5d086763dd',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/1/4/6/2/9af3-ad27-4cbe-a8ec-7e5d086763dd',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/1/4/6/2/9af3-ad27-4cbe-a8ec-7e5d086763dd',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/1/4/6/2/9af3-ad27-4cbe-a8ec-7e5d086763dd',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/1/4/6/2/9af3-ad27-4cbe-a8ec-7e5d086763dd',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/1/4/6/2/9af3-ad27-4cbe-a8ec-7e5d086763dd',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/1/4/6/2/9af3-ad27-4cbe-a8ec-7e5d086763dd',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/1/4/6/2/9af3-ad27-4cbe-a8ec-7e5d086763dd'
    },
    slug: 'richie-hawtin-close-live-mad-cool-festival-madrid',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 2300
  },
  {
    key: '/rhawtin/richie-hawtin-contact-munich-germany-01122018/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-contact-munich-germany-01122018/',
    name: 'Richie Hawtin - CONTACT - Munich, Germany 01.12.2018',
    tags: [ [Object], [Object], [Object] ],
    created_time: '2019-01-01T08:00:08Z',
    updated_time: '2018-12-31T16:41:16Z',
    play_count: 26200,
    favorite_count: 1331,
    comment_count: 57,
    listener_count: 9116,
    repost_count: 273,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/8/d/0/e/9132-5aa3-47f3-a1b0-b571c4b03112',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/8/d/0/e/9132-5aa3-47f3-a1b0-b571c4b03112',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/8/d/0/e/9132-5aa3-47f3-a1b0-b571c4b03112',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/8/d/0/e/9132-5aa3-47f3-a1b0-b571c4b03112',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/8/d/0/e/9132-5aa3-47f3-a1b0-b571c4b03112',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/8/d/0/e/9132-5aa3-47f3-a1b0-b571c4b03112',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/8/d/0/e/9132-5aa3-47f3-a1b0-b571c4b03112',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/8/d/0/e/9132-5aa3-47f3-a1b0-b571c4b03112',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/8/d/0/e/9132-5aa3-47f3-a1b0-b571c4b03112',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/8/d/0/e/9132-5aa3-47f3-a1b0-b571c4b03112'
    },
    slug: 'richie-hawtin-contact-munich-germany-01122018',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 6513
  },
  {
    key: '/ENTERofficial/paco-osuna-b2b-richie-hawtin-enterweek-2-sake-space-ibiza-july-9th-2015/',
    url: 'https://www.mixcloud.com/ENTERofficial/paco-osuna-b2b-richie-hawtin-enterweek-2-sake-space-ibiza-july-9th-2015/',
    name: 'Paco Osuna B2B Richie Hawtin: ENTER.Week 2, Sake (Space Ibiza, July 9th 2015)',
    tags: [ [Object], [Object], [Object], [Object], [Object] ],
    created_time: '2015-07-21T15:19:31Z',
    updated_time: '2015-07-21T15:18:37Z',
    play_count: 79544,
    favorite_count: 2596,
    comment_count: 41,
    listener_count: 27062,
    repost_count: 557,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/5/e/c/9/88d3-d152-429c-b9e3-6ccea3d8c1d2.jpg',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/5/e/c/9/88d3-d152-429c-b9e3-6ccea3d8c1d2.jpg',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/5/e/c/9/88d3-d152-429c-b9e3-6ccea3d8c1d2.jpg',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/5/e/c/9/88d3-d152-429c-b9e3-6ccea3d8c1d2.jpg',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/5/e/c/9/88d3-d152-429c-b9e3-6ccea3d8c1d2.jpg',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/5/e/c/9/88d3-d152-429c-b9e3-6ccea3d8c1d2.jpg',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/5/e/c/9/88d3-d152-429c-b9e3-6ccea3d8c1d2.jpg',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/5/e/c/9/88d3-d152-429c-b9e3-6ccea3d8c1d2.jpg',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/5/e/c/9/88d3-d152-429c-b9e3-6ccea3d8c1d2.jpg',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/5/e/c/9/88d3-d152-429c-b9e3-6ccea3d8c1d2.jpg'
    },
    slug: 'paco-osuna-b2b-richie-hawtin-enterweek-2-sake-space-ibiza-july-9th-2015',
    user: {
      key: '/ENTERofficial/',
      url: 'https://www.mixcloud.com/ENTERofficial/',
      name: 'ENTER.',
      username: 'ENTERofficial',
      pictures: [Object]
    },
    audio_length: 6270
  },
  {
    key: '/rhawtin/richie-hawtin-de9-fragments-8-diagonal-ra-sonar-barcelona-june-14-2013/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-de9-fragments-8-diagonal-ra-sonar-barcelona-june-14-2013/',
    name: 'Richie Hawtin: DE9 Fragments 8. Diagonal, RA: Sonar (Barcelona, June 14, 2013)',
    tags: [ [Object], [Object], [Object], [Object], [Object] ],
    created_time: '2013-07-03T10:55:58Z',
    updated_time: '2013-10-19T14:57:56Z',
    play_count: 22089,
    favorite_count: 1094,
    comment_count: 41,
    listener_count: 7303,
    repost_count: 104,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/c/9/7/0/e47d-c94f-4417-bd75-b9c7eaa47ac1.jpg',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/c/9/7/0/e47d-c94f-4417-bd75-b9c7eaa47ac1.jpg',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/c/9/7/0/e47d-c94f-4417-bd75-b9c7eaa47ac1.jpg',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/c/9/7/0/e47d-c94f-4417-bd75-b9c7eaa47ac1.jpg',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/c/9/7/0/e47d-c94f-4417-bd75-b9c7eaa47ac1.jpg',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/c/9/7/0/e47d-c94f-4417-bd75-b9c7eaa47ac1.jpg',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/c/9/7/0/e47d-c94f-4417-bd75-b9c7eaa47ac1.jpg',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/c/9/7/0/e47d-c94f-4417-bd75-b9c7eaa47ac1.jpg',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/c/9/7/0/e47d-c94f-4417-bd75-b9c7eaa47ac1.jpg',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/c/9/7/0/e47d-c94f-4417-bd75-b9c7eaa47ac1.jpg'
    },
    slug: 'richie-hawtin-de9-fragments-8-diagonal-ra-sonar-barcelona-june-14-2013',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 3652
  },
  {
    key: '/rhawtin/richie-hawtin-de9-fragments-episode-7-somewhere-in-africa-february-2013/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-de9-fragments-episode-7-somewhere-in-africa-february-2013/',
    name: 'Richie Hawtin: DE9 Fragments Episode 7. Somewhere in Africa (February, 2013)',
    tags: [ [Object], [Object], [Object] ],
    created_time: '2013-04-12T20:18:42Z',
    updated_time: '2013-10-20T15:46:51Z',
    play_count: 17318,
    favorite_count: 817,
    comment_count: 52,
    listener_count: 5873,
    repost_count: 65,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/b/6/9/e/b604-e683-49a5-af34-2d646e2f5ed2.jpg',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/b/6/9/e/b604-e683-49a5-af34-2d646e2f5ed2.jpg',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/b/6/9/e/b604-e683-49a5-af34-2d646e2f5ed2.jpg',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/b/6/9/e/b604-e683-49a5-af34-2d646e2f5ed2.jpg',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/b/6/9/e/b604-e683-49a5-af34-2d646e2f5ed2.jpg',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/b/6/9/e/b604-e683-49a5-af34-2d646e2f5ed2.jpg',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/b/6/9/e/b604-e683-49a5-af34-2d646e2f5ed2.jpg',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/b/6/9/e/b604-e683-49a5-af34-2d646e2f5ed2.jpg',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/b/6/9/e/b604-e683-49a5-af34-2d646e2f5ed2.jpg',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/b/6/9/e/b604-e683-49a5-af34-2d646e2f5ed2.jpg'
    },
    slug: 'richie-hawtin-de9-fragments-episode-7-somewhere-in-africa-february-2013',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 2869
  },
  {
    key: '/rhawtin/junction-2-london-uk-08062019/',
    url: 'https://www.mixcloud.com/rhawtin/junction-2-london-uk-08062019/',
    name: 'Richie Hawtin - Junction 2 - London, UK 08.06.2019',
    tags: [ [Object], [Object], [Object] ],
    created_time: '2019-07-16T09:38:40Z',
    updated_time: '2019-07-16T09:14:41Z',
    play_count: 16613,
    favorite_count: 836,
    comment_count: 31,
    listener_count: 6135,
    repost_count: 175,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/9/2/e/0/0394-89c0-42bf-a56f-7af3d3d4a37b',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/9/2/e/0/0394-89c0-42bf-a56f-7af3d3d4a37b',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/9/2/e/0/0394-89c0-42bf-a56f-7af3d3d4a37b',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/9/2/e/0/0394-89c0-42bf-a56f-7af3d3d4a37b',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/9/2/e/0/0394-89c0-42bf-a56f-7af3d3d4a37b',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/9/2/e/0/0394-89c0-42bf-a56f-7af3d3d4a37b',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/9/2/e/0/0394-89c0-42bf-a56f-7af3d3d4a37b',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/9/2/e/0/0394-89c0-42bf-a56f-7af3d3d4a37b',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/9/2/e/0/0394-89c0-42bf-a56f-7af3d3d4a37b',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/9/2/e/0/0394-89c0-42bf-a56f-7af3d3d4a37b'
    },
    slug: 'junction-2-london-uk-08062019',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 6861
  },
  {
    key: '/rhawtin/richie-hawtin-de9-fragments6-culture-box-copenhagen-aug-24-2012/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-de9-fragments6-culture-box-copenhagen-aug-24-2012/',
    name: 'Richie Hawtin: DE9 Fragments 6. Culture Box (Copenhagen, Aug 24, 2012)',
    tags: [ [Object], [Object], [Object], [Object] ],
    created_time: '2013-02-08T21:29:17Z',
    updated_time: '2013-10-19T05:05:30Z',
    play_count: 14533,
    favorite_count: 609,
    comment_count: 47,
    listener_count: 4176,
    repost_count: 34,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/e/f/6/7/ef56-0ace-44b5-8bbe-78e35a743827.jpeg',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/e/f/6/7/ef56-0ace-44b5-8bbe-78e35a743827.jpeg',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/e/f/6/7/ef56-0ace-44b5-8bbe-78e35a743827.jpeg',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/e/f/6/7/ef56-0ace-44b5-8bbe-78e35a743827.jpeg',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/e/f/6/7/ef56-0ace-44b5-8bbe-78e35a743827.jpeg',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/e/f/6/7/ef56-0ace-44b5-8bbe-78e35a743827.jpeg',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/e/f/6/7/ef56-0ace-44b5-8bbe-78e35a743827.jpeg',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/e/f/6/7/ef56-0ace-44b5-8bbe-78e35a743827.jpeg',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/e/f/6/7/ef56-0ace-44b5-8bbe-78e35a743827.jpeg',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/e/f/6/7/ef56-0ace-44b5-8bbe-78e35a743827.jpeg'
    },
    slug: 'richie-hawtin-de9-fragments6-culture-box-copenhagen-aug-24-2012',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 3754
  },
  {
    key: '/rhawtin/richie-hawtin-enter-week-3-sake-space-ibiza-july-18-2013/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-enter-week-3-sake-space-ibiza-july-18-2013/',
    name: 'Richie Hawtin: ENTER. Week 3. Sake (Space, Ibiza, July 18, 2013)',
    tags: [ [Object], [Object], [Object], [Object], [Object] ],
    created_time: '2013-09-05T10:12:34Z',
    updated_time: '2013-10-21T12:01:20Z',
    play_count: 16618,
    favorite_count: 692,
    comment_count: 23,
    listener_count: 5338,
    repost_count: 74,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/b/5/0/c/94fd-5c0c-4977-b310-9ceab697b304.jpg',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/b/5/0/c/94fd-5c0c-4977-b310-9ceab697b304.jpg',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/b/5/0/c/94fd-5c0c-4977-b310-9ceab697b304.jpg',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/b/5/0/c/94fd-5c0c-4977-b310-9ceab697b304.jpg',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/b/5/0/c/94fd-5c0c-4977-b310-9ceab697b304.jpg',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/b/5/0/c/94fd-5c0c-4977-b310-9ceab697b304.jpg',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/b/5/0/c/94fd-5c0c-4977-b310-9ceab697b304.jpg',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/b/5/0/c/94fd-5c0c-4977-b310-9ceab697b304.jpg',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/b/5/0/c/94fd-5c0c-4977-b310-9ceab697b304.jpg',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/b/5/0/c/94fd-5c0c-4977-b310-9ceab697b304.jpg'
    },
    slug: 'richie-hawtin-enter-week-3-sake-space-ibiza-july-18-2013',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 4756
  },
  {
    key: '/rhawtin/richie-hawtin-de9-fragments4-watergate-10-year-berlin-aug-25-2012/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-de9-fragments4-watergate-10-year-berlin-aug-25-2012/',
    name: 'Richie Hawtin DE9 Fragments 4. Watergate 10 Year (Berlin, Aug 25, 2012)',
    tags: [ [Object], [Object], [Object], [Object], [Object] ],
    created_time: '2012-09-06T13:22:01Z',
    updated_time: '2013-10-18T11:25:49Z',
    play_count: 13250,
    favorite_count: 576,
    comment_count: 48,
    listener_count: 4102,
    repost_count: 54,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/7/8/d/8/48d2-5a18-498f-a8e0-c6cc79eead96.jpg',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/7/8/d/8/48d2-5a18-498f-a8e0-c6cc79eead96.jpg',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/7/8/d/8/48d2-5a18-498f-a8e0-c6cc79eead96.jpg',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/7/8/d/8/48d2-5a18-498f-a8e0-c6cc79eead96.jpg',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/7/8/d/8/48d2-5a18-498f-a8e0-c6cc79eead96.jpg',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/7/8/d/8/48d2-5a18-498f-a8e0-c6cc79eead96.jpg',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/7/8/d/8/48d2-5a18-498f-a8e0-c6cc79eead96.jpg',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/7/8/d/8/48d2-5a18-498f-a8e0-c6cc79eead96.jpg',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/7/8/d/8/48d2-5a18-498f-a8e0-c6cc79eead96.jpg',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/7/8/d/8/48d2-5a18-498f-a8e0-c6cc79eead96.jpg'
    },
    slug: 'richie-hawtin-de9-fragments4-watergate-10-year-berlin-aug-25-2012',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 7220
  },
  {
    key: '/rhawtin/richie-hawtin-121-festival-wellington-new-zealand-13032020/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-121-festival-wellington-new-zealand-13032020/',
    name: 'Richie Hawtin - 121 Festival - Wellington, New Zealand - 13.03.2020',
    tags: [ [Object], [Object], [Object], [Object], [Object] ],
    created_time: '2020-04-17T20:41:12Z',
    updated_time: '2020-04-17T20:40:21Z',
    play_count: 11306,
    favorite_count: 447,
    comment_count: 35,
    listener_count: 4326,
    repost_count: 88,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/8/5/f/1/2719-9e5a-46f2-ab07-bb0eea26ad23',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/8/5/f/1/2719-9e5a-46f2-ab07-bb0eea26ad23',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/8/5/f/1/2719-9e5a-46f2-ab07-bb0eea26ad23',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/8/5/f/1/2719-9e5a-46f2-ab07-bb0eea26ad23',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/8/5/f/1/2719-9e5a-46f2-ab07-bb0eea26ad23',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/8/5/f/1/2719-9e5a-46f2-ab07-bb0eea26ad23',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/8/5/f/1/2719-9e5a-46f2-ab07-bb0eea26ad23',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/8/5/f/1/2719-9e5a-46f2-ab07-bb0eea26ad23',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/8/5/f/1/2719-9e5a-46f2-ab07-bb0eea26ad23',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/8/5/f/1/2719-9e5a-46f2-ab07-bb0eea26ad23'
    },
    slug: 'richie-hawtin-121-festival-wellington-new-zealand-13032020',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 6897
  },
  {
    key: '/rhawtin/richie-hawtin-time-warp-new-york-usa-22112019/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-time-warp-new-york-usa-22112019/',
    name: 'Richie Hawtin - Time Warp New York, USA 22.11.2019',
    tags: [ [Object], [Object], [Object] ],
    created_time: '2019-12-29T19:49:12Z',
    updated_time: '2019-12-29T19:48:35Z',
    play_count: 10157,
    favorite_count: 496,
    comment_count: 31,
    listener_count: 3832,
    repost_count: 110,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/0/f/d/3/edca-60ba-47f5-9c97-3eab37064255',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/0/f/d/3/edca-60ba-47f5-9c97-3eab37064255',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/0/f/d/3/edca-60ba-47f5-9c97-3eab37064255',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/0/f/d/3/edca-60ba-47f5-9c97-3eab37064255',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/0/f/d/3/edca-60ba-47f5-9c97-3eab37064255',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/0/f/d/3/edca-60ba-47f5-9c97-3eab37064255',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/0/f/d/3/edca-60ba-47f5-9c97-3eab37064255',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/0/f/d/3/edca-60ba-47f5-9c97-3eab37064255',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/0/f/d/3/edca-60ba-47f5-9c97-3eab37064255',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/0/f/d/3/edca-60ba-47f5-9c97-3eab37064255'
    },
    slug: 'richie-hawtin-time-warp-new-york-usa-22112019',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 5910
  },
  {
    key: '/rhawtin/bbc-radio-1-btraits-richie-hawtin-christmas-special/',
    url: 'https://www.mixcloud.com/rhawtin/bbc-radio-1-btraits-richie-hawtin-christmas-special/',
    name: 'BBC Radio 1  - B.Traits Christmas Special, Richie Hawtin CLOSE live 23.12.2017',
    tags: [ [Object], [Object], [Object], [Object], [Object] ],
    created_time: '2018-03-21T16:31:55Z',
    updated_time: '2018-03-21T16:25:02Z',
    play_count: 17220,
    favorite_count: 615,
    comment_count: 12,
    listener_count: 3650,
    repost_count: 105,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/0/8/3/c/100b-01e4-477b-b6ae-5351d2bee255',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/0/8/3/c/100b-01e4-477b-b6ae-5351d2bee255',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/0/8/3/c/100b-01e4-477b-b6ae-5351d2bee255',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/0/8/3/c/100b-01e4-477b-b6ae-5351d2bee255',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/0/8/3/c/100b-01e4-477b-b6ae-5351d2bee255',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/0/8/3/c/100b-01e4-477b-b6ae-5351d2bee255',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/0/8/3/c/100b-01e4-477b-b6ae-5351d2bee255',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/0/8/3/c/100b-01e4-477b-b6ae-5351d2bee255',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/0/8/3/c/100b-01e4-477b-b6ae-5351d2bee255',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/0/8/3/c/100b-01e4-477b-b6ae-5351d2bee255'
    },
    slug: 'bbc-radio-1-btraits-richie-hawtin-christmas-special',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 10793
  },
  {
    key: '/rhawtin/richie-hawtin-enter-week-1-sake-space-ibiza-july-4-2013/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-enter-week-1-sake-space-ibiza-july-4-2013/',
    name: 'Richie Hawtin: ENTER. Week 1. Sake (Space, Ibiza, July 4, 2013)',
    tags: [ [Object], [Object], [Object], [Object], [Object] ],
    created_time: '2013-08-20T16:56:26Z',
    updated_time: '2013-10-19T12:58:44Z',
    play_count: 8960,
    favorite_count: 401,
    comment_count: 15,
    listener_count: 2888,
    repost_count: 38,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/a/7/9/8/5b99-4689-4eb1-9871-a3e037f281aa.jpg',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/a/7/9/8/5b99-4689-4eb1-9871-a3e037f281aa.jpg',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/a/7/9/8/5b99-4689-4eb1-9871-a3e037f281aa.jpg',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/a/7/9/8/5b99-4689-4eb1-9871-a3e037f281aa.jpg',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/a/7/9/8/5b99-4689-4eb1-9871-a3e037f281aa.jpg',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/a/7/9/8/5b99-4689-4eb1-9871-a3e037f281aa.jpg',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/a/7/9/8/5b99-4689-4eb1-9871-a3e037f281aa.jpg',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/a/7/9/8/5b99-4689-4eb1-9871-a3e037f281aa.jpg',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/a/7/9/8/5b99-4689-4eb1-9871-a3e037f281aa.jpg',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/a/7/9/8/5b99-4689-4eb1-9871-a3e037f281aa.jpg'
    },
    slug: 'richie-hawtin-enter-week-1-sake-space-ibiza-july-4-2013',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 4870
  },
  {
    key: '/rhawtin/richie-hawtin-beacon-festival-auckland-new-zealand-14032020/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-beacon-festival-auckland-new-zealand-14032020/',
    name: 'Richie Hawtin - Beacon Festival - Auckland, New Zealand - 14.03.2020',
    tags: [ [Object], [Object], [Object], [Object], [Object] ],
    created_time: '2020-04-17T20:21:23Z',
    updated_time: '2020-04-17T20:19:17Z',
    play_count: 7019,
    favorite_count: 333,
    comment_count: 18,
    listener_count: 2720,
    repost_count: 65,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/b/0/6/8/0bae-87a2-4a5b-9c34-3b0bbaeda0ef',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/b/0/6/8/0bae-87a2-4a5b-9c34-3b0bbaeda0ef',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/b/0/6/8/0bae-87a2-4a5b-9c34-3b0bbaeda0ef',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/b/0/6/8/0bae-87a2-4a5b-9c34-3b0bbaeda0ef',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/b/0/6/8/0bae-87a2-4a5b-9c34-3b0bbaeda0ef',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/b/0/6/8/0bae-87a2-4a5b-9c34-3b0bbaeda0ef',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/b/0/6/8/0bae-87a2-4a5b-9c34-3b0bbaeda0ef',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/b/0/6/8/0bae-87a2-4a5b-9c34-3b0bbaeda0ef',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/b/0/6/8/0bae-87a2-4a5b-9c34-3b0bbaeda0ef',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/b/0/6/8/0bae-87a2-4a5b-9c34-3b0bbaeda0ef'
    },
    slug: 'richie-hawtin-beacon-festival-auckland-new-zealand-14032020',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 7264
  },
  {
    key: '/rhawtin/richie-hawtin-club-fauna-santiago-chile/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-club-fauna-santiago-chile/',
    name: 'Richie Hawtin - Club Fauna - Santiago Chile 09.11.2019',
    tags: [ [Object], [Object], [Object] ],
    created_time: '2019-12-29T19:08:43Z',
    updated_time: '2019-12-29T18:47:05Z',
    play_count: 6497,
    favorite_count: 305,
    comment_count: 16,
    listener_count: 2516,
    repost_count: 65,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/2/a/b/0/8efb-a8c6-465b-8086-9a59aae8ab56',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/2/a/b/0/8efb-a8c6-465b-8086-9a59aae8ab56',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/2/a/b/0/8efb-a8c6-465b-8086-9a59aae8ab56',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/2/a/b/0/8efb-a8c6-465b-8086-9a59aae8ab56',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/2/a/b/0/8efb-a8c6-465b-8086-9a59aae8ab56',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/2/a/b/0/8efb-a8c6-465b-8086-9a59aae8ab56',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/2/a/b/0/8efb-a8c6-465b-8086-9a59aae8ab56',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/2/a/b/0/8efb-a8c6-465b-8086-9a59aae8ab56',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/2/a/b/0/8efb-a8c6-465b-8086-9a59aae8ab56',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/2/a/b/0/8efb-a8c6-465b-8086-9a59aae8ab56'
    },
    slug: 'richie-hawtin-club-fauna-santiago-chile',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 11590
  },
  {
    key: '/rhawtin/richie-hawtin-fold-london/',
    url: 'https://www.mixcloud.com/rhawtin/richie-hawtin-fold-london/',
    name: 'Richie Hawtin - FOLD - London UK  19.10.2019',
    tags: [ [Object], [Object], [Object] ],
    created_time: '2019-12-29T19:31:35Z',
    updated_time: '2019-12-29T19:26:30Z',
    play_count: 6664,
    favorite_count: 367,
    comment_count: 24,
    listener_count: 2550,
    repost_count: 75,
    pictures: {
      small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/extaudio/b/b/9/d/720f-1944-4a04-adf9-9e136414e79a',
      thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/extaudio/b/b/9/d/720f-1944-4a04-adf9-9e136414e79a',
      medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/extaudio/b/b/9/d/720f-1944-4a04-adf9-9e136414e79a',
      medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/extaudio/b/b/9/d/720f-1944-4a04-adf9-9e136414e79a',
      large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/b/b/9/d/720f-1944-4a04-adf9-9e136414e79a',
      '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/b/b/9/d/720f-1944-4a04-adf9-9e136414e79a',
      extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/b/b/9/d/720f-1944-4a04-adf9-9e136414e79a',
      '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/extaudio/b/b/9/d/720f-1944-4a04-adf9-9e136414e79a',
      '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/extaudio/b/b/9/d/720f-1944-4a04-adf9-9e136414e79a',
      '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/extaudio/b/b/9/d/720f-1944-4a04-adf9-9e136414e79a'
    },
    slug: 'richie-hawtin-fold-london',
    user: {
      key: '/rhawtin/',
      url: 'https://www.mixcloud.com/rhawtin/',
      name: 'Richie Hawtin',
      username: 'rhawtin',
      pictures: [Object]
    },
    audio_length: 7452
  }
]

class FestivalrImporter {
  constructor() {
    initializeApp({
      credential: cert(serviceAccount)
    })

    this.db = getFirestore()
    this.festivalReference = this.db.doc(`festivals/${festivalId}`)
  }

  async printFestivals() {
    const snapshot = await this.db.collection('festivals').get()

    let festivals = {}

    snapshot.forEach((doc) => {
      festivals[doc.id] = doc.data()
    })

    console.log(festivals)
  }

  async addFestivalArtists() {
    teaserArtists.forEach(async (name) => {
      this.addFestivalArtist(name)
    })
  }

  async addFestivalArtist(name) {
    name = name.trim()
    const normalizedName = name.toLowerCase()

    const artistsCollection = this.db.collection('artists')
    const querySnapshot = await artistsCollection.where('normalizedName', '==', normalizedName).get()

    let artistReference

    querySnapshot.forEach((documentSnapshot) => {
      artistReference = documentSnapshot.ref
      console.log('found artist', {id: artistReference.id, data: documentSnapshot.data()})
    })

    if (!artistReference) {
      const data = {name, normalizedName}
      artistReference = await artistsCollection.add(data)
      console.log('created artist', {id: artistReference.id, data})
    }

    this.findOrCreateFestivalArtist(artistReference)
  }

  async findOrCreateFestivalArtist(artistReference) {
    const festivalArtistsCollection = this.db.collection('festivalArtists')
    const data = {festival: this.festivalReference, artist: artistReference}
    const querySnapshot = await festivalArtistsCollection.where('festival', '==', data.festival).where('artist', '==', data.artist).get()

    let festivalArtistSnapshot
    querySnapshot.forEach((documentSnapshot) => {
      festivalArtistSnapshot = documentSnapshot
    })

    if (festivalArtistSnapshot) {
      console.log('found festivalArtist', {
        id: festivalArtistSnapshot.id,
        data: festivalArtistSnapshot.data()
      })
    } else {
      const festivalArtistReference = await festivalArtistsCollection.add(data)
      console.log('created festivalArtist', {id: festivalArtistReference.id, data})
    }
  }

  inGroupsOf(array, size) {
    const groups = []

    array.forEach((item, index) => {
      const groupIndex = Math.floor(index / size)
      groups[groupIndex] = groups[groupIndex] || []
      groups[groupIndex].push(item)
    })

    return groups
  }

  async findExistingMixcloudKeys(resultMixcloudKeys) {
    const trackCollection = this.db.collection('tracks')
    const querySnapshot = await trackCollection.where('key', 'in', resultMixcloudKeys).select('key').get()

    const existingMixcloudIds = []
    querySnapshot.forEach((trackSnapshot) => {
      existingMixcloudIds.push(trackSnapshot.data().mixcloudId)
    })

    return existingMixcloudIds
  }

  async fetchArtistSnapshotByName(artistName) {
    const artistCollection = this.db.collection('artists')
    const querySnapshot = await artistCollection.where('name', '==', artistName).get()

    let artist
    querySnapshot.forEach((documentSnapshot) => {
      artist = documentSnapshot
    })

    return artist
  }

  async batchedFindOrCreate({keyField, collectionName, documents}) {
    const collection = this.db.collection(collectionName)
    const batch = this.db.batch() 

    const groups = this.inGroupsOf(documents, 10)
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i]

      const documentKeys = group.map((document) => document[keyField])

      const existingKeys = []
      const querySnapshot = await collection.where(keyField, 'in', documentKeys).select(keyField).get()
      querySnapshot.forEach((documentSnapshot) => {
        existingKeys.push(documentSnapshot.data()[keyField])
      })

      group.forEach((document) => {
        if (!existingKeys.includes(document[keyField])) {
          console.log('adding track to create batch', document)
          batch.set(collection.doc(), document)
        }
      })
    }

    batch.commit()
  }

  async fillArtistResults(artistSnapshot) {
    const mixcloudResults = await this.fetchArtistMixcloudResults(artistSnapshot)
    const trackDocuments = mixcloudResults.map((result) => {
      return {
        artist: artistSnapshot.ref,
        key: result.key,
        name: result.name,
        slug: result.slug,
        url: result.url,
        postedAt: new Date(result.created_time)
      }
    })

    console.log(trackDocuments)

    this.batchedFindOrCreate({
      keyField: 'key',
      collectionName: 'tracks',
      documents: trackDocuments
    })
  }

  async fetchArtistMixcloudResults(artistSnapshot) {
    const name = artistSnapshot.data().name
    const params = new URLSearchParams({
      q: `"${name}"`,
      type: 'cloudcast'
    })
    let response = await fetch('https://api.mixcloud.com/search/?' + params.toString())
    response = await response.json()
    const results = response.data
    console.log(results)

    return results
  }

  async fillAllArtistResults() {
    const artistCollection = this.db.collection('artists')
    const querySnapshot = await artistCollection.get()
    const artistSnapshots = this.documentSnapshotArray(querySnapshot)

    for(let i = 0; i < artistSnapshots.length; i++) {
      const artistSnapshot = artistSnapshots[i]
      console.log(artistSnapshot)
      await this.fillArtistResults(artistSnapshot)
    }
  }

  documentSnapshotArray(querySnapshot) {
    const snapshots = []

    querySnapshot.forEach((documentSnapshot) => {
      snapshots.push(documentSnapshot)
    })

    return snapshots
  }
}

const importer = new FestivalrImporter()
importer.fillAllArtistResults()