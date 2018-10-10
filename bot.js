const prefix = "d!"
const Discord = require("discord.js");
const GoogleImages = require('google-images');
const json = require('jsonfile');

const codes = json.readFileSync('../codes/destroyer/code.json')

var balances = {

}


const client = new Discord.Client();
client.on("ready", () => {
  console.log("I am ready!");
});

const imgClient = new GoogleImages(codes.CSE, codes.API);

let pwns = {
  nuts: ["cds", "sugondese", "ligma", "chokonma", "fondalma", "tugunma", "slobonma", "cupma", "nibelma", "bofadese", "sugondese", "rubondese"],
  my_wiener: ["rydon", "sawcon", "sloberon", "gulpin", "chocon"],
  wiener: ["jergma", "miphat", "tipodiss", "sugma"],
  ass: ["eatma", "fugma", "kisma"],
  special: ["updog", "poppingamers"],
  pwn: ["not much how about you", "not much how about you"]
}

function isPwned(message) {
  console.log(message.content)



  if(message.content.toLowerCase().replace(/[^\w\s]/gi, '').includes("whats")) {

    message.content.split(" ").some(word => {
      word = word.toLowerCase();
      
      if(pwns.nuts.includes(word)) {
        message.channel.send(`${word} nuts`)
      }
      if(pwns.my_wiener.includes(word)) {
        message.channel.send(`${word} my dik`)
      }
      if(pwns.wiener.includes(word)) {
        message.channel.send(`${word} dik`)
      }
      if(pwns.ass.includes(word)) {
        message.channel.send(`${word} ass`)
      }
      if(pwns.special.includes(word)) {
        var index = pwns.special.indexOf(word);
        message.channel.send(pwns.pwn[index]);
      }
    });
  }
}

function dad(message) {
	if(message.content.toLowerCase().includes("i'm")) {
		var index = message.content.indexOf("i'm");
		var is = message.content.substr(index+4);
		message.channel.send("oh didn't know u were " + is + " lol... very epic ....")
	}
}



client.on("message", message => {
  isPwned(message);
  dad(message);

  if(message.isMentioned(client.user)) {
    console.log('this is u lol');

    if(!Object.keys(balances).includes(message.author.id)) {
      balances[message.author.id] = (Math.random()*400);
    }

    var destroy = (Math.round(Math.random()) * 2 - 1) * (Math.random()*10 * (Math.random()*30))

    message.channel.send(`${message.author} ur balance has been adjusted from ${Math.round(balances[message.author.id])} to ${Math.round(balances[message.author.id]-destroy)}`)

    balances[message.author.id] -= destroy;

  }

  if(message.content.toLowerCase().substring(0, prefix.length) != prefix) {
    return;
  }


  var command = message.content.toLowerCase().substring(prefix.length).split(' ')[0];
  var args = message.content.toLowerCase().substring(prefix.length + command.length + 1).toLowerCase();
  


  if(command == 'balance') {
    if(!Object.keys(balances).includes(message.author.id)) {
      balances[message.author.id] = (Math.random()*400);
    }

    message.channel.send(`${Math.round(balances[message.author.id])}`);
  }

  if(command == 'search') {
  	imgClient.search(args, {safe: 'off'})
	.then(images => { 
		if(images.length == 0) {
			console.log('no results found...')
      message.channel.send('no results found...')
			return;
		}
		var first = images[0];
		message.channel.send({files:[first.url]});
	});
  }

});

client.login(codes.token);
