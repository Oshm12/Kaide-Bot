const schedule = require('node-schedule');



class Event {
    constructor(options) {
        this.title = "";
        this.date = 0
        this.time = 0
        this.companies = [];
    }
}

const newEvent = async (bot, msg, args) => {

    console.log("Bot : " + bot);
    console.log("msg : " + msg);
    console.log("args : " + args);

    const event = new Event;
    var n = 1;



   // msg.channel.send("Enter Name of Event (What needs to be spammed)");

    msg.channel.send("Enter Companies/Groups to Attend.");

    bot.on('message', msg2 => {
        if (msg2.author.bot) return
        if (msg2.author != msg.author) return
        if (msg2.channel != msg.channel) return 

        if (n == 1) {
            //get tags to pingu
            console.log("Tags " + msg2.content);

            event.companies = msg2.content;

            msg2.channel.send("Enter Date and time in the form: '1995-12-17T03:24:00'")
            n = 2;
            return
        }
        if (n == 2) {
            //get date
            console.log("Date " + msg2.content);

            event.date = new Date(msg2.content);

            msg2.channel.send("Enter Name of Event (What needs to be spammed)");
            n = 3;

            console.log("Read in Date: "  + event.date);
            return
        }
        if (n == 3) {
            //get string to play back  
            event.title = msg2.content;
            console.log("Playback string: " + msg2.content);

            msg2.channel.send("Everything read for the event");
            n = 4;
            msg2.channel.send("Check all details before event is finalised (this cant be undone so dont fuck up).")
    +       msg2.channel.send("Event Name: " + event.title);
            msg2.channel.send("Event Date and time: " + event.date);
            msg2.channel.send("Event Companies/Groups: " + event.companies);
            msg2.channel.send("\n\nHappy with everything? Yes to confirmed event, No to reject.")

            return

        }

        if (n == 4) {

            console.log(msg2.content);

            if (msg2.content === 'yes') {
                msg2.channel.send("Event confirmed.");

                //ANNOUNCENTS SET UP FOR SPAM

                let varDate = event.date.setHours(event.date.getHours() - 1);

                var OneHour = schedule.scheduleJob(event.date, function () {
                    const channel = bot.channels.find('name', "dev-wookie");
                    channel.send("1 hour till " + event.title + ". For " + event.companies);
                    console.log(Date.now() + 'The answer to life, the universe, and everything!');
                    channel.send(Date.now() + "Special Scheduled Messaged Test with date read in from discord !event command.");
                });  

                varDate = event.date.setMinutes(event.date.getMinutes() + 30);

                var ThirtyMins = schedule.scheduleJob(varDate, function () {
                    const channel = bot.channels.find('name', "dev-wookie");
                    channel.send("30 minutes " + event.title + ". For " + event.companies);
                    //channel.send(message)
                    //console.log(Date.now() + 'The answer to life, the universe, and everything!');
                    channel.send(Date.now() + "Special Scheduled Messaged Test with date read in from discord !event command.");
                });  

                varDate = event.date.setMinutes(event.date.getMinutes() + 10);

                var TwentyMins = schedule.scheduleJob(event.date, function () {
                    const channel = bot.channels.find('name', "dev-wookie");
                    channel.send("20 minutes " + event.title + ". For " + event.companies);
                    //channel.send(message)
                    //console.log(Date.now() + 'The answer to life, the universe, and everything!');
                    channel.send(Date.now() + "Special Scheduled Messaged Test with date read in from discord !event command.");
                }); 

                varDate = event.date.setMinutes(event.date.getMinutes() + 10);

                var TenMins = schedule.scheduleJob(event.date, function () {
                    const channel = bot.channels.find('name', "dev-wookie");
                    channel.send("10 mintues till " + event.title + ". For " + event.companies);
                    //channel.send(message)
                    //console.log(Date.now() + 'The answer to life, the universe, and everything!');
                    channel.send(Date.now() + "Special Scheduled Messaged Test with date read in from discord !event command.");
                }); 

                varDate = event.date.setMinutes(event.date.getMinutes() + 5);

                var FiveMins = schedule.scheduleJob(event.date, function () {
                    const channel = bot.channels.find('name', "dev-wookie");
                    channel.send("5 minutes till " + event.title + ". For " + event.companies);
                    //channel.send(message)
                    //console.log(Date.now() + 'The answer to life, the universe, and everything!');
                    channel.send(Date.now() + "Special Scheduled Messaged Test with date read in from discord !event command.");
                }); 

                varDate = event.date.setMinutes(event.date.getMinutes() + 5);

                var ZeroMins = schedule.scheduleJob(event.date, function () {
                    const channel = bot.channels.find('name', "dev-wookie");
                    channel.send("Starting now, get on: " + event.title + ". For " + event.companies);
                    channel.send("0 done");
                    //channel.send(message)
                    //console.log(Date.now() + 'The answer to life, the universe, and everything!');
                    channel.send(Date.now() + "Special Scheduled Messaged Test with date read in from discord !event command.");
                }); 

                //ATTENDANCE CHECKERS

                var onTime = schedule.scheduleJob(event.date, function () {
                    const channel = bot.channels.find('name', "dev-wookie");
                    
                    console.log("0 attendance check");
                    //channel.send(message)
                    //console.log(Date.now() + 'The answer to life, the universe, and everything!');
                    channel.send(Date.now() + "Special Scheduled Messaged Test attendance checker !event command.");
                }); 





                return
            }

            else if (msg2.content === 'no') {
                msg2.channel.send("To start again enter !event");
                return
            }

            else {
                msg2.channel.send("You fucked that up, try again");
                msg2.channel.send("\n\nHappy with everything? Yes to confirmed event, No to reject.")
                n = 4;
                return
            }
          
        }
      
    })

    //msg.channel.send("Enter Date and time");
    /*
        var j = schedule.scheduleJob('0 30 17 * * *', function () {
        const channel = bot.channels.find('name', "dev-wookie");
        //channel.send(message)
        console.log('The answer to life, the universe, and everything!');
        channel.send("Special Scheduled Messaged Test");
    });  */

    
     
    

}

module.exports = newEvent;