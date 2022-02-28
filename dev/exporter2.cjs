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

  async printJson() {
    let festival = await this.festivalReference.get()
    festival = festival.data()

    let artists = await this.db.getAll(...festival.artists)

    festival.artists = artists.map((snapshot) => {
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

    console.log(JSON.stringify(festival))
  }
}

const exporter = new Exporter()
exporter.printJson()