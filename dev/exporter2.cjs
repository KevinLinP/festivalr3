const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('../secrets/firebase-adminsdk.json')

const festivalId = 'movement 2022'
class Exporter {
  constructor() {
    initializeApp({
      credential: cert(serviceAccount)
    })

    this.db = getFirestore()
    this.festivalReference = this.db.doc(`festivals/${festivalId}`)
  }

  async festival() {
  }


  // arrayResults(querySnapshot) {
  //   const snapshots = []

  //   querySnapshot.forEach((documentSnapshot) => {
  //     snapshots.push(documentSnapshot)
  //   })

  //   return snapshots
  // }

  // inGroupsOf(array, size) {
  //   const groups = []

  //   array.forEach((item, index) => {
  //     const groupIndex = Math.floor(index / size)
  //     groups[groupIndex] = groups[groupIndex] || []
  //     groups[groupIndex].push(item)
  //   })

  //   return groups
  // }

  // async festivalArtists() {
  //   const collection = this.db.collection('festivalArtists')
  //   const querySnapshot = await collection.where('festival', '==', this.festivalReference).get()

  //   return this.arrayResults(querySnapshot)
  // }

  // async artists() {
  //   const festivalArtists = await this.festivalArtists()
  //   const artistRefs = festivalArtists.map((festivalArtist) => {
  //     return festivalArtist.data().artist
  //   })

  //   return this.db.getAll(...artistRefs)
  // }

  // async tracksByArtist(artists) {
  //   const tracksByArtist = {}
  //   const collection = this.db.collection('tracks')

  //   const groups = this.inGroupsOf(artists, 10)
  //   for (let i = 0; i < groups.length; i++) {
  //     const artistRefs = groups[i].map((artist) => artist.ref)
  //     const querySnapshot = await collection.where('artist', 'in', artistRefs).get()
  //     querySnapshot.forEach((documentSnapshot) => {
  //       const artistId = documentSnapshot.data().artist.id

  //       if (!(artistId in tracksByArtist)) {
  //         tracksByArtist[artistId] = []
  //       }

  //       tracksByArtist[artistId].push(documentSnapshot)
  //     })
  //   }

  //   return tracksByArtist
  // }

  async printJson() {
    let festival = await this.festivalReference.get()
    festival = festival.data()

    let artists = await this.db.getAll(...festival.artists)
    artists = artists.map((snapshot) => {
      const artist = snapshot.data()
      artist.tracks = artist.tracks.slice(0, 5)
      artist.tracks = artist.tracks.map((track) => {
        return {
          key: track.key,
          created_time: track.created_time.toDate().toISOString()
        }
      })

      return artist
    })

    festival.artists = artists

    console.log(JSON.stringify(festival))
  }
}

const exporter = new Exporter()
exporter.printJson()