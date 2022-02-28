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
class Importer {
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

const importer = new Importer()