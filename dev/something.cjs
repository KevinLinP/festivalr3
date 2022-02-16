const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')
const serviceAccount = require('../secrets/firebase-adminsdk.json')

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
}

const importer = new FestivalrImporter()
importer.addFestivalArtists()