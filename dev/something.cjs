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

  async findExistingMixcloudIds(resultMixcloudIds) {
    const trackCollection = this.db.collection('tracks')
    const querySnapshot = await trackCollection.where('mixcloudId', 'in', resultMixcloudIds).select('mixcloudId').get()

    const existingMixcloudIds = []
    querySnapshot.forEach((trackSnapshot) => {
      existingMixcloudIds.push(trackSnapshot.data().mixcloudId)
    })

    return existingMixcloudIds
  }

  async fillArtistResults(artistSnapshot) {
    const mixcloudResults = await this.fetchArtistMixcloudResults(artistSnapshot)

    const trackCollection = this.db.collection('tracks')
    const batch = this.db.batch()

    const groupedResults = inGroupsOf(mixcloudResults, 10)
    groupedResults.forEach((group) => {
      const resultMixcloudIds = group.map((result) => result.mixcloudId)
      const existingMixcloudIds = this.findExistingMixcloudIds(resultMixcloudIds)
      group.forEach((result) => {
        if (existingMixcloudIds.includes(result.mixcloudId)) return

        batch.create(trackCollection.doc(), result)
      })
    })

    // batch.commit()
  }

  async fetchArtistMixcloudResults(artistSnapshot) {
    const name = artistSnapshot.data().name
    const params = new URLSearchParams({
      q: `"${name}"`,
      type: 'cloudcast'
    })
    const response = await fetch('https://api.mixcloud.com/search/?' + params.toString())
    const data = await response.json().data
    console.log({data})

    return data
  }
}

const importer = new FestivalrImporter()
// importer.fetchArtistMixcloudResults({
//   name: 'Richie Hawtin'
// })
console.log(importer.inGroupsOf([1, 2, 3, 4, 5, 6, 7, 8], 3))