const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('../secrets/firebase-adminsdk.json')

const festivalId = 'H1jDo2vLM52hP4QnSUfj'
class Exporter {
  constructor() {
    initializeApp({
      credential: cert(serviceAccount)
    })

    this.db = getFirestore()
    this.festivalReference = this.db.doc(`festivals/${festivalId}`)
  }

  arrayResults(querySnapshot) {
    const snapshots = []

    querySnapshot.forEach((documentSnapshot) => {
      snapshots.push(documentSnapshot)
    })

    return snapshots
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

  async festivalArtists() {
    const collection = this.db.collection('festivalArtists')
    const querySnapshot = await collection.where('festival', '==', this.festivalReference).get()

    return this.arrayResults(querySnapshot)
  }

  async artists() {
    const festivalArtists = await this.festivalArtists()
    const artistRefs = festivalArtists.map((festivalArtist) => {
      return festivalArtist.data().artist
    })

    return this.db.getAll(...artistRefs)
  }

  async tracksByArtist(artists) {
    const tracksByArtist = {}
    const collection = this.db.collection('tracks')

    const groups = this.inGroupsOf(artists, 10)
    for (let i = 0; i < groups.length; i++) {
      const artistRefs = groups[i].map((artist) => artist.ref)
      const querySnapshot = await collection.where('artist', 'in', artistRefs).get()
      querySnapshot.forEach((documentSnapshot) => {
        const artistId = documentSnapshot.data().artist.id

        if (!(artistId in tracksByArtist)) {
          tracksByArtist[artistId] = []
        }

        tracksByArtist[artistId].push(documentSnapshot)
      })
    }

    return tracksByArtist
  }

  async printJson() {
    const json = {}

    let artists = await this.artists()
    artists = artists.sort((a, b) => {
      return a.data().name.localeCompare(b.data().name)
    })
    const tracksByArtist = await this.tracksByArtist(artists)

    artists.forEach((artist) => {
      let tracks = tracksByArtist[artist.id].map((track) => {
        return track.data()
      })
      tracks = tracks.sort((a, b) => {
        return b.postedAt - a.postedAt 
      })
      tracks = tracks.slice(0, 5)
      tracks = tracks.map((track) => {
        return {
          key: track.key,
          postedAt: track.postedAt.toDate().toISOString(),
        }
      })

      json[artist.data().name] = tracks
    })

    console.log(JSON.stringify(json))
  }
}

const exporter = new Exporter()
exporter.printJson()