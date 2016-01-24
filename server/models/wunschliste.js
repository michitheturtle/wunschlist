/**
 * Created by michael on 14.12.15.
 */
var mongoose = require('mongoose');

var wuschgeschenk= mongoose.Schema({
   name: {type:String, required:'{PATH} is required!'},
    wert: {type:Number, required:'{PATH} is required!'},
    datum: {type: Date, default: Date.now},
    email: {type:String, required:'{PATH} is required!'},
    uebermittlung: {type:String, required:'{PATH} is required!'},
});

var wunschlisteSchema = mongoose.Schema({
    title: {type:String, required:'{PATH} is required!'},
    erfuellt: {type:Boolean, required:'{PATH} is required!'},
    preis: {type:Number, required:'{PATH} is required!'},
    beschreibung: {type:String, required: '{PATH} is required!'},
    bildUrl: {type:String},
    geschenke: [wuschgeschenk],
});

/*wunschlisteSchema.methods.getSumGeschenkt = function(){
    var sum = 0;
    for (index = 0; index < this.geschenke.length; ++index) {
        sum += this.geschenke[i].wert;
    }
    return sum;
}*/



var Wunschliste = mongoose.model('wunschliste', wunschlisteSchema);
var geschenke = mongoose.model('wunschgeschenke', wuschgeschenk);

function createDefaultWishes() {
    Wunschliste.find({}).exec(function(err, collection) {
        if(collection.length === 0) {

            var geschenkt = geschenke();

            geschenkt.name = 'Hanspeter';
            geschenkt.wert = 9999;
            geschenkt.email = 'you@mine.ch';

            Wunschliste.create({title: 'Wohnlandschaft',beschreibung: 'Unser altes Sofa durfte schon einiges miterleben. Junge Katzen und der Umzug haben ihre Spuren hinterlassen. <br />Deshalb wäre es an der Zeit für einen Ersatz. Möglichst mit Bettfunktion für Gäste.', erfuellt: false, preis: 1600, bildUrl:'/img/sofa.jpg' });
            Wunschliste.create({title: 'Ferien im Tessin', beschreibung: 'Als Flitterwochen-Ersatz würden wir gerne wieder einige Tage im Tessin verbringen. Geplant sind 5 Tage in Brissago.', erfuellt: false, preis: 700,bildUrl:'/img/tessin.jpg' });
            Wunschliste.create({title: 'Abendessen im Restaurant',beschreibung: 'Einen Abend für uns. Mit Babysitter, gutem Essen und ein wenig Zeit.', erfuellt: false, preis: 250, bildUrl:'/img/dinner.jpg'});
            Wunschliste.create({title: 'Städtetrip nach Kopenhagen',beschreibung: 'Verlängertes Wochenende in Dänkemark. Ausflug nach Schweden, wenn möglich.', erfuellt: false, preis: 1800, bildUrl:'/img/kopenhagen.jpg'});
            /*Wunschliste.create({title: 'Elefant',beschreibung: 'Dumboooooo.', erfuellt: true, preis: 9425.25 , bisherGeschenkt: 9425.25 ,bildUrl:'/img/elefant.png', geschenke: geschenkt});
            Wunschliste.create({title: 'Buch',beschreibung: 'In 80 Tagen um die Welt - das Buch.', erfuellt: false, preis: 19.25, offenerBetrag: 19.25 ,bildUrl:'/img/book.png'});*/
        }
    })
}

exports.createDefaultWishes = createDefaultWishes;