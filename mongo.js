const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
    console.log('anna salasana argumentiksi')
    process.exit(1)
  }

const password = process.argv[2]
const url =
    'mongodb+srv://PawanBhandari:${password}@cluster0.9r5sa.mongodb.net/try?retryWrites=true&w=majority'


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const showPeople = () => {
  Person
  .find({})
  .then(persons => {
    console.log("puhelinluettelo:")
    persons.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

const addPerson = (name, number) => {
  const person = new Person({name, number})
  person.save().then(result => {
    console.log("lisätty ", name, " numero ", number, " puhelinluetteloon")
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  showPeople()
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  addPerson(name, number)
} else {
  console.log('numero ei käy parametriksi')
  process.exit(1)
}