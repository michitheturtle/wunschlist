/**
 * Created by michael on 14.12.15.
 */
var mongoose = require('mongoose');

var wuschgeschenk= mongoose.Schema({
   name: {type:String, required:'{PATH} is required!'},
    wert: {type:Number, required:'{PATH} is required!'},
    datum: {type: Date, default: Date.now},
    email: {type:String, required:'{PATH} is required!'},
});

var wunschlisteSchema = mongoose.Schema({
    title: {type:String, required:'{PATH} is required!'},
    erfuellt: {type:Boolean, required:'{PATH} is required!'},
    preis: {type:Number, required:'{PATH} is required!'},
    beschreibung: {type:String, required: '{PATH} is required!'},
    bildUrl: {type:String},
    geschenke: [wuschgeschenk]
});
wunschlisteSchema.methods.getSumGeschenkt = function(){
    var sum = 0;
    for (index = 0; index < this.geschenke.length; ++index) {
        sum += this.geschenke[i].wert;
    }
    return sum;
}

wunschlisteSchema.methods.test = function(){
    return "hallo du ";
}

wunschlisteSchema.method('meow', function () {
    console.log('meeeeeoooooooooooow');
})



var Wunschliste = mongoose.model('wunschliste', wunschlisteSchema);
var geschenke = mongoose.model('wunschgeschenke', wuschgeschenk);

function createDefaultWishes() {
    Wunschliste.find({}).exec(function(err, collection) {
        if(collection.length === 0) {

            var geschenkt = geschenke();

            geschenkt.name = 'Hanspeter';
            geschenkt.wert = 9999;
            geschenkt.email = 'you@mine.ch';

            Wunschliste.create({title: 'Weltreise',beschreibung: 'In 80 Tagen um die Welt.', erfuellt: false, preis: 12500.50,bildUrl:'/img/world.png' });
            Wunschliste.create({title: 'Haus',beschreibung: 'Ein kleines Haus.', erfuellt: false, preis: 460000,bildUrl:'/img/haus.png'});
            Wunschliste.create({title: 'Elefant',beschreibung: 'Dumboooooo.', erfuellt: true, preis: 9425.25 ,bildUrl:'/img/elefant.png', geschenke: geschenkt});
            Wunschliste.create({title: 'Buch',beschreibung: 'In 80 Tagen um die Welt - das Buch.', erfuellt: false, preis: 19.25 ,bildUrl:'/img/book.png'});
        }
    })
}

exports.createDefaultWishes = createDefaultWishes;