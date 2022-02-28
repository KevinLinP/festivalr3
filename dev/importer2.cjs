const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('../secrets/firebase-adminsdk.json')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const festivalId = 'movement 2022'
const teaserArtists = [
  'Adam Beyer',
  'Anfisa Letyago',
  'ANNA',
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

class Importer {
  constructor() {
    initializeApp({
      credential: cert(serviceAccount)
    })

    this.db = getFirestore()
    this.festivalReference = this.db.doc(`festivals/${festivalId}`)
    this.artistsReference = this.db.collection('artists')
  }

  artistRefs() {
    return teaserArtists.map((name) => {
      const id = name.trim().toLowerCase()
      return this.artistsReference.doc(id)
    })
  }

  async createOrUpdateFestival() {
    const festivalData = {
      name: 'Movement 2022',
      artists: this.artistRefs()
    }

    await this.festivalReference.set(festivalData, {merge: true})
  }

  async createOrUpdateArtists() {
    const batch = this.db.batch()
    const artistRefs = this.artistRefs()

    for (let i = 0; i < artistRefs.length; i++) {
      const artistRef = artistRefs[i]
      const name = teaserArtists[i]
      const query = `"${name}"`
      const tracks = await this.fetchArtistMixcloudResults(query)

      const artist = {
        name,
        tracks
      }
      batch.set(artistRef, artist, {merge: true})
    }

    await batch.commit()
  }

  async fetchArtistMixcloudResults(query) {
    const params = new URLSearchParams({
      q: query,
      type: 'cloudcast'
    })
    let response = await fetch('https://api.mixcloud.com/search/?' + params.toString())
    response = await response.json()
    const results = response.data
    console.log(results)

    return results
  }

}

const importer = new Importer()
importer.createOrUpdateArtists()