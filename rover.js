class Rover {
   // Write code here!
   constructor(positionParm){
     this.position = positionParm;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
   receiveMessage(message){
     return{
       message: message.name,
       results: this.getResults(message)

     };
   }
   getResults(message){
     let results = [];
     for(let i =0; i< message.commands.length; i++){
       let result = {};
        if(message.commands[i].commandType === 'STATUS_CHECK'){
          this.mode = 'LOW_POWER';
          result.completed = true;
        
          result.roverStatus = {position: this.position, mode: this.mode, generatorWatts: this.generatorWatts};
          results.push(result);
        } 
        if(message.commands[i].commandType === 'MOVE'){
          result.completed = true;
          if(this.mode !== 'LOW_POWER'){
            this.position = message.commands[i].value;
          }
         
          result.roverStatus = {position: this.position };
        
          results.push(result);
        }
         
        if(message.commands[i].commandType === 'MODE_CHANGE'){
          
        result.completed = message.commands[i].value !== 'LOW_POWER'
        
          
          results.push(result);
        }
     }
     return results;
   }
}

module.exports = Rover;